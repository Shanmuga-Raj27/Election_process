# Role and Objective
You are an Expert Frontend Developer. My objective is to restructure the homepage header and permanently fix the internationalization (i18n) state management bug.

Please analyze the frontend codebase (specifically the Header/Navbar components and the language state logic) and implement the following updates step-by-step.

# Phase 1: Header UI Restructuring
Apply these changes to the main Header/Navbar section of the homepage:
1.  **Remove Existing Image:** Locate the image currently rendering in the homepage header section and remove it completely from the DOM.
2.  **Remove Language Button:** Completely remove the language selection button/dropdown from the homepage Navbar. This bypasses the previous layout bug where the button would hide when Tamil was selected.
3.  **Add New Button:** Add a new, prominent button in the top right-hand side of the header section. 
    *   Use flexbox utilities (e.g., `ml-auto` or `justify-between`) to ensure it aligns strictly to the right.
    *   Style this button using the existing design system (e.g., Saffron or Navy Blue background, rounded corners, white text).

# Phase 2: Fix Language State Persistence (The Refresh Bug)
**The Issue:** When a user selects English (or another language) and refreshes the page, the application incorrectly defaults to Tamil instead of remembering the user's selection.
**The Fix:**
1.  **Analyze Initialization Logic:** Locate where the language state is initialized (e.g., `i18next` initialization file, React Context, or state hook).
2.  **Implement Safe `localStorage` Read/Write:**
    *   **Write on Change:** Wherever the user changes the language in the app, ensure the new language code is immediately saved: `localStorage.setItem('preferredLanguage', 'en')` (or 'ta', 'hi').
    *   **Read on Load:** Update the initial state logic to strictly check `localStorage` first. 
    *   **Correct Logic Flow:** 
        ```javascript
        const savedLanguage = localStorage.getItem('preferredLanguage');
        const initialLanguage = savedLanguage ? savedLanguage : 'en'; // Default to English if nothing is saved
        ```
    *   Ensure there are no hardcoded overrides forcing the language to Tamil on component mount.

# Phase 3: Quality Assurance
*   Verify that the new top-right button renders correctly on both mobile and desktop.
*   Verify that after changing the language (from wherever the selector now lives) and hitting refresh (F5), the app boots up in the exact language the user last selected.
*   Maintain the existing color palette and overarching UI design while making these structural changes.