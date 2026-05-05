import os
import requests
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load production keys
load_dotenv()

API_KEY = os.getenv("FIREBASE_WEB_API_KEY")
PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "neic-project")
SERVER_URL = os.getenv("CLI_SERVER_URL", "http://127.0.0.1:8000")

def diagnostic_auth():
    print("🔍 --- NEA-AI Authentication Diagnostic --- 🔍\n")

    if not API_KEY:
        print("❌ ERROR: FIREBASE_WEB_API_KEY missing from .env")
        return

    # 1. TEST: Firebase REST Login
    print(f"STEP 1: Attempting Firebase REST Login (API Key: {API_KEY[:10]}...)")
    email = input("Enter test user email: ")
    password = input("Enter test user password: ")
    
    login_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"
    try:
        r = requests.post(login_url, json={"email": email, "password": password, "returnSecureToken": True})
        if r.status_code != 200:
            print(f"❌ LOGIN FAILED: {r.text}")
            print("\n💡 POSSIBLE CAUSE: Your API Key might belong to the WRONG project.")
            return
        
        id_token = r.json()['idToken']
        uid = r.json()['localId']
        print(f"✅ LOGIN SUCCESS: Received token for UID {uid}")
        
    except Exception as e:
        print(f"❌ NETWORK ERROR: {e}")
        return

    # 2. TEST: Local Verification (Project Alignment)
    print(f"\nSTEP 2: Verifying Token Identity (Target Project: {PROJECT_ID})")
    try:
        # Initialize admin SDK if needed
        if not firebase_admin._apps:
            cred_file = "serviceAccountKey.json"
            if os.path.exists(cred_file):
                cred = credentials.Certificate(cred_file)
                firebase_admin.initialize_app(cred)
            else:
                firebase_admin.initialize_app()
        
        decoded = auth.verify_id_token(id_token)
        print(f"✅ TOKEN VERIFIED LOCALLY")
        print(f"   - Issuer: {decoded.get('iss')}")
        print(f"   - Audience (Project ID): {decoded.get('aud')}")
        
        if decoded.get('aud') != PROJECT_ID:
            print(f"⚠️  WARNING: Project Mismatch! Token is for {decoded.get('aud')} but you are targeting {PROJECT_ID}")
        else:
            print(f"✨ IDENTITY ALIGNED: Token belongs to {PROJECT_ID}")

    except Exception as e:
        print(f"❌ LOCAL VERIFICATION FAILED: {e}")
        print("\n💡 POSSIBLE CAUSE: Your serviceAccountKey.json or Application Default is for a DIFFERENT project than the token.")

    # 3. TEST: Live Backend Handshake (Stealth Mode)
    print(f"\nSTEP 3: Testing Handshake with Live Server ({SERVER_URL})")
    try:
        # We use the new 'X-Firebase-Auth' header
        headers = {"X-Firebase-Auth": f"Bearer {id_token}"}
        r = requests.get(f"{SERVER_URL}/sessions", headers=headers)
        
        print(f"📡 SERVER RESPONSE: {r.status_code}")
        print(f"   Content: {r.text}")
        
        if r.status_code == 200:
            print("\n🏆 SUCCESS: Full security chain is working!")
        elif r.status_code == 401:
            print("\n❌ 401 UNAUTHORIZED: The server rejected your token.")
            print("💡 POSSIBLE CAUSE: Your server is STILL running the old code (using 'Authorization' instead of 'X-Firebase-Auth').")
            print("   ACTION: Deploy the backend using the 'deployment_playbook.md'!")
        else:
            print(f"\n❌ SERVER ERROR: {r.status_code}")

    except Exception as e:
        print(f"❌ SERVER CONNECTION FAILED: {e}")

if __name__ == "__main__":
    diagnostic_auth()
