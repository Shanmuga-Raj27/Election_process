"""
AI Orchestration service for interacting with Google Gemini 2.5 Flash.
Implements the 'Prompt Manager' pattern for decoupled system instructions
and Redis Semantic Caching for stateful response persistence.
"""
import os
import hashlib
import json
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

try:
    import redis
    import numpy as np
    _REDIS_AVAILABLE = True
except ImportError:
    _REDIS_AVAILABLE = False

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
CACHE_TTL = int(os.getenv("CACHE_TTL", 86400))  # Default: 24 hours
SIMILARITY_THRESHOLD = 0.92  # 92% similarity for semantic cache hit

# Load system instruction from external prompt file (Prompt Manager pattern)
_PROMPT_DIR = Path(__file__).parent / "prompts"

def _load_prompt(filename: str) -> str:
    """Load a prompt from the prompts directory."""
    prompt_path = _PROMPT_DIR / filename
    if prompt_path.exists():
        return prompt_path.read_text(encoding="utf-8").strip()
    return "You are a helpful assistant for Indian election information."

SYSTEM_INSTRUCTION = _load_prompt("system_v1.txt")

class AIService:
    """Orchestrates AI inference with Multi-Model Resilience and Semantic Caching."""

    def __init__(self):
        self.client = None
        if GEMINI_API_KEY:
            self.client = genai.Client(api_key=GEMINI_API_KEY)
        
        # Comprehensive fallback stack with latest aliases
        self.models = [
            "gemini-1.5-flash-latest", 
            "gemini-1.5-pro-latest", 
            "gemini-2.0-flash-exp", 
            "gemini-2.5-flash", 
            "gemini-2.5-pro"
        ]
        self.embedding_model = "text-embedding-004"
        
        self.cache = None
        if _REDIS_AVAILABLE:
            try:
                self.cache = redis.from_url(REDIS_URL, decode_responses=True)
                self.cache.ping()
            except Exception:
                self.cache = None

    def _get_embedding(self, text: str) -> list:
        """Generate a vector embedding for semantic search."""
        if not self.client: return []
        try:
            result = self.client.models.embed_content(
                model=self.embedding_model,
                contents=text
            )
            return result.embeddings[0].values
        except Exception:
            return []

    def _cosine_similarity(self, v1, v2):
        """Calculate similarity between two vectors."""
        if not v1 or not v2: return 0
        dot_product = np.dot(v1, v2)
        norm_v1 = np.linalg.norm(v1)
        norm_v2 = np.linalg.norm(v2)
        return dot_product / (norm_v1 * norm_v2)

    def _get_semantic_cache(self, message: str) -> str | None:
        """Find a semantically similar query in Redis."""
        if not self.cache: return None
        try:
            query_vector = self._get_embedding(message)
            if not query_vector: return None
            
            # Fetch all recent keys (optimization: only check last 50 queries)
            keys = self.cache.keys("neic:vector:*")
            for key in keys[:50]:
                stored_data = json.loads(self.cache.get(key))
                similarity = self._cosine_similarity(query_vector, stored_data['vector'])
                if similarity >= SIMILARITY_THRESHOLD:
                    return stored_data['response']
            return None
        except Exception:
            return None

    def _set_semantic_cache(self, message: str, response: str) -> None:
        """Store query vector and response for future semantic matches."""
        if not self.cache: return
        try:
            vector = self._get_embedding(message)
            if not vector: return
            
            cache_data = {
                "vector": vector,
                "response": response
            }
            # Unique key based on message hash
            key = f"neic:vector:{hashlib.md5(message.encode()).hexdigest()}"
            self.cache.setex(key, CACHE_TTL, json.dumps(cache_data))
        except Exception:
            pass

    def _summarize_history(self, history: list) -> str:
        """Prompt Thinning: Condense long history into a high-level summary."""
        if not history or len(history) < 6: return ""
        try:
            # Use the confirmed working model for summarization
            text_to_summarize = "\n".join([f"User: {h.user_message}\nAI: {h.ai_response}" for h in history])
            prompt = f"Summarize the following chat history in 3 sentences, preserving key user intents and election topics discussed:\n\n{text_to_summarize}"
            
            # Use confirmed account-specific name
            response = self.client.models.generate_content(
                model="gemini-flash-latest",
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"DEBUG: Summarization failed (skipping): {str(e)[:50]}")
            return ""

    def get_response(self, message: str, history: list = None):
        """Get a response with Multi-Model Resilience and Semantic Caching."""
        import time
        
        if not self.client:
            raise Exception("Gemini API Key not configured")

        # 1. Semantic Cache Check (Instant Response)
        if not history:
            cached = self._get_semantic_cache(message)
            if cached: return cached

        # 2. Prompt Thinning (Context Summarization)
        context_summary = self._summarize_history(history) if history else ""
        
        # Confirmed variations
        model_variations = ["gemini-flash-latest", "gemini-pro-latest", "gemini-2.5-flash"]

        # 3. Multi-Model Resilience Loop
        for model_id in model_variations:
            try:
                chat_history = []
                if history:
                    history_to_use = history[-2:] if context_summary else history
                    for msg in history_to_use:
                        chat_history.append(types.Content(role="user", parts=[types.Part(text=msg.user_message)]))
                        chat_history.append(types.Content(role="model", parts=[types.Part(text=msg.ai_response)]))

                instruction = SYSTEM_INSTRUCTION
                if context_summary:
                    instruction += f"\n\n[Previous Conversation Summary]: {context_summary}"

                chat = self.client.chats.create(
                    model=model_id,
                    history=chat_history,
                    config=types.GenerateContentConfig(
                        system_instruction=instruction,
                        temperature=0.7,
                    )
                )

                response = chat.send_message(message)
                result = response.text

                # Populate Semantic Cache
                if not history:
                    self._set_semantic_cache(message, result)

                return result

            except Exception as e:
                error_str = str(e).lower()
                if any(x in error_str for x in ["404", "not found", "429", "resource_exhausted", "503", "overloaded"]):
                    continue
                raise e
        
        raise Exception("All AI models are currently busy or unreachable.")

    def get_streaming_response(self, message: str, history: list = None):
        """Yield chunks with Multi-Model Resilience and Naming Auto-Correction."""
        if not self.client:
            raise Exception("Gemini API Key not configured")

        # 1. Try ACCOUNT-SPECIFIC confirmed models first
        model_variations = [
            "gemini-flash-latest",
            "gemini-pro-latest",
            "gemini-flash-lite-latest",
            "gemini-2.5-flash",
            "gemini-2.0-flash"
        ]

        context_summary = self._summarize_history(history) if history else ""

        for model_id in model_variations:
            try:
                print(f"DEBUG: Trying AI Model: {model_id}...")
                chat_history = []
                if history:
                    history_to_use = history[-2:] if context_summary else history
                    for msg in history_to_use:
                        chat_history.append(types.Content(role="user", parts=[types.Part(text=msg.user_message)]))
                        chat_history.append(types.Content(role="model", parts=[types.Part(text=msg.ai_response)]))
                
                instruction = SYSTEM_INSTRUCTION
                if context_summary:
                    instruction += f"\n\n[Previous Conversation Summary]: {context_summary}"

                chat = self.client.chats.create(
                    model=model_id,
                    history=chat_history,
                    config=types.GenerateContentConfig(
                        system_instruction=instruction,
                        temperature=0.7,
                    )
                )
                
                has_data = False
                for chunk in chat.send_message_stream(message):
                    if chunk.text:
                        has_data = True
                        yield chunk.text
                
                if not has_data:
                    print(f"⚠️  WARNING: Model {model_id} returned empty content (possibly filtered).")
                    yield "I'm sorry, I cannot provide a response to that specific query due to safety guidelines or policy restrictions."
                return # Success!

            except Exception as e:
                error_str = str(e).lower()
                print(f"DEBUG: Model {model_id} failed: {error_str[:100]}...")
                if any(x in error_str for x in ["404", "not found", "429", "resource_exhausted", "503", "overloaded"]):
                    continue
                raise e

        # 2. EMERGENCY FALLBACK: Self-Discovery (Find any working model)
        print("DEBUG: All primary models failed. Attempting Deep Self-Discovery...")
        try:
            available_models = self.client.models.list()
            for m in available_models:
                # Try any model that has 'gemini' in the name
                if "gemini" in m.name.lower():
                    try:
                        clean_name = m.name.split("/")[-1]
                        print(f"DEBUG: Trying Discovered Model: {clean_name}...")
                        chat = self.client.chats.create(model=clean_name)
                        for chunk in chat.send_message_stream(message):
                            if chunk.text: yield chunk.text
                        return 
                    except Exception:
                        continue
        except Exception as e:
            print(f"DEBUG: Critical Discovery Error: {str(e)}")
            pass
        
        raise Exception("All Gemini models are currently busy, exhausted, or unreachable.")

ai_service = AIService()
