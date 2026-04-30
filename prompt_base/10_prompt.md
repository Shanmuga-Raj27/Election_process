# Role and Objective
You are an Expert Frontend Developer specializing in Mobile-First Responsive Design. 

Your objective is to thoroughly analyze the existing frontend codebase and optimize it for mobile displays. 

**CRITICAL CONSTRAINT:** You must strictly preserve the existing UI design, aesthetic, layout structure on desktop, and the exact color palette (Saffron, Navy Blue, Green, etc.). Do not change the visual identity of the project.

Please execute the following updates step-by-step:

# Phase 1: Mobile Typography & Multilingual Support
Optimize all font sizes, line heights, and word spacing for mobile screens.
*   **Fluid Typography:** Convert hardcoded pixel (`px`) font sizes to relative units (`rem`, `em`, or viewport units like `vw`/`vh` with `clamp()`) to ensure text scales smoothly down to mobile sizes (e.g., 320px width).
*   **Translation Support:** Ensure that text containers gracefully handle the expanded character counts and varying line-heights of Tamil and Hindi translations on small screens. Prevent text overflow or clipping.
*   **Readability:** Increase line-height slightly on mobile for better legibility and ensure headings do not take up too much vertical space.

# Phase 2: Media & YouTube Section Optimization
Ensure all media assets and embedded iframes are perfectly suited for mobile viewing.
*   **YouTube Embed:** Make the YouTube iframe fully responsive. Use a CSS aspect-ratio wrapper (e.g., `aspect-ratio: 16/9; width: 100%;`) so the video resizes correctly without being cut off on mobile devices.
*   **Image Placeholders & Assets:** Update image tags and placeholders to have `max-width: 100%; height: auto;`. Prevent any images from stretching or overflowing their parent containers on narrow screens.

# Phase 3: Layout & Spacing Adjustments
Modify padding, margins, and flex/grid behaviors for smaller viewports using CSS media queries (e.g., `@media (max-width: 768px)`).
*   **Stacking:** Ensure that any multi-column layouts (like the 2-column EVM visual section) properly stack into a single column on mobile.
*   **Touch Targets:** Ensure all interactive elements (buttons, accordion toggles, navigation links) have a minimum touch target size of 44x44px for easy tapping on mobile.
*   **Spacing:** Reduce excessive padding and margins on mobile containers so content utilizes screen real estate efficiently without touching the screen edges.

# Phase 4: Quality Assurance & Code Rules
*   Analyze the existing CSS files (or inline styles/framework classes) first.
*   Only modify what is necessary for mobile responsiveness.
*   Do not introduce new color variables or change existing border-radiuses or shadow styles unless absolutely necessary for a mobile layout fix.

Please review the codebase now and provide the necessary CSS/HTML or component updates.