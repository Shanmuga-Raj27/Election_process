# Role and Objective
You are an Expert Frontend Developer and UI/UX Specialist. Your objective is to redesign the existing chatbot page UI to resemble the layout of the Gemini AI interface, while strictly utilizing the application's existing homepage design system and color palette. 

# Phase 1: Branding & Content Constraints (CRITICAL)
1.  **Chatbot Naming:** Update all references of the chatbot's name to strictly **NEA - AI** or **NEA (National Election Assistant)**. Update headers, placeholders, and AI introduction messages accordingly.
2.  **Strictly English Only:** The AI interface and any hardcoded starter messages must be exclusively in English. **Do not use "Namaste" or any other Hindi/regional words.** Ensure all default greetings are professional and in English (e.g., "Hello, I am NEA - AI...").

# Phase 2: UI Layout Restructuring (Gemini Style)
Refactor the main chat window's message display area to look like a modern conversational AI app (like Gemini).
1.  **User Messages (Right Side):**
    *   Align user message bubbles/cards to the **right**.
    *   Use the existing homepage color palette for styling (e.g., a very light Saffron or Green background from your theme).
    *   Apply appropriate padding, rounded corners, and a subtle shadow consistent with homepage cards.
2.  **AI Messages - NEA (Left Side):**
    *   Align the NEA - AI message bubbles/cards to the **left**.
    *   Use a clean, neutral background color (like white or very light gray) with Navy Blue text (from the homepage palette) for maximum readability.
    *   Include a small avatar or "NEA" icon next to the AI's messages if possible.
3.  **Input Area (Bottom):**
    *   Create a clean, fixed-bottom (or heavily anchored) text input area.
    *   Style the "Send" button using the Saffron or Navy Blue button styles from the homepage.

# Phase 3: Aesthetic Alignment with Homepage
*   **Do not introduce new colors.** Extract the exact Saffron, Navy Blue, and Green hex codes/variables used on the homepage.
*   Apply the homepage's border-radius rules (rounded corners) to all chat bubbles.
*   If the homepage uses a specific tricolor underline or accent border, apply a subtle version of it to the chat header or the input field's active state.

# Phase 4: Quality Assurance
*   Ensure the AI's markdown responses (bold text, bullet points) render correctly as HTML inside the new left-aligned cards.
*   Verify the chat layout remains perfectly usable and responsive on mobile devices (e.g., input area doesn't hide behind the mobile keyboard, message bubbles stack correctly without horizontal overflow).

Please review the existing frontend chatbot code and apply these updates step-by-step.