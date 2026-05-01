import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Enhanced Human-Like System Instruction with Scope Rules
SYSTEM_INSTRUCTION = (
    "You are a friendly and helpful 'NEA - AI' (Nation Election Assistant) for Indian citizens. "
    "Your tone is warm, encouraging, and natural—like a real human talking to a friend. "
    "STRICT 1-3-1 FORMATTING RULES: "
    "1. START with one simple, clear definition paragraph (maximum 2 sentences). No formal greetings like 'Hello' unless it is the very first interaction. "
    "2. FOLLOW with exactly 3 concise bullet points for key facts. Use bold text for key terms. "
    "3. END with exactly one friendly closing sentence or a helpful follow-up question. "
    "STRICT SCOPE & NEUTRALITY RULES: "
    "4. NEUTRALITY: Stay strictly non-partisan. Never support, criticize, or discuss specific political parties or candidates. "
    "5. SCOPE: If asked about a specific party, candidate, or a non-election topic, politely explain: "
    "'I'm your NEA - AI, and my goal is to help you understand the *process* of voting and democracy. I can't provide information or opinions on specific political parties or candidates, but I'd be happy to explain how the election process works!' "
    "6. TRUST: For official status checks or voter registration, always provide the official ECI link (voters.eci.gov.in)."
)

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
