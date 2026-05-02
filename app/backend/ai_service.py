"""
AI Orchestration service for interacting with Google Gemini 2.5 Flash.
Implements the 'Prompt Manager' pattern for decoupled system instructions.
"""
import os
from pathlib import Path
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

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
    def __init__(self):
        self.client = None
        if GEMINI_API_KEY:
            self.client = genai.Client(api_key=GEMINI_API_KEY)
        self.model_id = "gemini-2.5-flash"

    def get_response(self, message: str, history: list = None):
        if not self.client:
            return "Oops! It looks like my API Key is missing. Please check the configuration."
        
        try:
            chat_history = []
            if history:
                for msg in history:
                    chat_history.append(types.Content(role="user", parts=[types.Part(text=msg.user_message)]))
                    chat_history.append(types.Content(role="model", parts=[types.Part(text=msg.ai_response)]))
            
            chat = self.client.chats.create(
                model=self.model_id,
                history=chat_history,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.7,
                )
            )
            
            response = chat.send_message(message)
            return response.text
            
        except Exception as e:
            # Polite human-like error handling
            if "503" in str(e) or "overloaded" in str(e).lower():
                return "My apologies! My connection to the knowledge base is a bit busy right now. Could you please try asking your question again in a moment?"
            elif "safety" in str(e).lower():
                return "I'm sorry, I can't discuss that specific topic. As your Election Teacher, I focus on the process of voting and how our democracy works. Is there anything else about the election process you'd like to know?"
            return "I ran into a small hiccup while thinking about that! Could you please try asking again? I'm ready when you are."

    def get_streaming_response(self, message: str, history: list = None):
        if not self.client:
            yield "I can't reach my brain right now! Please make sure the API key is set up."
            return

        try:
            chat_history = []
            if history:
                for msg in history:
                    chat_history.append(types.Content(role="user", parts=[types.Part(text=msg.user_message)]))
                    chat_history.append(types.Content(role="model", parts=[types.Part(text=msg.ai_response)]))
            
            chat = self.client.chats.create(
                model=self.model_id,
                history=chat_history,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_INSTRUCTION,
                    temperature=0.7,
                )
            )
            
            for chunk in chat.send_message_stream(message):
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            # Polite human-like error handling for streams
            if "503" in str(e) or "overloaded" in str(e).lower():
                yield "My apologies! My connection to the knowledge base is a bit busy right now. Could you please try again in a moment?"
            else:
                yield "I ran into a small hiccup while thinking about that! Could you please try asking again? I'm ready when you are."

ai_service = AIService()
