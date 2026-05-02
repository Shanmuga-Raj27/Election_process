# Prompt 17: Winning the Google Virtual Promptwar

## Role
You are a **Senior Full-Stack QA Engineer and DevOps Architect**. Your objective is to finalize the **National Election Information Companion (NEIC)** into a production-grade, competition-winning AI application.

---

## 🎯 AI Evaluation Focus Areas & Keyword Optimization

### 1. Code Quality – Structure, Readability, Maintainability
*   **Architecture**: Enforce a **Modular Monolith** structure. Backend (`FastAPI` + `SQLAlchemy 2.0` + `Pydantic v2`) and Frontend (`Vite` + `React 19` + `TailwindCSS`) are strictly decoupled.
*   **Testing Architecture**: Use a shared `conftest.py` with **Dependency Injection overrides** for clean, isolated test fixtures.
*   **Keywords**: `Clean Architecture`, `DRY Principle`, `Self-Documenting Code`, `Strict Typing`, `Modular Design`.

### 2. Security – Safe & Responsible Implementation
*   **Authentication**: All sensitive endpoints are gated by **Firebase Authentication** via JWT Bearer tokens.
*   **Data Isolation**: Every database query is filtered by the authenticated `user_id` to prevent cross-user data leakage.
*   **CORS Hardening**: Origins are controlled via `ALLOWED_ORIGINS` environment variable.
*   **Credentials**: `serviceAccountKey.json` is excluded from version control via `.gitignore`.
*   **Keywords**: `JWT Verification`, `Principle of Least Privilege`, `Input Sanitization`, `Secure Auth Flow`, `CORS Policy`.

### 3. Efficiency – Optimal Use of Resources
*   **Streaming**: **Asynchronous Streaming Responses** (`StreamingResponse`) provide a live chat feel via the Gemini API.
*   **Database**: SQLite with indexed `user_id` and `session_id` columns for O(log n) lookups.
*   **Error Handling**: Graceful fallbacks for 503 (overload), safety blocks, and generic errors — never crashes.
*   **Keywords**: `Async/Await`, `Streamed I/O`, `Non-blocking Operations`, `Indexed Queries`, `Graceful Degradation`.

### 4. Testing – Validation of Functionality
*   **Backend (Pytest)**: 3 test files, 19 tests covering API integration, security enforcement, user data isolation, AI service initialization, Gemini error handling, and streaming validation.
*   **Frontend (Vitest)**: 4 test files, 19 tests covering Navbar auth states, Hero accessibility, Footer semantic HTML & link security, and ChatArea ARIA labels & interaction.
*   **Total**: **38 automated tests across 7 files** — all passing.
*   **Keywords**: `Unit Testing`, `Integration Testing`, `Automated Mocks`, `Code Coverage`, `Smoke Testing`, `Test Isolation`.

### 5. Accessibility – Inclusive & Usable Design
*   **Semantic HTML5**: Uses `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>` throughout.
*   **ARIA Labels**: All interactive buttons (Send, Homepage) have `aria-label` attributes.
*   **i18n**: Full internationalization support for English, Hindi, and Tamil via `react-i18next`.
*   **External Link Security**: All `target="_blank"` links use `rel="noopener noreferrer"`.
*   **Keywords**: `WCAG 2.1`, `A11y`, `Screen Reader Optimized`, `Semantic HTML`, `Aria-Roles`, `Internationalization`.

### 6. Google Services – Meaningful Integration
*   **AI Core**: **Google Gemini 2.5 Flash** powers the election education chatbot with strict neutrality and scope rules.
*   **Auth**: **Firebase Authentication SDK** provides Google Sign-In and Email/Password authentication.
*   **Responsible AI**: System instruction enforces non-partisan, process-focused responses and redirects to the official **Election Commission of India (ECI)** portal.
*   **Keywords**: `Generative AI`, `Google Cloud Ecosystem`, `Firebase Auth SDK`, `Gemini API Integration`, `Responsible AI`.

---

## 🏗️ Project Structure
```
Election Assistant/
├── app/
│   ├── backend/
│   │   ├── main.py              # FastAPI application with Firebase Auth
│   │   ├── ai_service.py        # Gemini 2.5 Flash integration
│   │   ├── database.py          # SQLAlchemy ORM with user isolation
│   │   ├── tests/
│   │   │   ├── conftest.py      # Shared fixtures & DB setup
│   │   │   ├── test_api.py      # API integration tests
│   │   │   ├── test_security.py # Auth & data isolation tests
│   │   │   └── test_ai_service.py # Gemini & error handling tests
│   │   └── .gitignore           # Excludes .env, *.db, serviceAccountKey.json
│   └── frontend/
│       ├── src/
│       │   ├── components/      # Navbar, Hero, Footer, Chat UI
│       │   ├── context/         # AuthContext (Firebase)
│       │   ├── services/        # API service with Bearer tokens
│       │   ├── tests/
│       │   │   ├── setup.jsx    # Global mocks (Firebase, i18n, Router)
│       │   │   ├── Navbar.test.jsx
│       │   │   ├── Hero.test.jsx
│       │   │   ├── Footer.test.jsx
│       │   │   └── ChatArea.test.jsx
│       │   └── assets/locales/  # en.json, hi.json, ta.json
│       └── vite.config.js       # Vitest configuration
└── prompt_base/                 # All development prompts
```

---

## ✅ Final Execution Checklist
1.  Run `pytest tests/ -v` in `app/backend/` — expect **19 passed**.
2.  Run `npm test -- --run` in `app/frontend/` — expect **19 passed**.
3.  Verify `.gitignore` excludes `serviceAccountKey.json`, `.env`, `*.db`.
4.  Verify branding: **National Election Information Companion (NEIC)** / **NEA - AI**.
5.  Verify all external links use `rel="noopener noreferrer"`.

> [!IMPORTANT]
> This project represents the pinnacle of educational AI—balancing powerful Google-backed generative intelligence with enterprise-grade security, full accessibility compliance, and a comprehensive automated testing shield.
