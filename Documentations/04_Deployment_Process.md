# Deployment Process

## 🌍 Infrastructure Overview
*   **Production Region**: `us-central1` (Google Cloud Run) & `asia-south1` (Firestore).
*   **Security Layer**: HTTPS only with automated TLS certificates via Google Trust Services.

## 🏗️ Build & Deployment Pipeline

### Phase 1: Backend (Cloud Run)
The backend is containerized and deployed to Google Cloud Run for elastic scaling.

1.  **Preparation**: Ensure `serviceAccountKey.json` is present in `app/backend`.
2.  **Command**:
    ```cmd
    gcloud run deploy nea-backend \
      --source . \
      --region us-central1 \
      --allow-unauthenticated \
      --set-env-vars="GEMINI_API_KEY=YOUR_KEY,REDIS_URL=your_rediss_url"
    ```
3.  **Result**: Provides a stable endpoint like `https://your_backend.us-central1.run.app`.

### Phase 2: Frontend (Firebase Hosting)
The frontend is compiled into static assets and served via Google's global CDN.

1.  **Config**: Update `app/frontend/.env` to point `VITE_API_URL` to the Cloud Run endpoint.
2.  **Build**:
    ```cmd
    npm run build
    ```
3.  **Deploy**:
    ```cmd
    firebase deploy --only hosting
    ```

### Phase 3: Post-Deployment Verification
1.  **CORS Check**: Verify that `https://neic-project.web.app` can talk to the Cloud Run endpoint.
2.  **Index Verification**: Ensure the Firestore Composite Index is `Enabled`.
3.  **Auth Cycle**: Perform a full Logout/Login on the production site to refresh the Firebase Identity tokens.
