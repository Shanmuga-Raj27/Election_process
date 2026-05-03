"""
NEA - AI Backend: Cloud-Native Edition
=======================================
Powered by FastAPI, Gemini Resilience Stack, and Google Firestore.
Stateless architecture ready for Cloud Run and Render.
"""
import os
import uuid
from datetime import datetime, UTC
from contextlib import asynccontextmanager
from typing import List, Optional
from collections import namedtuple

from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import firebase_admin
from firebase_admin import credentials, auth, firestore
from .ai_service import ai_service

# ─── Firebase & Firestore Initialization ────────────────────────────────
db = None
try:
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT", "serviceAccountKey.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("✅ Firebase & Firestore initialized successfully.")
    else:
        print("Warning: FIREBASE_SERVICE_ACCOUNT not found. Auth only mode.")
except Exception as e:
    print(f"Firebase Init Error: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # No local DB initialization needed for Firestore
    yield

app = FastAPI(title="NEA - AI (Cloud-Native)", lifespan=lifespan)

# ─── Middleware ──────────────────────────────────────────────────────────
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Models ──────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: str

class AuthVerifyRequest(BaseModel):
    id_token: str

# ─── Authentication Dependency ──────────────────────────────────────────
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")
    
    token = authorization.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token # Contains 'uid', 'email', etc.
    except Exception:
        raise HTTPException(status_code=401, detail="Authentication failed")

# ─── Endpoints ───────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"status": "online", "db": "Firestore", "engine": "Gemini Resilience Stack"}

@app.post("/auth/verify")
async def verify_token(request: AuthVerifyRequest):
    try:
        decoded_token = auth.verify_id_token(request.id_token)
        return {"status": "success", "uid": decoded_token['uid']}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid ID Token")

@app.get("/sessions")
async def get_sessions(user=Depends(get_current_user)):
    """Retrieve all chat sessions for the current user from Firestore."""
    if not db: return []
    try:
        uid = user['uid']
        # Query sessions owned by this user, sorted by newest first
        sessions_ref = db.collection("chat_sessions")
        query = sessions_ref.where("uid", "==", uid).order_by("updated_at", direction=firestore.Query.DESCENDING)
        docs = query.stream()
        
        return [{
            "session_id": doc.id,
            "preview": doc.to_dict().get("preview", "New Conversation"),
            "updated_at": doc.to_dict().get("updated_at")
        } for doc in docs]
    except Exception as e:
        print(f"Firestore Sessions Error: {e}")
        return []

@app.get("/history/{session_id}")
async def get_history(session_id: str, user=Depends(get_current_user)):
    """Retrieve message history for a specific session."""
    if not db: return []
    try:
        uid = user['uid']
        doc_ref = db.collection("chat_sessions").document(session_id)
        doc = doc_ref.get()
        
        if not doc.exists: return []
        
        data = doc.to_dict()
        if data.get("uid") != uid:
            raise HTTPException(status_code=403, detail="Forbidden")
            
        return data.get("messages", [])
    except Exception as e:
        print(f"Firestore History Error: {e}")
        return []

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest, user=Depends(get_current_user)):
    """Stream AI response and persist conversation to Firestore."""
    if not db: raise HTTPException(status_code=500, detail="Database Offline")
    
    uid = user['uid']
    session_id = request.session_id
    user_msg = request.message

    # 1. Fetch History for Context
    doc_ref = db.collection("chat_sessions").document(session_id)
    doc = doc_ref.get()
    
    current_history = []
    if doc.exists:
        data = doc.to_dict()
        if data.get("uid") == uid:
            # Map Firestore dicts to namedtuples for ai_service compatibility
            Msg = namedtuple('Msg', ['user_message', 'ai_response'])
            current_history = [Msg(m['user_message'], m['ai_response']) for m in data.get("messages", [])]

    async def generate():
        full_response = ""
        try:
            # Get streaming generator from Resilience Service
            for chunk in ai_service.get_streaming_response(user_msg, current_history):
                full_response += chunk
                yield chunk

            # 2. Persist to Firestore after success
            new_msg = {
                "user_message": user_msg,
                "ai_response": full_response,
                "timestamp": datetime.now(UTC).isoformat()
            }
            
            if not doc.exists:
                doc_ref.set({
                    "uid": uid,
                    "preview": user_msg[:45] + "...",
                    "created_at": datetime.now(UTC).isoformat(),
                    "updated_at": datetime.now(UTC).isoformat(),
                    "messages": [new_msg]
                })
            else:
                doc_ref.update({
                    "updated_at": datetime.now(UTC).isoformat(),
                    "messages": firestore.ArrayUnion([new_msg])
                })
        except Exception as e:
            print(f"Firestore Stream Save Error: {e}")

    return StreamingResponse(generate(), media_type="text/plain")

@app.post("/chat/warmup")
async def warmup():
    return {"status": "ready"}
