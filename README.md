# 🗳️ NEIC - National Election Information Companion

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=netlify)](https://neic-project.netlify.app/)
[![Backend Status](https://img.shields.io/badge/Backend-Online-blue?style=for-the-badge&logo=render)](https://election-process-jxt3.onrender.com/)

## 🌟 Project Overview
**NEIC (National Election Information Companion)** is an advanced AI-powered educational platform designed to empower Indian citizens with accurate, non-partisan information about the democratic process. Developed for the **Google Prompt-War**, NEIC simplifies complex election procedures into an interactive, multi-lingual experience.

## 🎯 Purpose
To bridge the information gap in the Indian electoral process by providing:
- Real-time guidance on voter registration and booth procedures.
- Interactive AI assistance for election-related queries.
- Multi-language support (English, Hindi, Tamil) for inclusive accessibility.
- Step-by-step visual guides for EVM and VVPAT usage.

---

## 🛠️ Tech Stack

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
</p>

### Backend
<p align="left">
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" />
</p>

### AI Core
<p align="left">
  <img src="https://img.shields.io/badge/Google_Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" />
</p>

---

## 🏗️ Project Architecture

```mermaid
graph TD
    User((User)) -->|React Web App| Frontend[Frontend - Netlify]
    User -->|CLI Tool| CLI[CLI Chatbot]
    
    subgraph Google Cloud
        Frontend -->|Auth| Firebase[Firebase Auth]
    end
    
    subgraph Backend - Render
        Frontend -->|API Requests| FastAPI[FastAPI Server]
        CLI -->|API Requests| FastAPI
        FastAPI -->|JWT Verify| Firebase
        FastAPI -->|Query/Save| DB[(SQLite / SQLAlchemy)]
        FastAPI -->|inference| Gemini[Google Gemini 2.5 Flash]
    end
```

---

## 🚀 Deployment

### Backend (Render)
1. **Blueprint**: Uses `render.yaml` for automated deployment.
2. **Environment**: Configured for Python 3.12 with Uvicorn.
3. **Security**: Firebase Service Account keys managed via Render Secret Files.

### Frontend (Netlify)
1. **SPA Routing**: Configured with `_redirects` to handle React Router paths.
2. **Security**: Implements `Cross-Origin-Opener-Policy` for secure Firebase popups.
3. **CI/CD**: Auto-deploys from the `main` branch.

---

## 🔗 Links & Socials

- **Live Platform**: [neic-project.netlify.app](https://neic-project.netlify.app/)
- **LinkedIn Post**: [View Project Post](https://www.linkedin.com/posts/shanmugaraj-r-644782290_google-promptwar-ai-activity-7302213793616683009-qj_l?utm_source=share&utm_medium=member_desktop)
- **Technical Blog**: [Read on Hashnode/Medium](#)
- **Instagram Showcase**: [Watch Demo Reel](#)

## 👨‍💻 Developer
**Shanmugaraj R**
- **LinkedIn**: [Shanmugaraj R](https://www.linkedin.com/in/shanmugaraj-r-644782290/)
- **GitHub**: [Shanmuga-Raj27](https://github.com/Shanmuga-Raj27)

---

> [!NOTE]
> This project is only for educational purposes and was fully developed using **Google Antigravity AI-assisted coding**. It demonstrates the power of agentic AI in building complex, secure, and accessible public-interest software.

---
© 2026 National Election Information Companion
