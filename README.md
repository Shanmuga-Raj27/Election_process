# 🗳️ NEIC - National Election Information Companion

**NEIC** (National Election Information Companion) is a modern, AI-powered educational platform designed to empower Indian citizens with accurate, non-partisan information about the democratic process.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://neic-project.netlify.app/)
[![Backend Status](https://img.shields.io/badge/Backend-Online-blue?style=for-the-badge)](https://election-process-jxt3.onrender.com/)

---

## 🎯 Project Mission
To simplify the complex Indian electoral process into a beginner-friendly, multi-lingual experience. From registration guides to interactive AI chat, NEIC is your digital companion for democracy.

## 🛠️ Technical Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: FastAPI (Python), SQLAlchemy, SQLite (Scalable to Firestore)
- **AI Core**: Google Gemini 2.5 Flash
- **Auth**: Firebase Authentication (Google & Email/Password)
- **Internationalization**: i18next (English, Hindi, Tamil)

## 🏗️ Project Architecture
```text
Election Assistant/
├── app/
│   ├── backend/            # FastAPI Python Backend
│   │   ├── core/           # Prompt templates & logic
│   │   ├── ai_service.py   # Gemini AI orchestration
│   │   ├── database.py     # SQLAlchemy models & Session
│   │   └── main.py         # API endpoints & Firebase Auth
│   └── frontend/           # React Web Application
│       ├── src/
│       │   ├── components/ # Atomic & Feature components
│       │   ├── pages/      # Route-level views
│       │   └── assets/     # Optimized .webp images & i18n
├── prompt_base/            # Engineered Gemini Prompts
├── render.yaml             # Infrastructure as Code (Backend)
└── netlify.toml            # Security & Header Config (Frontend)
```

## 🚀 Key Features
- **Conversational AI**: Multi-lingual assistant with 1-3-1 response formatting.
- **Voice Integration**: Hands-free interaction via Google Web Speech API.
- **EVM Guide**: Visual, step-by-step breakdown of the voting process.
- **High Efficiency**: WebP image optimization and database indexing for <1s load times.

## 👨‍💻 Developer
**Shanmugaraj R**
- [LinkedIn](https://www.linkedin.com/in/shanmugaraj-r-644782290/) | [GitHub](https://github.com/Shanmuga-Raj27)

---
> [!NOTE]
> This project is for educational purposes and was developed using **Google Antigravity AI-assisted coding**.
