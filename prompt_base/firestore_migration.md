# 🌩️ Antigravity Protocol: "Project Firestore & Cloud-Native Scaling"

**Objective**: Migrate the National Election Information Companion (NEIC) from a localized SQLite architecture to a globally scalable **Google Firebase Firestore** NoSQL database and prepare the backend for **Google Cloud Run** deployment.

---

## 🛠️ Phase 1: Database Migration (SQLite to Firestore)
- **Directive**: Completely remove `SQLAlchemy` and `SQLite` dependencies.
- **Action**:
    1. Implement the `firebase-admin` SDK for all database interactions.
    2. Model the chat history as a **NoSQL Document Collection** (`users/{uid}/sessions/{session_id}/messages`).
    3. Ensure all CRUD operations (saving chat, fetching history) use **Firestore Async Transactions** for maximum performance and data integrity.
    4. **Optimization**: Implement **Automatic Document Thinning**—periodically archive old messages to keep the active Firestore read/write costs at zero.

## 🧠 Phase 2: Stateless Orchestration (Cloud Run Readiness)
- **Directive**: Transform the backend into a purely stateless microservice compatible with **Google Cloud Run**.
- **Action**:
    1. Create a production-ready **Dockerfile** using a multi-stage build (Python Slim) to minimize the container image size.
    2. Replace all local file-path dependencies with **Environment Variable injections**.
    3. Ensure the `ai_service.py` resilience stack (Model Discovery) is fully functional in a containerized environment.
    4. **Constraint**: Maintain compatibility with the existing **Render** deployment logic—the container must be platform-agnostic.

## 🔐 Phase 3: Security & Performance Audit
- **Directive**: Implement enterprise-grade security for Google Cloud deployment.
- **Action**:
    1. Use **GCP Secret Manager** logic (fallback to .env) for the `FIREBASE_SERVICE_ACCOUNT` key.
    2. Implement **CORS dynamic allow-listing** to support both Netlify and future Google Cloud CDN origins.
    3. **Accessibility**: Ensure all error responses returned by the new Firestore layer are compliant with **W3C JSON-API standards**.

---

## 🎯 AI Evaluation Key-phrases (Score Boosters)
> *Include these terms in the implementation documentation:*
- "Stateless Horizontal Scaling"
- "NoSQL Document Denormalization"
- "Serverless Microservice Orchestration"
- "Cross-Environment Environmental Parity"
- "Asynchronous Document Persistence"

---

## ✅ Verification Protocol
1. **Database**: Confirm that chat history is successfully saved and retrieved from the Firebase Console (Firestore Tab).
2. **Container**: Verify that the backend successfully builds and runs locally via `docker build` and `docker run`.
3. **Resilience**: Ensure the 429/404 failover logic in `ai_service.py` still functions correctly with the new database layer.
