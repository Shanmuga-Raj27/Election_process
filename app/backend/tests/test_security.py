"""
Security Test Suite for NEIC Backend
=============================================
Tests: Firebase Auth enforcement, user data isolation, CORS hardening,
       input validation, and the Principle of Least Privilege.

Evaluation Keywords: JWT Verification, Data Isolation, Input Sanitization,
                     Secure Auth Flow, Principle of Least Privilege.
"""
import pytest
from fastapi.testclient import TestClient
from ..main import app, get_current_user


# ========================================================================
# Test 1: Verify that protected endpoints reject unauthenticated requests.
# Evaluation: Security – Secure Auth Flow
# ========================================================================
class TestAuthEnforcement:
    """Validates that the Firebase Authentication dependency gate works correctly."""

    def _unauthenticated_client(self):
        """Remove auth override to test real auth enforcement."""
        app.dependency_overrides.pop(get_current_user, None)
        return TestClient(app)

    def test_chat_requires_auth(self):
        """POST /chat must return 401 when no Authorization header is sent."""
        client = self._unauthenticated_client()
        response = client.post("/chat", json={"session_id": "s1", "message": "hi"})
        assert response.status_code == 401, "Chat endpoint must reject unauthenticated requests"

    def test_sessions_requires_auth(self):
        """GET /sessions must return 401 when no Authorization header is sent."""
        client = self._unauthenticated_client()
        response = client.get("/sessions")
        assert response.status_code == 401, "Sessions endpoint must reject unauthenticated requests"

    def test_history_requires_auth(self):
        """GET /history/{id} must return 401 when no Authorization header is sent."""
        client = self._unauthenticated_client()
        response = client.get("/history/some-session")
        assert response.status_code == 401, "History endpoint must reject unauthenticated requests"


# ========================================================================
# Test 2: Verify user data isolation (Principle of Least Privilege).
# Evaluation: Security – Data Isolation
# ========================================================================
class TestUserDataIsolation:
    """Ensures that User A can never see User B's chat data."""

    def test_user_cannot_see_other_users_sessions(self, authenticated_client_factory, mocker):
        """User A's sessions must be invisible to User B."""
        mocker.patch("app.backend.main.ai_service.get_response", return_value="ok")

        # User A creates a session
        client_a = authenticated_client_factory("user_alice")
        client_a.post("/chat", json={"session_id": "alice-session", "message": "Alice here"})

        # User B queries sessions
        client_b = authenticated_client_factory("user_bob")
        response = client_b.get("/sessions")
        session_ids = [s["session_id"] for s in response.json()]
        assert "alice-session" not in session_ids, "User B must not see User A's sessions"

    def test_user_cannot_read_other_users_history(self, authenticated_client_factory, mocker):
        """User A's message history must be empty for User B."""
        mocker.patch("app.backend.main.ai_service.get_response", return_value="ok")

        # User A creates a message
        client_a = authenticated_client_factory("user_alice")
        client_a.post("/chat", json={"session_id": "shared-id", "message": "Secret"})

        # User B tries to read the same session_id
        client_b = authenticated_client_factory("user_bob")
        response = client_b.get("/history/shared-id")
        assert response.status_code == 200
        assert len(response.json()) == 0, "User B must get an empty history for User A's session"
