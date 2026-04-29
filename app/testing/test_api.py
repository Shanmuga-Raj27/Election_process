import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add backend to path so we can import main
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from main import app
from database import Base, get_db

# Setup Test Database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_election.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "Election Assistant AI" in response.json()["message"]

def test_chat_endpoint_mock(mocker):
    # Mock Gemini response to save quota
    mocker.patch("ai_service.ai_service.get_response", return_value="Mocked AI response about elections.")
    
    response = client.post("/chat", json={"session_id": "test-session", "message": "What is an election?"})
    assert response.status_code == 200
    assert response.json()["response"] == "Mocked AI response about elections."
    assert response.json()["session_id"] == "test-session"

def test_history_endpoint():
    # Insert a message first
    client.post("/chat", json={"session_id": "history-session", "message": "Hello"})
    
    response = client.get("/history/history-session")
    assert response.status_code == 200
    assert len(response.json()) > 0
    assert response.json()[0]["user_message"] == "Hello"
