import requests
import uuid
import sys

BASE_URL = "http://127.0.0.1:8000"

def chat():
    session_id = str(uuid.uuid4())
    print("=== Indian Election Assistant CLI Chatbot ===")
    print(f"Session ID: {session_id}")
    print("Type 'exit' or 'quit' to stop.\n")

    while True:
        try:
            user_input = input("You: ")
            if user_input.lower() in ["exit", "quit"]:
                break
            
            # Using the streaming endpoint for faster perceived response
            print("\nAI: Thinking...", end="", flush=True)
            
            with requests.post(
                f"{BASE_URL}/chat/stream",
                json={"session_id": session_id, "message": user_input},
                stream=True
            ) as response:
                if response.status_code == 200:
                    # Clear the 'Thinking...' text once we start receiving
                    print("\rAI: ", end="", flush=True)
                    for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
                        if chunk:
                            print(chunk, end="", flush=True)
                    print("\n")
                else:
                    print(f"Error: {response.status_code} - {response.text}")
        
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"\nConnection Error: {e}")
            print("Make sure the FastAPI server is running at http://127.0.0.1:8000")
            break

if __name__ == "__main__":
    chat()
