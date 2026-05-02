"""
Core API logic for the National Election Information Companion (NEIC).
Handles authentication verification, chat sessions, and history retrieval.
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

from .database import init_db, get_db, ChatMessage
from .ai_service import ai_service
import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin
try:
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
    if not os.getenv("TESTING"):
        init_db()
    yield

app = FastAPI(title="NEA - AI Backend", lifespan=lifespan)

# Add CORS for frontend integration
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication Dependency
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    try:
        token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        return decoded_token['uid']
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

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

class SessionInfo(BaseModel):
    session_id: str
    title: str

@app.get("/")
def read_root():
    return {"message": "NEA - AI Backend is online."}

class AuthVerifyRequest(BaseModel):
    id_token: str

@app.post("/auth/verify")
async def verify_token(request: AuthVerifyRequest):
    try:
        decoded_token = auth.verify_id_token(request.id_token)
        return {"status": "success", "uid": decoded_token['uid']}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token verification failed")

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db), uid: str = Depends(get_current_user)):
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == request.session_id,
        ChatMessage.user_id == uid
    ).order_by(ChatMessage.timestamp).all()
    
    ai_response_text = ai_service.get_response(request.message, history)
    
    new_message = ChatMessage(
        user_id=uid,
        session_id=request.session_id,
        user_message=request.message,
        ai_response=ai_response_text
    )
    db.add(new_message)
    db.commit()
    
    return ChatResponse(session_id=request.session_id, response=ai_response_text)

@app.get("/history/{session_id}", response_model=List[HistoryItem])
def get_history(session_id: str, db: Session = Depends(get_db), uid: str = Depends(get_current_user)):
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == session_id,
        ChatMessage.user_id == uid
    ).order_by(ChatMessage.timestamp).all()
    
    results = []
    for h in history:
        results.append({
            "user_message": h.user_message,
            "ai_response": h.ai_response,
            "timestamp": h.timestamp.isoformat()
        })
    return results

@app.get("/sessions", response_model=List[SessionInfo])
def get_sessions(db: Session = Depends(get_db), uid: str = Depends(get_current_user)):
    latest_sessions = db.query(
        ChatMessage.session_id, 
        func.max(ChatMessage.timestamp).label('latest_ts')
    ).filter(ChatMessage.user_id == uid).group_by(ChatMessage.session_id).order_by(desc('latest_ts')).all()
    
    results = []
    for sid, latest_ts in latest_sessions:
        if not sid: continue
        first_msg = db.query(ChatMessage.user_message).filter(
            ChatMessage.session_id == sid,
            ChatMessage.user_id == uid
        ).order_by(ChatMessage.timestamp).first()
        
        title = first_msg[0] if first_msg else "New Conversation"
        if len(title) > 40:
            title = title[:37] + "..."
        results.append(SessionInfo(session_id=sid, title=title))
    
    return results

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest, db: Session = Depends(get_db), uid: str = Depends(get_current_user)):
    history = db.query(ChatMessage).filter(
        ChatMessage.session_id == request.session_id,
        ChatMessage.user_id == uid
    ).order_by(ChatMessage.timestamp).all()
    
    if not ai_service.client:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")

    def generate():
        full_response = ""
        try:
            for chunk in ai_service.get_streaming_response(request.message, history):
                full_response += chunk
                yield chunk
            
            from .database import SessionLocal
            with SessionLocal() as bg_db:
                new_message = ChatMessage(
                    user_id=uid,
                    session_id=request.session_id,
                    user_message=request.message,
                    ai_response=full_response
                )
                bg_db.add(new_message)
                bg_db.commit()
        except Exception as e:
            yield f"\n[Backend Error]: {str(e)}"

    return StreamingResponse(generate(), media_type="text/plain")
