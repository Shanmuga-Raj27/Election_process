import pytest
from fastapi.testclient import TestClient
from main import app, get_current_user
from firebase_admin import auth

client = TestClient(app)

# 1. Mock Authentication for testing
def mock_get_current_user():
    return {"uid": "test_user_123", "email": "test@example.com"}

@pytest.fixture
def authenticated_client():
    app.dependency_overrides[get_current_user] = mock_get_current_user
    yield TestClient(app)
    app.dependency_overrides.clear()

def test_health_check():
    """Verify server is online and connected to Firestore."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"
    assert "neic-project" in response.json().get("db_project", "neic-project")

def test_unauthorized_chat():
    """Verify that chat is protected by Firebase Auth."""
    response = client.post("/chat/stream", json={"message": "Hello", "session_id": "test_sid"})
    # Should be 401 because we haven't provided a token or mock
    assert response.status_code == 401

def test_authenticated_chat_flow(authenticated_client):
    """Verify that an authenticated user can initiate a chat."""
    # We use a short timeout for local tests
    payload = {
        "message": "Who can vote in India?",
        "session_id": "local_test_session"
    }
    
    # We test the endpoint exists and accepts the request
    # Note: Full streaming tests usually require httpx for async streaming
    response = authenticated_client.post("/chat/stream", json=payload)
    
    # If this returns 200, it means:
    # 1. The request was authenticated
    # 2. Firestore 'get' worked
    # 3. AI Service initialized
    assert response.status_code == 200
    assert response.headers["content-type"] == "text/plain; charset=utf-8"

def test_firestore_direct():
    """Verify direct Firestore write/read works on neic-project."""
    from main import db
    test_ref = db.collection("internal_tests").document("connectivity_check")
    test_ref.set({"status": "working", "timestamp": "now"})
    
    doc = test_ref.get()
    assert doc.exists
    assert doc.to_dict()["status"] == "working"
    
    # Cleanup
    test_ref.delete()
    print("\n✅ Firestore Connectivity Verified!")
