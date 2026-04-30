# Role and Objective
You are an Expert Full Stack Developer and UI/UX Specialist. Your objective is to create a dedicated, educational frontend page titled "How to Vote Using EVM". 

This page must feature a clean, modern, mobile-friendly layout designed to help first-time voters understand the Electronic Voting Machine process visually. 

**Critical Requirement:** Maintain multilingual support (English, Tamil, Hindi) using proper translation files (e.g., i18n/locales) for all text elements.

# Phase 1: Page Structure & UI Implementation

## Section 1: YouTube Educational Video
At the top of the page, include a section to embed an official YouTube educational video explaining the EVM voting process.
*   **Content:** Only use neutral, official Election Commission of India (ECI) or government awareness videos.
*   **UI Elements:** 
    *   Section heading with a tricolor underline.
    *   Fully responsive embedded video container with rounded corners, soft shadows, and tricolor border accents.
    *   A short description below the video (e.g., *"Watch this official educational video to understand how voting is done safely and securely using an Electronic Voting Machine (EVM)."*)
    *   A prominent "Watch Full Guide" button.

## Section 2: EVM Machine Visuals (2-Column Layout)
Create a modern, responsive 2-column layout to visually explain the EVM. It must stack vertically on mobile.
*   **Left Column (Visuals):** 
    *   Display an EVM machine image (Ballot Unit) and an EVM voting GIF/animation (VVPAT working).
    *   Use clean white background cards with rounded borders and Indian flag-inspired accent borders.
*   **Right Column (Explanations):** Add descriptive cards for EVM components:
    *   *Ballot Unit:* Used by voters to cast votes.
    *   *Control Unit:* Operated by polling officers.
    *   *VVPAT:* Displays vote confirmation briefly.
    *   *Candidate Buttons:* Used to select candidates.
    *   **Card Styling:** Include an icon, a hover effect with subtle animation, a colored left border, and simple beginner-friendly text.

## Section 3: Interactive "How to Vote" Cards (4 Steps)
Create an interactive step-by-step timeline or animated card UI. Use simple language, large readable typography, and smooth transitions. Support hover/tap animations and number each step.
*   **Step 1 — Identity Verification:** Officer checks voter identity in the voter list to grant permission. (UI: ID card illustration, verification icon).
*   **Step 2 — Go to Voting Compartment:** Voter enters private area; Ballot Unit displays candidates. Voting is secret. (UI: Privacy booth illustration, interactive hover card).
*   **Step 3 — Press Candidate Button:** Voter presses the button beside their choice; a beep confirms, button glows briefly. (UI: Button press animation, tricolor underline effect).
*   **Step 4 — Verify VVPAT Slip:** Screen briefly displays selected candidate confirming the vote, then slip disappears. (UI: VVPAT illustration, success/checkmark animation).

# Phase 2: Theming & Accessibility

## Design System & Colors
*   Must design like existing frontend homepage. refer for color pallets and design. 
*   Use Saffron for highlights/key visual elements.
*   Use Navy Blue for headings and primary typography.
*   Use Green for accent borders or success states (like the VVPAT confirmation).
*   Use Tricolor underline decorations where appropriate.

## Accessibility (a11y) Rules
The page must strictly adhere to WCAG standards:
*   Perfect mobile responsiveness and keyboard navigation support.
*   Readable font sizes and high color contrast.
*   Screen-reader-friendly semantic HTML structure (`<section>`, `<article>`, `<aside>`).
*   Descriptive `alt` text for all EVM images, illustrations, and GIFs.

# Phase 3: Content Safety & Educational Integrity
All EVM-related information must remain strictly:
*   Factually correct and politically neutral.
*   Beginner-friendly and aligned with official ECI information.
*   **Do NOT:** Exaggerate security claims, include political content/opinions, or add misleading information.
*   **References:** Use official data from `https://www.eci.gov.in/` and `https://voters.eci.gov.in/`.

# Phase 4: Engineering Standards & Scalability

## Code Quality & Architecture
*   **Structure:** Maintain scalability for future React frontend updates. Build modular components (e.g., `EVMVideoSection`, `EVMVisualizer`, `VotingSteps`) even if currently using vanilla JS/HTML.
*   **Readability & Maintainability:** Write clean, self-documenting code with clear separation of concerns (HTML, CSS, JS, Translations).
*   **Efficiency:** Optimize assets (images/GIFs) and use optimal resources to ensure fast page load times.

## Security
*   Ensure safe and responsible implementation (e.g., sanitizing any dynamic inputs, secure iframe embedding for the YouTube video).

## Testing
*   Create comprehensive testing files to validate the UI rendering and responsiveness.
*   Integrate these testing files logically into the existing `testing` folder structure without breaking the current setup.