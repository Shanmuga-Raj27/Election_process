# Role and Objective
You are an Expert React Full Stack Developer and Security Architect. Your objective is to implement a robust, production-ready authentication system and protected routing architecture for my "National Election Information Companion" project. 

The application uses a hybrid access model: a public educational platform with protected interactive features.

# Architectural Overview
*   **Public Access (No Login Required):** Homepage, Election Process sections, FAQ, Awareness content, Timeline, and General educational pages.
*   **Protected Access (Login Required):** AI Assistant (`/chatbot`), How to Vote Using EVM (`/how-to-vote-evm`).
*   **Authentication Provider:** Firebase Auth (Email/Password & Google Sign-In).
*   **State Management:** React Context API (`AuthContext`).

# Phase 1: Firebase Setup & Context
1.  **Dependencies:** Install `firebase` and `react-router-dom` (if not already present).
2.  **Environment Variables:** Configure a `.env` file (using `VITE_` prefix assuming Vite is used) for Firebase keys (`VITE_FIREBASE_API_KEY`, etc.). Ensure `.env` is in `.gitignore`.
3.  **Firebase Config (`src/firebase/firebase.js`):** Initialize the Firebase app and export the `auth` instance.
4.  **Auth Context (`src/context/AuthContext.jsx`):** Create a global context that tracks the user's authentication state using Firebase's `onAuthStateChanged()`. It must expose:
    *   `currentUser` object (including displayName and email).
    *   `login`, `register`, `logout`, and `googleSignIn` functions.

# Phase 2: Protected Routing Logic
1.  **Protected Route Component (`src/routes/ProtectedRoute.jsx`):** 
    *   Create a wrapper component that checks the `currentUser` from `AuthContext`.
    *   If the user is NOT logged in, redirect them to the homepage (or trigger the login modal) while saving their `intended destination` in state/history.
    *   If they are logged in, render the `children`.
    *   Apply this wrapper to the `/chatbot` and `/how-to-vote-evm` routes in `App.jsx`.

# Phase 3: Navbar Authentication State & UX
1.  **Dynamic Navbar:** Update the main navigation component.
    *   *Before Login:* Show "Login" and "Register" buttons in the top right.
    *   *After Login:* Replace buttons with a Profile Icon, the user's name (e.g., "Welcome, [Name]"), and a "Logout" button.
2.  **Logout Logic:** The logout function should clear the Firebase session, instantly update the Navbar state, and redirect the user back to the public homepage.

# Phase 4: Authentication UI Implementation
Implement the Login/Register functionality separate `/login` page.

1.  **Modal UI Design:**
    *   Use the established design system: refer from homepage.
    *   Include standard email/password fields with form validation.
2.  **Redirect & State Handling (Crucial UX):** 
    *   **Scenario:** If a user clicks "Ask AI Assistant" on the homepage while logged out.
    *   **Action:** Trigger the Login Modal. Display a message: *"Please login to continue using the AI Assistant."*
    *   **Result:** Upon successful login, automatically redirect them to they requested page.
# Phase 5: Write Fast API code for firebase login/register connection
* write backend Fast API code if required for firebase login/register connection and logical operation. 
# Phase 6: Code Quality & Security Standards
*   **Structure:** Adhere to the following structure:
    ```text
    src/
     ├── components/
     ├── pages/
     ├── context/
     ├── firebase/
     ├── routes/
    ```
*   **Security:** Never hardcode secrets. Validate all forms on the frontend before hitting Firebase. 
*   **Database (Firestore):** Do not implement Firestore Database logic yet. Focus strictly on Authentication, Authorization, and Protected Routing for this phase.

Please review the codebase and generate the necessary files and updates step-by-step.