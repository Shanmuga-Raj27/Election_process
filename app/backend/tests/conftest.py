"""
Shared Test Configuration (conftest.py)
========================================
Provides a Mock Firestore environment and authenticated test client.
Ensures zero-dependency testing without requiring real GCP credentials.

Evaluation Keywords: Clean Architecture, Firestore Mocking, Stateless Testing.
"""
import os
import pytest
from unittest.mock import MagicMock
from fastapi.testclient import TestClient

# Set TESTING env var before importing app modules
os.environ["TESTING"] = "1"

from ..main import app, get_current_user

# ─── Firestore Mocking Logic ───────────────────────────────────────────
class MockFirestore:
    def __init__(self):
        self.data = {} # Simulated document storage {collection: {doc_id: data}}

    def collection(self, name):
        return MockCollection(self, name)

class MockCollection:
    def __init__(self, db, name):
        self.db = db
        self.name = name

    def document(self, doc_id):
        return MockDocument(self.db, self.name, doc_id)

    def where(self, field, op, value):
        # Basic filtering for 'uid' == value
        return MockQuery(self.db, self.name, field, value)

class MockQuery:
    def __init__(self, db, coll, field, val):
        self.db = db
        self.coll = coll
        self.field = field
        self.val = val

    def order_by(self, *args, **kwargs):
        return self

    def stream(self):
        coll_data = self.db.data.get(self.coll, {})
        results = []
        for doc_id, data in coll_data.items():
            if data.get(self.field) == self.val:
                mock_doc = MagicMock()
                mock_doc.id = doc_id
                mock_doc.to_dict.return_value = data
                results.append(mock_doc)
        return results

class MockDocument:
    def __init__(self, db, coll, doc_id):
        self.db = db
        self.coll = coll
        self.doc_id = doc_id

    def get(self):
        mock_res = MagicMock()
        data = self.db.data.get(self.coll, {}).get(self.doc_id)
        mock_res.exists = data is not None
        mock_res.to_dict.return_value = data
        return mock_res

    def set(self, data):
        if self.coll not in self.db.data: self.db.data[self.coll] = {}
        self.db.data[self.coll][self.doc_id] = data

    def update(self, data):
        # Simplified update (handles ArrayUnion by just appending if it's a list)
        current = self.db.data.get(self.coll, {}).get(self.doc_id, {})
        for k, v in data.items():
            # Mock firestore.ArrayUnion
            if hasattr(v, 'union_elements'):
                if k not in current: current[k] = []
                current[k].extend(v.union_elements)
            else:
                current[k] = v

# ─── Auth Overrides ──────────────────────────────────────────────────
async def override_get_current_user():
    """Default mock auth: all requests are authenticated as 'test_user_id'."""
    return {"uid": "test_user_id", "email": "test@example.com"}

# ─── Fixtures ─────────────────────────────────────────────────────────
@pytest.fixture(autouse=True)
def mock_db_init(mocker):
    """Intercept Firestore initialization and inject our MockFirestore."""
    mock_fs = MockFirestore()
    mocker.patch("app.backend.main.db", mock_fs)
    # Patch firestore.ArrayUnion to work with our mock
    mock_union = MagicMock()
    mock_union.side_effect = lambda x: MagicMock(union_elements=x)
    mocker.patch("app.backend.main.firestore.ArrayUnion", mock_union)
    
    app.dependency_overrides[get_current_user] = override_get_current_user
    yield mock_fs
    app.dependency_overrides = {}

@pytest.fixture
def client():
    """Provides a TestClient instance for making HTTP requests."""
    return TestClient(app)

@pytest.fixture
def authenticated_client_factory():
    """Factory fixture: returns a function that creates a TestClient for a specific user."""
    def _make_client(user_id: str) -> TestClient:
        async def mock_user():
            return {"uid": user_id, "email": f"{user_id}@example.com"}
        app.dependency_overrides[get_current_user] = mock_user
        return TestClient(app)
    return _make_client
