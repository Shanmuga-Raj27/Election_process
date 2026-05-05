"""
NEA - AI Backend: Cloud-Native Edition
=======================================
Powered by FastAPI, Gemini Resilience Stack, and Google Firestore.
Stateless architecture ready for Cloud Run and Render.
"""
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path
from contextlib import asynccontextmanager
from typing import List, Optional
from collections import namedtuple
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# ─── Path Resilience (Production Pattern) ───────────────────────────────
# Ensures local modules are findable even if run via different CLI tools
sys.path.append(str(Path(__file__).parent))

from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import firebase_admin
from firebase_admin import credentials, auth, firestore

try:
    from ai_service import ai_service as ai
except (ImportError, ModuleNotFoundError):
    from .ai_service import ai_service as ai

# ─── Dual-Identity Firebase Initialization ─────────────────────────────
db = None
# ─── Firebase Identity Layer ───────────────────────────────────────────
def initialize_firebase():
    if not firebase_admin._apps:
        # Use absolute path to ensure resilience in containers
        base_path = Path(__file__).parent
        cert_path = base_path / "serviceAccountKey.json"
        
        if not cert_path.exists():
            print(f"⚠️  WARNING: {cert_path} not found. Falling back to Application Default.")
            cred = credentials.ApplicationDefault()
        else:
            cred = credentials.Certificate(str(cert_path))
            
        firebase_admin.initialize_app(cred, {
            'projectId': 'neic-project'
        })
        print(f"✅ Firebase Initialized (Project: neic-project, Path: {cert_path})")

initialize_firebase()
db = firestore.client()
print("🚀 Firestore connected successfully.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # No local DB initialization needed for Firestore
    yield

app = FastAPI(title="NEA - AI (Cloud-Native)", lifespan=lifespan)

# ─── Middleware ──────────────────────────────────────────────────────────
# Hardened CORS policy for production
ALLOWED_ORIGINS = [
    "https://neic-project.web.app",
    "https://neic-project-495211.web.app"
]

# Origins are now handled by the wildcard middleware below

# Production CORS Policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://neic-project.web.app",
        "https://neic-project-495211.web.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "X-Firebase-Auth", "Authorization"],
    expose_headers=["X-Firebase-Auth"],
)

# Manual OPTIONS handler (The ultimate CORS fix for Cloud Run)
@app.options("/{rest_of_path:path}")
async def preflight_handler():
    return {}

# ─── Models ──────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: str

class AuthVerifyRequest(BaseModel):
    id_token: str

# ─── Authentication Dependency ──────────────────────────────────────────
async def get_current_user(x_firebase_auth: Optional[str] = Header(None)):
    if not x_firebase_auth or not x_firebase_auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format in X-Firebase-Auth")
    
    token = x_firebase_auth.split("Bearer ")[1]
    try:
        return auth.verify_id_token(token, clock_skew_seconds=10)
    except Exception as e:
        print(f"❌ AUTH FAILED: {str(e)}")
        # Check if it's a project ID mismatch
        if "project_id" in str(e).lower():
            print("💡 TIP: The token provided belongs to a different project than the server.")
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")

# ─── Endpoints ───────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "status": "online", 
        "db": "Firestore", 
        "db_project": db.project if db else "Disconnected",
        "engine": "Gemini Resilience Stack"
    }

@app.post("/auth/verify")
async def verify_token(request: AuthVerifyRequest):
    try:
        decoded_token = auth.verify_id_token(request.id_token, clock_skew_seconds=10)
        return {"status": "success", "uid": decoded_token['uid']}
    except Exception as e:
        print(f"DEBUG AUTH ERROR: {str(e)}")
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
            "title": doc.to_dict().get("preview") or "New Conversation",
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
    try:
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

        async def root():
            return {"status": "online"}

        async def generate():
            yield " " # Heartbeat to confirm connection
            full_response = ""
            try:
                # 1. Diagnostic: Check AI Service
                if not ai:
                    yield "[Error: AI Service Offline]"
                    return

                # Get streaming generator
                try:
                    for chunk in ai.get_streaming_response(user_msg, current_history):
                        full_response += chunk
                        yield chunk
                except Exception as ai_err:
                    print(f"⚠️  AI STREAM ERROR: {ai_err}")
                    error_msg = f" [AI Error: {str(ai_err)}]"
                    yield error_msg
                    full_response += error_msg

                # 2. Persist to Firestore after success
                new_msg = {
                    "user_message": user_msg,
                    "ai_response": full_response,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                
                if not doc.exists:
                    doc_ref.set({
                        "uid": uid,
                        "preview": user_msg[:45] + "...",
                        "created_at": datetime.now(timezone.utc).isoformat(),
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                        "messages": [new_msg]
                    })
                else:
                    doc_ref.update({
                        "updated_at": datetime.now(timezone.utc).isoformat(),
                        "messages": firestore.ArrayUnion([new_msg])
                    })
            except Exception as e:
                print(f"Firestore Stream Save Error: {e}")
                
        return StreamingResponse(generate(), media_type="text/event-stream")
    except Exception as e:
        print(f"❌ CHAT ENDPOINT ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server Crash: {str(e)}")

@app.post("/chat/warmup")
async def warmup():
    return {"status": "ready"}
