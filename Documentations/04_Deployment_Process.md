# Deployment Process

## 🌍 Infrastructure Overview
*   **Hosting Architecture**: Render Web Services (FastAPI Backend) & Netlify (React Frontend).
*   **Database & Cache**: Google Cloud Firestore & Upstash Redis (both using their respective Free Tier configurations).
*   **Authentication**: Firebase Authentication.

---

## 🏗️ Build & Deployment Pipeline

### Phase 1: Backend (Render)
The backend is compiled and deployed via Render Web Services using Docker.

1.  **Preparation**:
    *   No need to commit `serviceAccountKey.json` (it is gitignored).
    *   Ensure all code modifications are pushed to GitHub.
2.  **Deployment Steps**:
    *   Log in to **Render.com** and create a new **Web Service**.
    *   Connect your GitHub repository: `Shanmuga-Raj27/Election_process`.
    *   Configure settings:
        *   **Name**: `election-backend`
        *   **Root Directory**: `app/backend`
        *   **Runtime**: `Docker`
        *   **Instance Type**: `Free`
    *   Add the following environment variables:
        *   `GEMINI_API_KEY`: *(Your Google AI Studio API Key)*
        *   `REDIS_URL`: *(Your Upstash Redis endpoint URL)*
        *   `FIREBASE_SERVICE_ACCOUNT_JSON`: *(Paste the entire JSON string contents of your local `serviceAccountKey.json`)*
3.  **Result**: Render builds the Docker image and provides a public endpoint like `https://election-backend.onrender.com`.

---

### Phase 2: Frontend (Netlify)
The frontend is compiled into static assets and hosted via Netlify.

1.  **Config**: Update `app/frontend/.env` to point `VITE_API_URL` to your new Render endpoint:
    ```env
    VITE_API_URL=https://election-backend.onrender.com
    ```
2.  **Deployment Steps**:
    *   Log in to **Netlify.com** and select **Add New Site > Import an existing project**.
    *   Connect your GitHub repository.
    *   Configure settings:
        *   **Branch**: `main`
        *   **Base directory**: `app/frontend`
        *   **Build command**: `npm run build`
        *   **Publish directory**: `app/frontend/dist`
    *   Add environment variables in Netlify matching `app/frontend/.env` (e.g. Firebase config details).
3.  **Result**: Netlify hosts the static frontend at `https://neic-project.netlify.app`.

---

### Phase 3: Post-Deployment Verification
1.  **CORS Verification**: Verify that the Netlify origin (`https://neic-project.netlify.app`) is allowed in the backend CORS setup inside `main.py`.
2.  **Warmup & Startup Check**: Visit `https://election-backend.onrender.com/` (should return online status json).
3.  **Auth Cycle**: Perform a full Logout/Login on the production site to refresh the Firebase Identity tokens.
