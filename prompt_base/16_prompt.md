# Role and Objective
You are a Full-Stack Security Engineer. Your objective is to resolve the database history persistence issues, implement secure Firebase Authentication, and fix structural bugs identified in the current codebase.

# Phase 1: Database & SQL Fixes (CRITICAL)
1. **Fix SQL Syntax Error**: In `app/backend/main.py`, the `get_sessions` endpoint is currently crashing with `no such function: desc`. Correct the SQLAlchemy query to use the proper `desc` ordering on the `ChatMessage.timestamp` label.
2. **Schema Migration**: Update `app/backend/database.py` to include a `user_id` column in the `ChatMessage` model. Ensure all saved messages are associated with a specific user.
3. **Model ID Correction**: In `app/backend/ai_service.py`, update the `model_id` from `gemini-2.5-flash` (typo) to `gemini-2.0-flash`.

# Phase 2: Authentication & Authorization (Security)
1. **Token Verification Dependency**: 
   - Create a reusable dependency in `main.py` that extracts the Bearer token from the `Authorization` header.
   - Use `firebase_admin.auth.verify_id_token` to validate the user and retrieve their `uid`.
2. **Secure Endpoints**: Apply this dependency to `/chat`, `/chat/stream`, `/sessions`, and `/history`.
3. **User-Specific Isolation**: Update all backend queries to filter by the verified `user_id`. Users must only be able to view their own conversation history.

# Phase 3: Frontend-Backend Connection
1. **Environment Variables**: Update `app/frontend/src/services/api.js` to remove the hardcoded `127.0.0.1` URL and use `import.meta.env.VITE_API_URL` instead.
2. **Authorization Headers**: 
   - Update all `fetch` calls in `api.js` to include the user's Firebase ID token in the headers.
   - Example: `headers: { 'Authorization': `Bearer ${token}` }`.
3. **CORS Hardening**: In `main.py`, replace `allow_origins=["*"]` with a specific production origin (or an environment variable) to prevent unauthorized cross-origin requests.

# Phase 4: Quality Assurance
- Ensure that the "Chat History" sidebar correctly displays user-specific titles.
- Verify that messages are saved to the SQLite database with the correct `user_id` after every interaction.
- Confirm that the UI handles "Unauthorized" (401) errors gracefully by redirecting to login if the session expires.
