# NEIC: National Election Information Companion

**Live Link:**[Live Deployment](https://neic-project.netlify.app/)

> [!NOTE]  
> **A Google Virtual PromptWar Innovation:** This project is strictly for educational and civic empowerment purposes, engineered entirely through **Google Antigravity AI-assisted coding**, advanced prompt engineering, and state-of-the-art LLM optimization techniques.

## 🚀 Vision & Overview

The **National Election Information Companion (NEIC)** is a next-generation, AI-driven civic technology platform designed to democratize electoral knowledge for Indian citizens. By bridging the information gap through advanced Natural Language Processing (NLP) and context-aware interactions, NEIC demystifies the election process, the mechanics of Electronic Voting Machines (EVMs), and fundamental democratic rights.

At its core operates **NEA-AI (National Election Assistant AI)**—a highly optimized, hallucination-resistant, non-partisan AI agent. Powered by sophisticated prompt architectures, NEA-AI delivers accurate, multi-lingual (English, Hindi, Tamil) guidance, transforming complex civic data into accessible, interactive conversations.

---

## 🧠 Cutting-Edge Tech Stack

Built with a robust, highly scalable full-stack architecture focusing on seamless AI integration, rapid asynchronous processing, and an immersive user experience.

### Artificial Intelligence & Prompt Engineering
![Google Gemini](https://img.shields.io/badge/Google_Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white) 
* **Core Model:** Google Generative AI (Gemini 2.5 Flash)
* **Optimization:** Context-bound prompt isolation, multi-lingual token optimization, and zero-shot civic data retrieval.

### Frontend Interface (Client-Side)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Framer](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
* **Architecture:** React (Vite) Single Page Application (SPA)
* **Design System:** Tailwind CSS with fluid, hardware-accelerated Framer Motion animations
* **Localization:** `i18next` for seamless dynamic language switching
* **Authentication:** Firebase Auth

### Backend Services (Server-Side)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
* **Framework:** FastAPI for high-performance, asynchronous RESTful API endpoints
* **Data Layer:** SQLAlchemy ORM with SQLite
* **Security & Auth Validation:** Firebase Admin SDK

### Cloud Infrastructure & Deployment
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
* **Frontend Hosting:** Netlify (with advanced SPA routing and custom Cross-Origin Opener Policy headers)
* **Backend Hosting:** Render (Infrastructure as Code via `render.yaml` Blueprint)

---

## 🛡️ AI Safety, Security & Ethics Guardrails

To ensure integrity and reliability, NEIC is fortified with strict ethical constraints and security protocols:

* **Non-Partisan System Prompts:** NEA-AI utilizes constrained generation techniques to actively neutralize political bias, decline candidate endorsements, and remain strictly educational.
* **Data Sovereignty:** Zero user chat data is retained for external LLM training. Authentication states are securely managed via Firebase.
* **Network Security:** End-to-end encryption with custom Netlify COOP/COEP headers to mitigate cross-site vulnerabilities.

---

## 📁 System Architecture

```text
Election Assistant/
├── app/
│   ├── backend/
│   │   ├── ai_service.py       # Core Gemini integration & prompt guardrails
│   │   ├── cli_chatbot.py      # Authenticated terminal interface
│   │   ├── database.py         # SQLAlchemy data models
│   │   ├── main.py             # Asynchronous FastAPI routing
│   │   └── tests/              # Pytest verification suite
│   └── frontend/
│       ├── public/             # Static assets & Netlify _redirects
│       └── src/
│           ├── components/     # Modular React UI Components
│           ├── context/        # Global Auth & State Management
│           ├── pages/          # Home, Interactive Chat, EVM Guide
│           ├── services/       # Backend API communication layer
│           └── assets/locales/ # i18n Translation dictionaries (EN, HI, TA)
├── prompt_base/                # Highly optimized, role-playing Gemini Prompts
├── system_design/              # Technical documentation & flowcharts
├── render.yaml                 # Render infrastructure deployment script
└── netlify.toml                # Netlify security and routing configurations
```

## 💼 Social & Contact
- **Live Platform:** *(https://neic-project.netlify.app/)*
- **LinkedIn Post:** 
- **Technical Blog:** *()*
- **Instagram Showcase:** *()*

### 💻 Developer
**Shanmugaraj R**
- LinkedIn: https://www.linkedin.com
- GitHub: https://github.com/Shanmuga-Raj27

> **Note:** This project is for educational purposes only and was fully built using **Google Antigravity AI‑assisted coding**.

