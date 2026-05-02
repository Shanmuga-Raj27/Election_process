# Navigate to backend (if not already there)

cd app\backend
.venv\Scripts\activate

# Install
uv pip install -r requirements.txt

# Run Backend
fastapi dev main.py

# Run Tests (from backend folder)
pytest tests/ -v

---

## 🚀 Professional Testing Guide

### 🧪 Automated Testing

#### **Backend (Pytest)**
Run all 19 backend tests (API, Security, AI Service):
```

cd app/backend
pytest tests/ -v

```

#### **Frontend (Vitest)**

Run all 19 frontend unit tests:

```
cd app/frontend
npm test -- --run

```

---

### 🖥️ Manual Terminal Testing (Backend)

#### **1. Check API Health**
Verify the backend is online and responding:
```powershell
curl http://127.0.0.1:8000/
```
*Expected: `{"message": "NEA - AI Backend is online."}`*

#### **2. Verify AI Service Logic (CLI)**
Test the Gemini integration directly in the terminal without using the web UI:
```
cd app/backend
python cli_chatbot.py

```

---

### 🌐 Manual Terminal Testing (Frontend)

#### **1. Development Server**
Start the frontend with Vite:
```
cd app/frontend
npm run dev

```

#### **2. Production Build Check**
Verify the build process works correctly (pre-deployment check):
```
cd app/frontend
npm run build

```

#### **3. Linting Check**
Run the linter to catch accessibility and syntax warnings:
```
cd app/frontend
npm run lint

```
