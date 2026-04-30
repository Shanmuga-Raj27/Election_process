# Role and Objective
You are an Expert Full Stack Developer and UI/UX Specialist. Your objective is to build the frontend for "NEA - AI (National Election Assistant)", connecting it to my existing FastAPI backend. The UI should closely resemble the Gemini AI chatbot interface, featuring a sidebar for chat history and a main chat window. 

# Phase 1: Context & UI Analysis
Before writing any code, analyze my current working directory, existing frontend files (HTML/CSS/JS or framework components), and global stylesheets.
1. Extract the primary color palette (including the Saffron and Navy Blue themes used previously, and background/text colors).
2. Extract the typography and border-radius rules to ensure the new NEA - AI chatbot page feels perfectly integrated into the existing website.
3. **Do not hallucinate styles.** Base the UI strictly on my existing design system, but apply it to a Gemini-style layout.

# Phase 2: Frontend Chatbot UI Implementation (NEA - AI)
Create the frontend files required for the chatbot. Since I plan to migrate to/update React in the future, strictly separate the UI rendering logic from the API/state management logic.

**Layout Requirements (Gemini-style):**
*   **Sidebar (Left):** Collapsible. Displays previous chat sessions (History) fetched from the database. Include a "New Chat" button.
*   **Main Chat Area (Right):** Displays the active conversation. 
*   **Header:** Title reads "NEA - AI (National Election Assistant)".
*   **Input Area (Bottom):** Text input with a "Send" button. Must support hitting 'Enter' to send.

**Scalability & Architecture:**
*   Create a dedicated `api_service.js` (or equivalent) to handle all `fetch` calls to the FastAPI backend. Do not mix `fetch` calls directly inside UI components.
*   Use modular functions/components so they can be easily converted into React components later.

# Phase 3: Backend Integration & CORS
Ensure the FastAPI backend is fully prepared to handle the frontend requests.
1.  **CORS Setup:** Update `main.py` to include `CORSMiddleware` so the frontend can successfully communicate with the backend.
2.  **API Connections:** The frontend must seamlessly connect to:
    *   `POST /chat`: To send messages and receive NEA-AI's response.
    *   `GET /history/{session_id}`: To load past messages into the main chat window.
    *   `GET /sessions`: (Create this endpoint if missing) To populate the sidebar with a list of past chat sessions.

# Phase 4: Code Quality & Non-Functional Requirements
Ensure the code strictly adheres to the following standards:

*   **Security:** 
    *   Sanitize all user inputs on the frontend before rendering to prevent XSS (Cross-Site Scripting). Do not use `innerHTML` blindly; use `textContent` or proper sanitization libraries.
    *   Ensure the `.env` file structure is maintained and API keys are NEVER exposed to the frontend.
*   **Efficiency:** Implement a loading state (e.g., a typing indicator or spinner) in the UI while waiting for the FastAPI/Gemini response.
*   **Accessibility (a11y):**
    *   Use proper semantic HTML tags (`<aside>`, `<main>`, `<nav>`).
    *   Add `aria-labels` to buttons (especially icon-only buttons like the sidebar toggle or send button).
    *   Ensure the chat input maintains focus after a message is sent.

# Phase 5: Testing Implementation
Create comprehensive tests to validate the functionality.
1.  Navigate to the existing `testing` folder (or create it inside the backend `app` directory if it doesn't exist).
2.  Write/Update `test_chat.py` using `pytest` and `httpx` (TestClient) to cover:
    *   Successful message sending and database storage (`POST /chat`).
    *   History retrieval (`GET /history/{session_id}`).
    *   Error handling (e.g., missing API key, empty message payloads).
    *   *Note: Mock the Gemini API call in these tests to prevent consuming real API quota during automated testing.*

Please analyze my workspace now and output the necessary code updates step-by-step.