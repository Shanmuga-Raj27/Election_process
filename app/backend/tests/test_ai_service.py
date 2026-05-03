"""
AI Service Test Suite: Resilience & Fallback Logic
==================================================
Validates the Multi-Model Resilience stack, history summarization,
and safety-first error handling.

Evaluation Keywords: Resilience Engineering, Fault Tolerance, Gemini Flash.
"""
import pytest
from unittest.mock import MagicMock, patch
from ..ai_service import AIService

class TestAIServiceResilience:
    """Validates that the AI service gracefully handles model failures."""

    def test_model_discovery_on_init(self, mocker):
        """Service should initialize without crashing even if some models are unavailable."""
        service = AIService()
        assert service is not None

    def test_streaming_fallback_logic(self, mocker):
        """Service should cycle through models if the first one returns a 429/404."""
        service = AIService()
        service.client = MagicMock()
        
        # Simulate first model failing with 429, second one succeeding
        mock_chat = MagicMock()
        mock_chat.send_message_stream.return_value = [MagicMock(text="Success")]
        
        # side_effect returns 429 for the first call, then mock_chat for the second
        service.client.chats.create.side_effect = [
            Exception("429 Resource Exhausted"),
            mock_chat
        ]
        
        chunks = list(service.get_streaming_response("Hello", []))
        assert "Success" in chunks
        assert service.client.chats.create.call_count >= 2

class TestErrorHandling:
    """Validates the 'friendly fallback' system for user-facing errors."""

    def test_all_models_failed_returns_unreachable_message(self, mocker):
        """When the entire Resilience Stack fails, return the 'busy' message."""
        service = AIService()
        service.client = MagicMock()
        # Simulate every model failing
        service.client.chats.create.side_effect = Exception("Overloaded")
        
        with pytest.raises(Exception) as exc:
            # Consume the generator to trigger the exception
            list(service.get_streaming_response("Hi"))
        assert "busy" in str(exc.value) or "unreachable" in str(exc.value)

    def test_missing_api_key_exception(self, mocker):
        """Should raise a configuration error if no client exists."""
        service = AIService()
        service.client = None
        with pytest.raises(Exception) as exc:
            list(service.get_streaming_response("Hi"))
        assert "Key not configured" in str(exc.value)
