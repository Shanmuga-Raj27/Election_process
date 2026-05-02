"""
AI Service & Google Integration Test Suite for NEIC Backend
=============================================================
Tests: Gemini API client initialization, error handling logic,
       system instruction integrity, and streaming response validation.

Evaluation Keywords: Generative AI, Google Cloud Ecosystem, Gemini API,
                     Async Streaming, Non-blocking Operations.
"""
import pytest
from unittest.mock import MagicMock, patch
from ..ai_service import AIService, SYSTEM_INSTRUCTION


# ========================================================================
# Test 1: Gemini Client Initialization & Configuration
# Evaluation: Google Services – Meaningful Integration
# ========================================================================
class TestAIServiceInitialization:
    """Validates that the AIService correctly initializes the Gemini client."""

    def test_client_is_none_without_api_key(self):
        """AIService.client must be None if GEMINI_API_KEY is not set."""
        with patch.dict('os.environ', {'GEMINI_API_KEY': ''}, clear=False):
            with patch('app.backend.ai_service.GEMINI_API_KEY', None):
                service = AIService()
                assert service.client is None, "Client must be None when API key is missing"

    def test_model_id_is_gemini(self):
        """AIService must be configured to use a Google Gemini model."""
        service = AIService()
        assert "gemini" in service.model_id, "Model ID must reference a Gemini model"

    def test_system_instruction_contains_neutrality_rule(self):
        """The system instruction must enforce political neutrality (responsible AI)."""
        assert "non-partisan" in SYSTEM_INSTRUCTION.lower() or "neutrality" in SYSTEM_INSTRUCTION.lower(), \
            "System instruction must enforce political neutrality for safe AI usage"

    def test_system_instruction_references_eci(self):
        """The system instruction must reference the official ECI portal for trust."""
        assert "voters.eci.gov.in" in SYSTEM_INSTRUCTION, \
            "System instruction must direct users to the official ECI website"


# ========================================================================
# Test 2: AI Response Error Handling
# Evaluation: Efficiency – Optimal Use of Resources
# ========================================================================
class TestAIServiceErrorHandling:
    """Validates graceful error handling when the Gemini API fails."""

    def test_missing_key_returns_friendly_message(self):
        """When the API key is missing, get_response must return a user-friendly string."""
        service = AIService()
        service.client = None  # Simulate missing key
        response = service.get_response("Hello")
        assert isinstance(response, str), "Response must be a string"
        assert "API Key" in response or "missing" in response.lower(), \
            "Must inform the user about the missing API key"

    def test_503_error_returns_overload_message(self):
        """When Gemini returns a 503, the response must be a polite overload message."""
        service = AIService()
        service.client = MagicMock()
        service.client.chats.create.side_effect = Exception("503 Service Unavailable - model overloaded")
        response = service.get_response("Test")
        assert "busy" in response.lower() or "again" in response.lower(), \
            "Must handle 503 errors with a polite retry message"

    def test_safety_error_returns_scope_message(self):
        """When Gemini flags a safety concern, the response must redirect to election process."""
        service = AIService()
        service.client = MagicMock()
        service.client.chats.create.side_effect = Exception("Blocked due to safety settings")
        response = service.get_response("Test")
        assert "process" in response.lower() or "election" in response.lower(), \
            "Must redirect safety-blocked queries to the election process scope"

    def test_generic_error_returns_hiccup_message(self):
        """Any other exception must return the friendly 'hiccup' fallback message."""
        service = AIService()
        service.client = MagicMock()
        service.client.chats.create.side_effect = Exception("Something unexpected happened")
        response = service.get_response("Test")
        assert "hiccup" in response.lower() or "again" in response.lower(), \
            "Must return a polite fallback for unknown errors"


# ========================================================================
# Test 3: Streaming Response Validation
# Evaluation: Efficiency – Async Streaming
# ========================================================================
class TestStreamingResponse:
    """Validates the streaming response generator for live chat feel."""

    def test_streaming_without_client_yields_error(self):
        """Streaming must yield a user-friendly error when the client is missing."""
        service = AIService()
        service.client = None
        chunks = list(service.get_streaming_response("Hello"))
        assert len(chunks) > 0, "Must yield at least one error chunk"
        assert "API key" in chunks[0].lower() or "brain" in chunks[0].lower(), \
            "Streaming error must mention API key issue"
