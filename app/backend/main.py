from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from database import init_db, get_db, ChatMessage
from ai_service import ai_service

# Initialize DB
init_db()

app = FastAPI(title="Election Assistant AI")

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

    class Config:
        orm_mode = True

@app.get("/")
def read_root():
    return {"message": "Election Assistant AI Backend is online."}

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
            from database import SessionLocal
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
