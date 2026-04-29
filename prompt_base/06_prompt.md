# Role and Objective
You are an expert Python Full Stack developer. I am building an educational CLI-based AI chatbot focusing on the Indian election process. 

# Critical Instruction: Directory Structure
**Do NOT create a new root folder or a rigid new directory structure.**
1. First, analyze my current working directory and existing folder structure.
2. Integrate the requested backend files (FastAPI app, database, routing, tests) logically into the existing structure you see. 
3. (`testing` folder) located inside the app folder, create all testing files their.

# Tech Stack
*   **Framework:** Fast API
*   **Database:** SQLite (for storing conversation memory/history)
*   **AI Provider:** Google Gemini API (using the free tier from Google AI Studio)

# Required Files & Implementation

## 1. Environment & Dependencies
*   Create or update a `.env` file with placeholders for `GEMINI_API_KEY` and `DATABASE_URL` (default to a local sqlite db file). Keep APIs and Database secrets strictly in this `.env` file.
*   Create or update `requirements.txt` with: `fastapi`, `uvicorn`, `sqlite`, `pydantic`, `google-generativeai`, `python-dotenv`, `pytest`, `httpx`.

## 2. Database & Memory Setup
*   Set up a SQLAlchemy SQLite connection.
*   Create a schema/model to store `session_id`, `user_message`, `ai_response`, and `timestamp`. This will serve as the chatbot's memory.

## 3. AI Integration & Safety Rules (Core Logic)
*   Integrate the `google-generativeai` SDK.
*   Write logic to fetch chat history based on `session_id` so the AI retains context.
*   **CRITICAL AI SAFETY RULES:** You must inject the following system instructions directly into the Gemini model configuration:
    > "You are an educational AI assistant specializing in the Indian electoral process. Your goal is to educate citizens. 
    > STRICT RULES:
    > - Do not generate fake election rules.
    > - Avoid political opinions.
    > - Avoid supporting parties or candidates.
    > - Give strictly neutral, educational answers.
    > - For legal/official matters, refer users to official ECI (Election Commission of India) resources."

## 4. FastAPI Endpoints
*   `POST /chat`: Accepts `session_id` and `message`. Calls Gemini with history, saves the new interaction to SQLite, and returns the response. Maintain scalability so I can easily connect a frontend to this later.
*   `GET /history/{session_id}`: Retrieves the conversation history for a specific session.

## 5. CLI Interface
*   Create a script (e.g., `run.py` or similar) that acts as the CLI frontend for testing the API.
*   It should generate a `session_id`, use a `while True` loop to take `User:` terminal input, hit the local `/chat` API, and print the `AI:` response.

## 6. Testing
*   Create testing files for the backend in a testing folder (integrate this where it makes sense in the current structure).
*   Include Pytest functions to test the DB connection, the `/chat` endpoint (mock the Gemini API to save quota), and the `/history` endpoint.

Please analyze the current structure now and generate the code file by file.

## 7. Scalability
* Maintain scalability for future React frontend connection. improve Code Quality – structure, readability, maintainability
Security – safe and responsible implementation
Efficiency – optimal use of resources
Testing – validation of functionality
Accessibility – inclusive and usable design