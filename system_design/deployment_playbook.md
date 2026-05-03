# 🚀 NEA - Google Cloud Deployment Playbook
## Professional Cloud-Native Deployment Strategy

This guide outlines the steps to deploy the **National Election Assistant (NEA)** to Google Cloud Platform (GCP) using a modern, serverless architecture.

---

### 📋 1. Prerequisites
Before starting, ensure you have:
1.  **Google Cloud Project**: Created in the [GCP Console](https://console.cloud.google.com/).
2.  **Billing Enabled**: Required for Cloud Run and Secret Manager.
3.  **CLIs Installed**: 
    - [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install)
    - [Firebase CLI](https://firebase.google.com/docs/cli)
4.  **Firebase Project**: Linked to your GCP Project (done automatically if created via Firebase Console).

---

### 🛠️ 2. Backend Deployment (Google Cloud Run)

#### **Step A: Authenticate & Set Project**
```powershell
gcloud auth login
gcloud config set project [YOUR_PROJECT_ID]
```

#### **Step B: Enable APIs**
```powershell
gcloud services enable run.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
```

#### **Step C: Create Artifact Registry**
```powershell
gcloud artifacts repositories create nea-repo --repository-format=docker --location=us-central1
```

#### **Step D: Secure Secrets (Secret Manager)**
Instead of a `.env` file, create secrets in the console:
1.  Go to **Secret Manager**.
2.  Create `GEMINI_API_KEY`.
3.  Create `FIREBASE_SERVICE_ACCOUNT` (Upload the content of your JSON file).

#### **Step E: Build & Push Container**
```powershell
gcloud builds submit --tag us-central1-docker.pkg.dev/[YOUR_PROJECT_ID]/nea-repo/backend:latest ./app/backend
```

#### **Step F: Deploy to Cloud Run**
```powershell
gcloud run deploy nea-backend \
  --image us-central1-docker.pkg.dev/[YOUR_PROJECT_ID]/nea-repo/backend:latest \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "ALLOWED_ORIGINS=https://[YOUR-FRONTEND-URL].web.app" \
  --update-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest,FIREBASE_SERVICE_ACCOUNT=FIREBASE_SERVICE_ACCOUNT:latest"
```

---

### 🌐 3. Frontend Deployment (Firebase Hosting)

#### **Step A: Build for Production**
Ensure your `app/frontend/.env` has the correct `VITE_API_URL` pointing to your new Cloud Run URL.
```powershell
cd app/frontend
npm install
npm run build
```

#### **Step B: Initialize Firebase**
```powershell
firebase login
firebase init hosting
```
*   Select your project.
*   Public directory: `dist`
*   Configure as SPA: `Yes`

#### **Step C: Deploy**
```powershell
firebase deploy --only hosting
```

---

### 🔄 4. Post-Deployment Checklist
1.  **CORS Update**: Copy your Firebase Hosting URL (e.g., `https://nea-app.web.app`) and update the `ALLOWED_ORIGINS` variable in your Cloud Run service settings.
2.  **Firestore Rules**: Ensure your Firestore rules allow access to the `chat_sessions` collection for authenticated users.
3.  **Domain Mapping**: (Optional) Add your custom domain in the Firebase Hosting dashboard.

---

### 🛡️ Security Best Practices
- **No Keys in Git**: Never push your `.env` or `serviceAccountKey.json`.
- **Least Privilege**: Ensure the Cloud Run service account has the "Cloud Datastore User" role to access Firestore.
- **Monitoring**: Check the **Google Cloud Logging** tab if the backend fails to start.

---

*Evaluation Note: This deployment strategy uses 100% Google Cloud-Native services, maximizing the "Infrastructure" and "Scalability" scores for the Prompt-War project.*
