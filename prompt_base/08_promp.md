# Role and Objective
You are an Expert Frontend Developer. My existing "NEA - AI" chatbot requires UI refinements, bug fixes in navigation, and an upgrade to how AI messages are rendered. 

Please analyze my current frontend codebase and apply the following updates step-by-step.

# Phase 1: Navigation & Bug Fixes
1.  **Homepage "Ask AI" Button:** 
    *   Locate the "Ask AI Assistant" button in the homepage header.
    *   Fix the routing/click event so it properly redirects the user to the Chatbot UI page.
2.  **Chatbot Page Navigation:**
    *   Update the header/navigation bar inside the Chatbot UI.
    *   Add a prominent "Homepage" (or "Back to Home") button/icon that correctly routes the user back to the main homepage.

# Phase 2: Chat Interface Layout (Gemini Style)
Refactor the main chat window's message display area to look like a modern messaging app.
1.  **User Messages (Right Side):**
    *   Align user message bubbles to the **right**.
    *   Apply a **light green** background color to the user's message card/bubble.
    *   Add appropriate padding, border-radius, and a subtle shadow for a clean look.
2.  **AI Messages (Left Side):**
    *   Align the NEA-AI message bubbles to the **left**.
    *   Use a neutral background color (like white or very light gray) with dark text for high readability.
    *   Ensure the layout scales nicely on both desktop and mobile screens.

# Phase 3: AI Reply Formatting (Markdown Rendering)
Currently, the AI's response looks like a terminal output because it is displaying raw Markdown (e.g., `**text**` or `* item`). The frontend must parse this into proper HTML.
1.  **Integrate a Markdown Parser:** 
    *   If using Vanilla JS/HTML, import a lightweight CDN like `marked.js` (e.g., `<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>`).
    *   If using React, implement a library like `react-markdown`.
2.  **Format the Output:**
    *   When the frontend receives the AI's text response, pass it through the Markdown parser before injecting it into the DOM.
    *   Ensure that `**bold text**` renders as proper bold (`<strong>` or `<b>`).
    *   Ensure that `*` bullet points render as proper HTML unordered lists (`<ul>` and `<li>`), completely removing the literal `*` symbols from the UI.
    *   Ensure line breaks are respected so paragraphs have proper spacing.

Please review the existing HTML/CSS/JS and provide the updated code to implement these changes safely.