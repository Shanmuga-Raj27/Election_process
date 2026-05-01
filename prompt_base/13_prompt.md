# Role and Objective
You are an Expert Frontend Developer and UI/UX Specialist. Your objective is to perform a global branding update across the codebase, make the entire frontend fully mobile-responsive, and overhaul the Chatbot page UI to seamlessly match the Homepage's design system.

Please analyze the full codebase and execute the following updates step-by-step.

# Phase 1: Global Branding & Name Replacement
Perform a project-wide search and replace to update the branding. 
1.  **Project Name:** Search for `Digital india election process` (case-insensitive, check for slight variations) and replace it with strictly `Nation Election Information Companion`.
2.  **App Name:** Search for `Election Edu` (and variations like `ElectionEdu`) and replace it with `NEIC`.
3.  **Locations:** Ensure these updates are applied across all HTML files, React components, navigation bars, footers, `<title>` tags, meta descriptions, and translation/i18n files.

# Phase 2: Mobile-Friendly UI Optimization (Sitewide)
Analyze all frontend components and ensure they render perfectly on mobile devices (down to 320px viewport width). 
**Constraint:** Do not change the existing color palette (Saffron, Navy Blue, Green) or the core design identity.
1.  **Fluid Typography:** Convert fixed pixel (`px`) font sizes to relative units (`rem`, `em`, or viewport-based `clamp()`) so text scales correctly on small screens without overflowing.
2.  **Layout Stacking:** Ensure that multi-column layouts (grids and flex rows) properly collapse into single-column layouts on mobile viewports (e.g., `@media (max-width: 768px)`).
3.  **Spacing & Touch Targets:** 
    *   Reduce excessive padding and margins on mobile containers to maximize screen real estate.
    *   Ensure all interactive elements (buttons, links, navbar toggles) have a minimum touch target size of 44x44px.
4.  **Media & Images:** Ensure all images, illustrations, and iframes (like the YouTube video) have `max-width: 100%` and `height: auto` to prevent horizontal scrolling.

# Phase 3: Chatbot Page UI Redesign
The current chatbot page UI feels disconnected from the rest of the application. Redesign it to strictly follow the Homepage design system.
1.  **Aesthetic Alignment:** Apply the homepage's design language to the chatbot. Use Saffron for primary buttons/accents, Navy Blue for headers, and Green for secondary accents. Utilize rounded cards, soft shadows, and the tricolor underline motif where appropriate.
2.  **Chat Interface Structure:**
    *   **Header:** Clean header displaying the new app name ("NEIC") and a prominent "Back to Home" button.
    *   **Chat Container:** A scrollable central area. User messages should be aligned right (light green/saffron background), and AI messages aligned left (white/light gray background with dark text).
    *   **Input Area:** A fixed-bottom or heavily anchored input area with a text box and a clear Send button. Ensure this area does not get hidden behind mobile keyboards.
3.  **Sidebar (If applicable):** If there is a chat history sidebar, make sure it is a collapsible drawer/hamburger menu on mobile rather than taking up permanent screen width.

# Phase 4: Quality Assurance
*   Validate that there is no horizontal scrolling on any page on mobile viewports.
*   Check that the global name replacements didn't break any internal routing or API calls.
*   Ensure the chatbot text input maintains focus appropriately and the layout doesn't break when a long AI response (with markdown) is generated.

Please review the codebase now and provide the necessary code updates step-by-step.