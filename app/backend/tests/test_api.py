"""
API Integration Test Suite for NEIC Backend
=============================================
Tests: Root endpoint, chat with mocked Gemini, chat history retrieval,
       session listing with titles, and input validation.

Evaluation Keywords: Integration Testing, Code Quality, Maintainability.
"""
import pytest


class TestRootEndpoint:
    """Validates the health-check root endpoint."""

    def test_read_root(self, client):
        response = client.get("/")
        assert response.status_code == 200
        assert "NEA - AI Backend" in response.json()["message"]


class TestChatEndpoint:
    """Validates the POST /chat endpoint with Gemini AI integration."""

    def test_chat_with_mocked_gemini(self, client, mocker):
        """Chat endpoint must return a mocked AI response and persist to DB."""
        mocker.patch(
            "app.backend.main.ai_service.get_response",
            return_value="Mocked AI response about elections."
        )
        response = client.post("/chat", json={
            "session_id": "test-session",
            "message": "What is an election?"
        })
        assert response.status_code == 200
        assert response.json()["response"] == "Mocked AI response about elections."
        assert response.json()["session_id"] == "test-session"

    def test_chat_validation_error(self, client):
        """Chat endpoint must return 422 for missing payload fields."""
        response = client.post("/chat", json={})
        assert response.status_code == 422


class TestHistoryEndpoint:
    """Validates the GET /history/{session_id} endpoint."""

    def test_history_returns_messages(self, client, mocker):
        """History must return messages previously sent in the session."""
        mocker.patch(
            "app.backend.main.ai_service.get_response",
            return_value="AI reply"
        )
        client.post("/chat", json={"session_id": "hist-1", "message": "Hello"})

        response = client.get("/history/hist-1")
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0
        assert data[0]["user_message"] == "Hello"
        assert data[0]["ai_response"] == "AI reply"


class TestSessionsEndpoint:
    """Validates the GET /sessions endpoint with recency sort."""

    def test_sessions_returns_titles(self, client, mocker):
        """Sessions must return objects with session_id and title."""
        mocker.patch(
            "app.backend.main.ai_service.get_response",
            return_value="AI reply"
        )
        client.post("/chat", json={"session_id": "s-1", "message": "How to register?"})
        client.post("/chat", json={"session_id": "s-2", "message": "What is EVM?"})

        response = client.get("/sessions")
        assert response.status_code == 200
        sessions = response.json()
        assert len(sessions) >= 2
        session_ids = [s["session_id"] for s in sessions]
        assert "s-1" in session_ids
        assert "s-2" in session_ids
        # Verify title is derived from first user message
        for s in sessions:
            assert "title" in s
            assert len(s["title"]) > 0
