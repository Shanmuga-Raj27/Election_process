# 📚 National Election Information Companion (NEIC)

**Live Demo:** https://neic-project.netlify.app/

## Overview
NEIC (also known as NEA‑AI) is a lightweight AI‑powered web app that helps Indian citizens understand the election process, how to use EVMs, and their voting rights. It offers a friendly chat interface, visual guides, and multi‑language support (English, Hindi, Tamil).

## Purpose
- Provide **non‑partisan** information about voting and democracy.
- Guide users through registration, booth location, and EVM operation.
- Offer a simple, interactive chat powered by Google Gemini 2.5 Flash.

## Tech Stack
| Layer | Technologies |
|-------|--------------|
| Frontend | React (Vite), Tailwind CSS, Framer Motion, i18next, Lucide Icons, Firebase Auth |
| Backend  | FastAPI (Python), SQLAlchemy, SQLite, Firebase Admin SDK |
| AI       | Google Gemini 2.5 Flash |

## Project Folder Architecture
```
Election Assistant/
├─ app/
│  ├─ backend/            # FastAPI server
│  │   ├─ ai_service.py    # Gemini integration
│  │   ├─ cli_chatbot.py   # Authenticated CLI tool
│  │   ├─ database.py      # SQLAlchemy models
│  │   ├─ main.py          # API routes & auth
│  │   └─ tests/           # Pytest suite
│  └─ frontend/           # React UI
│      ├─ public/          # Static files, _redirects
│      └─ src/
│          ├─ assets/      # Images & i18n JSONs
│          ├─ components/  # Re‑usable UI components
│          ├─ context/     # Auth context
│          ├─ pages/       # Home, Chat, EVM Guide, Login
│          ├─ services/    # API wrapper
│          └─ tests/       # Vitest component tests
├─ prompt_base/            # Gemini prompts used in the project
├─ system_design/          # Architecture documentation
├─ render.yaml             # Render deployment configuration
└─ netlify.toml            # Netlify custom headers (COOP fix)
```

## Deployment
- **Backend:** Deployed on Render via `render.yaml` (Python 3.12, Uvicorn). Firebase service‑account key is stored as a secret file.
- **Frontend:** Deployed on Netlify. SPA routing handled by `_redirects`; custom header `Cross-Origin-Opener-Policy: same-origin-allow-popups` enables Google Sign‑In pop‑ups.

## Social & Contact
- **Live Platform:** https://neic-project.netlify.app/
- **LinkedIn Post:** https://www.linkedin.com/posts/shanmugaraj-r-644782290_google-promptwar-ai-activity-7302213793616683009-qj_l
- **Technical Blog:** *(placeholder – add your blog URL)*
- **Instagram Showcase:** *(placeholder – add Instagram URL)*

### Developer
**Shanmugaraj R**
- LinkedIn: https://www.linkedin.com/in/shanmugaraj-r-644782290/
- GitHub: https://github.com/Shanmuga-Raj27

> **Note:** This project is for educational purposes only and was fully built using **Google Antigravity AI‑assisted coding**.
