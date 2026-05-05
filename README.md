# NEIC: National Election Information Companion

**Live Link:** [🔗 neic-project.web.app](https://neic-project.web.app/)

> [!NOTE]  
> **A Google Virtual PromptWar Innovation:** This project is strictly for educational and civic empowerment purposes, engineered entirely through **Google Antigravity AI-assisted coding**, advanced prompt engineering, and state-of-the-art LLM optimization techniques.

---

## 🚀 Vision & Overview

The **National Election Information Companion (NEIC)** is a next-generation, AI-driven civic technology platform designed to democratize electoral knowledge for Indian citizens. By bridging the information gap through advanced Natural Language Processing (NLP) and context-aware interactions, NEIC demystifies the election process, the mechanics of Electronic Voting Machines (EVMs), and fundamental democratic rights.

At its core operates **NEA-AI (National Election Assistant AI)**—a highly optimized, hallucination-resistant, non-partisan AI agent. Powered by sophisticated prompt architectures, NEA-AI delivers accurate, multi-lingual guidance, transforming complex civic data into accessible, interactive conversations.

---

## ✨ Key Features

*   **🎙️ Voice-Activated Interface**: Integrated Web Speech API for hands-free civic information retrieval.
*   **🌐 Tri-Lingual Support**: Native support for **English, Hindi, and Tamil** with semantic context preservation.
*   **⚡ Instant Semantic Cache**: Powered by **Upstash Redis**, providing near-zero latency for repeat queries.
*   **📊 Interactive EVM Guide**: A dedicated visual and textual guide to demystify the voting process.
*   **🛡️ Multi-Model Resilience**: Intelligent fallback stack between Gemini 1.5 Pro, Flash, and 2.0 models.
*   **🔒 Hardened Security**: Firebase Authentication paired with manual FastAPI CORS pre-flight handlers.

---

## 🧠 Advanced NLP Capabilities

This platform goes beyond simple chat by implementing professional-grade Natural Language Processing:

*   **Vector Embeddings**: Every query is converted into a high-dimensional vector using `text-embedding-004`, allowing the system to understand *intent* over keywords.
*   **Semantic Matching**: Utilizes Cosine Similarity (threshold: 92%) to match user queries against a live Redis vector database.
*   **Contextual Thinning**: Automatic chat history summarization to prevent "Prompt Bloat" and maintain long-term reasoning accuracy.
*   **Safety Guardrails**: Real-time response filtering with custom "Heartbeat" stream handling to prevent silent AI failures.

---

## 🏗️ Technical Stack

### Artificial Intelligence
![Google Gemini](https://img.shields.io/badge/Google_Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white) ![Redis](https://img.shields.io/badge/Upstash_Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
* **Core Model:** Google Generative AI (Gemini 2.5 Flash)
* **Semantic Engine**: Google Text-Embeddings-004

### Frontend (Client)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![Framer](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
* **Hosting**: Firebase Hosting (Global Edge Network)

### Backend (Server)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![Firestore](https://img.shields.io/badge/Cloud_Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
* **Infrastructure**: Google Cloud Run (Dockerized Serverless Compute)

---

## 📁 System Architecture

```text
Election Assistant/
├── app/
│   ├── backend/            # FastAPI Python Backend
│   │   ├── prompts/        # Decoupled Prompt Manager (Hallucination Mitigation)
│   │   ├── tests/          # Production Verification Suite (Redis, Firestore, Auth)
│   │   ├── ai_service.py   # Vector Search & Multi-Model Resilience Layer
│   │   ├── main.py         # SSE Streaming & Security Middleware
│   │   └── Dockerfile      # Containerization for Cloud Run
│   └── frontend/           # React Web Application
│       ├── src/
│       │   ├── components/ # Atomic UI components (Chat, Sidebar, EVM)
│       │   ├── pages/      # Dynamic Views (Home, Chat, Login)
│       │   └── services/   # SSE Stream Consumer & API Layer
├── prompt_base/            # Engineered Gemini Prompt Repository
└── firebase.json           # Global Hosting Config
```

---

## 💼 Social & Contact
- **LinkedIn Post:** [🔗 View on LinkedIn](https://www.linkedin.com/posts/shanmugaraj27_buildwithai-promptwarsvirtual-ai-activity-7456341060399570944-2pgt)
- **Developer:** **Shanmugaraj R**
- [LinkedIn Profile](https://www.linkedin.com/in/shanmugaraj27) | [GitHub Profile](https://github.com/Shanmuga-Raj27)

---
> [!IMPORTANT]
> This project was developed as part of the **Google Virtual PromptWar** using **Antigravity AI-assisted coding**.
