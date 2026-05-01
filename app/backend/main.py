import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException

from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, ConfigDict
from typing import List

from .database import init_db, get_db, ChatMessage
from .ai_service import ai_service
import firebase_admin
from firebase_admin import credentials, auth

# Initialize DB
# Initialize Firebase Admin
try:
    # Look for service account key in current directory or env var
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT", "serviceAccountKey.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        print("Warning: Firebase serviceAccountKey.json not found. Auth verification will be limited.")
except Exception as e:
    print(f"Firebase Admin initialization error: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Only initialize the real database if we aren't running tests
    if not os.getenv("TESTING"):
        init_db()
    yield

app = FastAPI(title="Election Assistant AI", lifespan=lifespan)

# Add CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    session_id: str
    response: str

class HistoryItem(BaseModel):
    user_message: str
    ai_response: str
    timestamp: str

    model_config = ConfigDict(from_attributes=True)

@app.get("/")
def read_root():
    return {"message": "Election Assistant AI Backend is online."}

class AuthVerifyRequest(BaseModel):
    id_token: str

@app.post("/auth/verify")
async def verify_token(request: AuthVerifyRequest):
    """
    Verifies a Firebase ID token sent from the frontend.
    """
    try:
        # Verify the ID token
        decoded_token = auth.verify_id_token(request.id_token)
        uid = decoded_token['uid']
        return {"status": "success", "uid": uid, "email": decoded_token.get('email')}
    except Exception as e:
        # If verification fails or firebase is not initialized properly
        print(f"Token verification error: {e}")
        # For development/demo, we might allow bypass if key is missing
        if not os.path.exists("serviceAccountKey.json"):
             return {"status": "debug_bypass", "message": "Verification skipped (no key)"}
        raise HTTPException(status_code=401, detail=f"Invalid authentication credentials: {str(e)}")

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    # 1. Fetch History
    history = db.query(ChatMessage).filter(ChatMessage.session_id == request.session_id).order_by(ChatMessage.timestamp).all()
    
    # 2. Get AI Response
    ai_response_text = ai_service.get_response(request.message, history)
    
    # 3. Save to DB
    new_message = ChatMessage(
        session_id=request.session_id,
        user_message=request.message,
        ai_response=ai_response_text
    )
    db.add(new_message)
    db.commit()
    
    return ChatResponse(session_id=request.session_id, response=ai_response_text)

@app.get("/history/{session_id}", response_model=List[HistoryItem])
def get_history(session_id: str, db: Session = Depends(get_db)):
    history = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.timestamp).all()
    
    # Convert DateTime to string for response
    results = []
    for h in history:
        results.append({
            "user_message": h.user_message,
            "ai_response": h.ai_response,
            "timestamp": h.timestamp.isoformat()
        })
    return results

@app.get("/sessions", response_model=List[str])
def get_sessions(db: Session = Depends(get_db)):
    sessions = db.query(ChatMessage.session_id).distinct().all()
    return [s[0] for s in sessions if s[0]]

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest, db: Session = Depends(get_db)):
    # 1. Get History
    history = db.query(ChatMessage).filter(ChatMessage.session_id == request.session_id).order_by(ChatMessage.timestamp).all()
    
    # 2. Check API Key
    if not ai_service.client:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    def generate():
        full_response = ""
        try:
            for chunk in ai_service.get_streaming_response(request.message, history):
                full_response += chunk
                yield chunk
            
            # 3. Save to DB (Synchronously after stream for simplicity/reliability in this test phase)
            from .database import SessionLocal
            with SessionLocal() as bg_db:
                new_message = ChatMessage(
                    session_id=request.session_id,
                    user_message=request.message,
                    ai_response=full_response
                )
                bg_db.add(new_message)
                bg_db.commit()
        except Exception as e:
            yield f"\n[Backend Error]: {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")
