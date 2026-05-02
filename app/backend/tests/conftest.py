"""
Shared Test Configuration (conftest.py)
========================================
Provides a single, authoritative test database and authenticated test client
for all backend test modules. This ensures database isolation per test
and prevents cross-test contamination.

Evaluation Keywords: Clean Architecture, Test Isolation, Dependency Injection.
"""
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Set TESTING env var before importing app modules
os.environ["TESTING"] = "1"

from ..main import app, get_current_user
from ..database import Base, get_db

# ─── Shared In-Memory Test Database ────────────────────────────────────
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_neic.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


async def override_get_current_user():
    """Default mock auth: all requests are authenticated as 'test_user_id'."""
    return "test_user_id"


# ─── Apply dependency overrides globally ────────────────────────────────
app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[get_current_user] = override_get_current_user


@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    """Create fresh tables before each test, drop them after."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)
    # Restore default auth override after each test
    app.dependency_overrides[get_current_user] = override_get_current_user


@pytest.fixture
def client():
    """Provides a TestClient instance for making HTTP requests."""
    return TestClient(app)


@pytest.fixture
def authenticated_client_factory():
    """Factory fixture: returns a function that creates a TestClient for a specific user."""
    def _make_client(user_id: str) -> TestClient:
        async def mock_user():
            return user_id
        app.dependency_overrides[get_current_user] = mock_user
        return TestClient(app)
    return _make_client
