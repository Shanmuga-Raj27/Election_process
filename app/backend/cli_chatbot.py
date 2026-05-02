"""
NEA - AI CLI Chatbot
=====================
A fully authenticated CLI interface for the National Election Assistant.
Supports Firebase Email/Password login, per-user session history,
and streamed AI responses via the FastAPI backend.

Usage:
  1. Start the FastAPI server in a separate terminal: `fastapi dev main.py`
  2. Run this CLI: `python cli_chatbot.py`
"""
import os
import uuid
import getpass
import requests
from dotenv import load_dotenv

load_dotenv()

# ─── Configuration ──────────────────────────────────────────────────────
SERVER_URL = os.getenv("CLI_SERVER_URL", "http://127.0.0.1:8000")
FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")
FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"


def firebase_login() -> dict | None:
    """
    Authenticates the user via Firebase Email/Password REST API.
    Returns a dict with 'idToken', 'email', 'localId' on success, or None on failure.
    """
    if not FIREBASE_WEB_API_KEY:
        print("\n❌ Error: FIREBASE_WEB_API_KEY not found in .env file.")
        print("   Add it to app/backend/.env to enable CLI login.")
        return None

    print("\n🔐 Login to NEA - AI")
    print("─" * 35)
    email = input("   Email: ").strip()
    password = input("   Password: ").strip()

    try:
        response = requests.post(
            f"{FIREBASE_AUTH_URL}?key={FIREBASE_WEB_API_KEY}",
            json={
                "email": email,
                "password": password,
                "returnSecureToken": True,
            },
            timeout=15,
        )

        if response.status_code == 200:
            data = response.json()
            print(f"\n✅ Logged in as: {data.get('email')}")
            return data
        else:
            error = response.json().get("error", {})
            msg = error.get("message", "Unknown error")
            print(f"\n❌ Login failed: {msg}")
            return None

    except requests.ConnectionError:
        print("\n❌ Could not reach Firebase. Check your internet connection.")
        return None


def chat(id_token: str, user_email: str):
    """
    Main chat loop. Sends authenticated requests to the FastAPI backend
    so that every message is saved to the database under the user's UID.
    """
    session_id = str(uuid.uuid4())
    headers = {
        "Authorization": f"Bearer {id_token}",
        "Content-Type": "application/json",
    }

    print(f"\n{'═' * 50}")
    print(f"  NEA - AI  |  National Election Assistant")
    print(f"  User: {user_email}")
    print(f"  Session: {session_id[:8]}...")
    print(f"{'═' * 50}")
    print("  Type 'exit' or 'quit' to stop.\n")

    while True:
        try:
            user_input = input("You: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit"]:
                print("\n👋 Goodbye! Your chat history has been saved.")
                break

            print("\nNEA: ", end="", flush=True)

            # Send to the authenticated streaming endpoint
            with requests.post(
                f"{SERVER_URL}/chat/stream",
                json={"session_id": session_id, "message": user_input},
                headers=headers,
                stream=True,
                timeout=60,
            ) as response:
                if response.status_code == 200:
                    for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
                        if chunk:
                            print(chunk, end="", flush=True)
                    print("\n")
                elif response.status_code == 401:
                    print("🔒 Session expired. Please restart and log in again.")
                    break
                else:
                    print(f"⚠️  Server error: {response.status_code}")
                    print(f"   {response.text}\n")

        except requests.ConnectionError:
            print(f"\n❌ Cannot reach server at {SERVER_URL}")
            print("   Make sure `fastapi dev main.py` is running in another terminal.")
            break
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye! Your chat history has been saved.")
            break


def main():
    print("╔══════════════════════════════════════════════╗")
    print("║    NEA - AI  CLI Chatbot                     ║")
    print("║    National Election Information Companion   ║")
    print("╚══════════════════════════════════════════════╝")

    # Step 1: Verify server is reachable
    try:
        health = requests.get(f"{SERVER_URL}/", timeout=5)
        if health.status_code != 200:
            raise ConnectionError()
        print(f"\n✅ Server online at {SERVER_URL}")
    except Exception:
        print(f"\n❌ Server not reachable at {SERVER_URL}")
        print("   Start the server first: cd app/backend && fastapi dev main.py")
        return

    # Step 2: Authenticate
    user_data = firebase_login()
    if not user_data:
        return

    # Step 3: Start chatting
    chat(id_token=user_data["idToken"], user_email=user_data["email"])


if __name__ == "__main__":
    main()
