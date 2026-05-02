# 🚀 High-Efficiency Optimization Prompt: SSE & Semantic Caching

This prompt is designed for the **Antigravity AI Assistant** to implement advanced real-time streaming and high-performance caching layers.

---

### **Objective**
Elevate the NEIC platform's efficiency and responsiveness by implementing **Server-Sent Events (SSE)** for AI streaming and **Redis Semantic Caching** for latency reduction. The architecture must remain decoupled to ensure seamless transition to Firebase Firestore in the future.

---

### **Task 1: Backend SSE Implementation (Latency Reduction)**
- **Target**: `app/backend/main.py` and `app/backend/ai_service.py`
- **Action**:
    1.  Convert the `/chat` endpoint to use `StreamingResponse` (media_type="text/event-stream").
    2.  Update `AIService` to utilize `chat.send_message_stream` from the Google GenAI SDK.
    3.  Implement a generator function that yields tokens in real-time.
- **Optimization Keyword**: *Asynchronous Stream Orchestration*

### **Task 2: Redis Semantic Caching (Resource Efficiency)**
- **Target**: `app/backend/ai_service.py`
- **Action**:
    1.  Integrate a Redis-based caching layer.
    2.  Before calling Gemini, generate a hash of the user query.
    3.  Check Redis for the hash; if hit, return the cached stream/text instantly.
    4.  If miss, execute AI inference and populate the cache with a TTL (Time-To-Live).
- **Optimization Keyword**: *Stateful Response Persistence*

### **Task 3: Frontend Real-time UI (User Experience)**
- **Target**: `app/frontend/src/services/api.js` and `app/frontend/src/pages/Chat.jsx`
- **Action**:
    1.  Refactor API calls to handle `ReadableStream` instead of JSON promises.
    2.  Implement a state-buffer that appends incoming chunks to the active chat message in real-time.
    3.  Ensure the "Typing Indicator" is handled gracefully during the stream.
- **Optimization Keyword**: *Reactive Stream Consumption*

### **Task 4: Scalable Architecture Hardening (Future-Proofing)**
- **Action**:
    1.  Ensure all database operations are abstracted behind a `get_db` dependency or a repository pattern.
    2.  This ensures that when we switch from SQLAlchemy/SQLite to Firebase Firestore, only the service layer changes, leaving the SSE/Caching logic intact.
- **Optimization Keyword**: *Service-Layer Decoupling*

---

### **Execution Guidelines**
- **Security**: Maintain JWT validation for every stream request.
- **Efficiency**: Close Redis connections and stream iterators properly to prevent memory leaks.
- **Stability**: Implement robust error handling for "Stream Interruptions" or "Cache Misses."
