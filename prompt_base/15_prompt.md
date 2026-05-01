# Role and Objective
You are a Senior Frontend Engineer and UI Specialist. Your task is to modernize the Chatbot's Sidebar History UI to mirror the behavior of Gemini AI, focusing on user-centric conversation titles instead of technical session IDs.

# Phase 1: Dynamic Conversation Titles
1. **Logic Refinement**: 
   - Stop displaying raw session IDs like "History 1789035527".
   - Replace IDs with the **User's first query** or a **descriptive topic title** (e.g., "Voting Registration Help").
   - If the session is empty, use "New Conversation" as the default display text.
2. **Real-time Updates**: 
   - Ensure the sidebar title updates immediately after the user sends their first message in a new session.

# Phase 2: Sidebar UI Modernization (Gemini Style)
1. **Conversation List Layout**:
   - Style history items as clean, rounded list items with generous padding and clear typography.
   - Use a subtle hover effect (light saffron or navy tint) to indicate interactivity.
   - Highlight the "Active Session" using a high-contrast border or a soft background fill from the homepage palette.
2. **Text Truncation**:
   - Long question titles must truncate gracefully with an ellipsis (`...`) to prevent layout breaking, especially when the sidebar is minimized or on mobile viewports.
3. **Date Grouping**:
   - If timestamps are available, group history into "Today", "Yesterday", and "Previous 7 days" to help users find past interactions easily.

# Phase 3: Mobile Optimization & QA
1. **Sidebar Size**: Maintain the reduced sidebar footprint to maximize the chat workspace while ensuring titles remain legible.
2. **Interactive States**: Ensure that clicking a conversation title correctly loads the history and provides visual feedback that the session has been switched.
