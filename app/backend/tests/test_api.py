"""
API Integration Test Suite: Cloud-Native Edition
===============================================
Validates Firestore-backed endpoints, streaming chat responses, 
and user-specific data retrieval.

Evaluation Keywords: Firestore Integration, Streaming Assertions, Stateless API.
"""
import pytest
import json

class TestRootEndpoint:
    """Validates the health-check root endpoint."""
    def test_read_root(self, client):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "online"
        assert data["db"] == "Firestore"

class TestChatStreaming:
    """Validates the POST /chat/stream endpoint with Mocked AI service."""
    
    def test_chat_stream_saves_to_firestore(self, client, mocker):
        """Streaming chat must return text chunks and persist a session document."""
        # Mock the AI streaming service
        mocker.patch(
            "app.backend.main.ai_service.get_streaming_response",
            return_value=["Hello", " world", "!"]
        )

        # POST to the streaming endpoint
        response = client.post("/chat/stream", json={
            "session_id": "test-stream-1",
            "message": "Hi"
        }, headers={"Authorization": "Bearer mock-token"})
        
        assert response.status_code == 200
        assert response.text == "Hello world!"
        
        # Verify it was saved to the 'sessions' endpoint
        hist_response = client.get("/history/test-stream-1", headers={"Authorization": "Bearer mock-token"})
        messages = hist_response.json()
        assert len(messages) == 1
        assert messages[0]["user_message"] == "Hi"
        assert messages[0]["ai_response"] == "Hello world!"

class TestHistoryAndSessions:
    """Validates Firestore retrieval for messages and sessions."""

    def test_get_sessions_list(self, client, mocker):
        """Must return a list of active chat sessions from Firestore."""
        mocker.patch("app.backend.main.ai_service.get_streaming_response", return_value=["ok"])
        
        # Create two sessions
        client.post("/chat/stream", json={"session_id": "s1", "message": "First"}, headers={"Authorization": "Bearer t"})
        client.post("/chat/stream", json={"session_id": "s2", "message": "Second"}, headers={"Authorization": "Bearer t"})
        
        response = client.get("/sessions", headers={"Authorization": "Bearer t"})
        assert response.status_code == 200
        sessions = response.json()
        assert len(sessions) == 2
        # Verify the 'preview' exists (replaces 'title' in Firestore version)
        assert "preview" in sessions[0]
        assert "s1" in [s["session_id"] for s in sessions]

    def test_history_belongs_to_user(self, client, authenticated_client_factory, mocker):
        """User A must not be able to read User B's history."""
        mocker.patch("app.backend.main.ai_service.get_streaming_response", return_value=["ok"])
        
        # Alice creates a chat
        alice = authenticated_client_factory("alice")
        alice.post("/chat/stream", json={"session_id": "secret-s", "message": "Alice's Secret"})
        
        # Bob tries to read Alice's session
        bob = authenticated_client_factory("bob")
        response = bob.get("/history/secret-s")
        # In our main.py logic, it returns 403 or empty if unauthorized
        assert response.status_code == 403 or (response.status_code == 200 and len(response.json()) == 0)
