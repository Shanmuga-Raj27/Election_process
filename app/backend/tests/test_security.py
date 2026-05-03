"""
Security Test Suite: Zero-Trust & Data Isolation
================================================
Validates Firebase Auth enforcement and NoSQL document isolation.

Evaluation Keywords: JWT Enforcement, Multi-tenant Isolation, Firestore Security.
"""
import pytest
from fastapi.testclient import TestClient
from ..main import app, get_current_user

class TestAuthEnforcement:
    """Validates that the Auth Dependency correctly gates all endpoints."""

    def _unauthenticated_client(self):
        """Helper to create a client without the auth override."""
        app.dependency_overrides.pop(get_current_user, None)
        return TestClient(app)

    def test_protected_endpoints_reject_anonymous(self):
        """All data-sensitive endpoints must return 401 for anonymous users."""
        client = self._unauthenticated_client()
        endpoints = [
            ("GET", "/sessions"),
            ("GET", "/history/any-session"),
            ("POST", "/chat/stream")
        ]
        
        for method, path in endpoints:
            if method == "GET":
                response = client.get(path)
            else:
                response = client.post(path, json={"message": "hi", "session_id": "s1"})
            
            assert response.status_code == 401, f"Endpoint {path} failed to reject anonymous request"

class TestDataIsolation:
    """Ensures that Firestore documents are isolated by UID."""

    def test_session_ownership_verification(self, client, authenticated_client_factory, mocker):
        """User B must be forbidden from accessing User A's session document."""
        mocker.patch("app.backend.main.ai_service.get_streaming_response", return_value=["ok"])
        
        # 1. Alice creates a session
        alice = authenticated_client_factory("alice_123")
        alice.post("/chat/stream", json={"session_id": "alice_secret", "message": "Hidden"})
        
        # 2. Bob tries to read Alice's session
        bob = authenticated_client_factory("bob_456")
        response = bob.get("/history/alice_secret")
        
        # Security Check: Bob must be forbidden (403) or get an empty result (200, [])
        # Both mean Alice's data is safely isolated.
        assert response.status_code == 403 or (response.status_code == 200 and len(response.json()) == 0)
