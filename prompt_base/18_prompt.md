# 🚀 Project Optimization & Feature Enhancement Prompt

This prompt is designed for the **Antigravity AI Assistant** to execute a suite of optimizations to boost the project's Efficiency, Code Quality, and Feature richness.

---

### **Objective**
Implement the following four enhancements to the "National Election Information Companion" (NEIC) project:
1.  **Efficiency**: Database Indexing & Image Optimization.
2.  **Special Feature**: Google Web Speech API Integration.
3.  **Code Quality**: Modularization via a Prompt Manager.

---

### **Task 1: Database Indexing (Efficiency)**
- **Target File**: `app/backend/database.py`
- **Action**: Add `index=True` to the `user_id` and `session_id` columns in the `ChatMessage` model.
- **Reasoning**: Speeds up chat history retrieval for the FastAPI backend.

### **Task 2: Image Optimization (Efficiency)**
- **Target Files**: `app/frontend/src/pages/EVMGuide.jsx` and `app/frontend/src/components/*.jsx`
- **Action**: Update all image imports to use `.webp` instead of `.jpg` or `.png`. 
- **Instruction**: (User must provide the `.webp` files in `src/assets/images/` first).

### **Task 3: Web Speech API Integration (Special Feature)**
- **Target File**: `app/frontend/src/components/chat/ChatArea.jsx`
- **Action**:
    1.  Add a `Lucide Mic` icon button next to the Send button.
    2.  Implement `window.webkitSpeechRecognition` logic to capture user voice.
    3.  When the mic is active, transcribe the speech and populate the `input` state.
    4.  Ensure it supports "English" and "Hindi/Tamil" based on the current `i18n` language.

### **Task 4: Prompt Manager Modularization (Code Quality)**
- **Target Files**: `app/backend/ai_service.py` and create `app/backend/prompts/system_v1.txt`
- **Action**:
    1.  Extract the large "System Instruction" string from `ai_service.py`.
    2.  Save it into `app/backend/prompts/system_v1.txt`.
    3.  Update the `AIService` class to read the content of this file during initialization.
- **Reasoning**: Decouples AI behavior from application logic.

---

### **Execution Guidelines**
- **Non-Destructive**: Do not break existing authentication or state management.
- **Simple & Clean**: Use vanilla CSS/Tailwind for the mic button; keep the Speech API logic simple using browser-native capabilities.
- **Validation**: Ensure the backend still runs and the frontend builds without errors.
