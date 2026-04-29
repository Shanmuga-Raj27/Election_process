# AI Election Education Assistant — Specialized Development Prompt

## Project Title
AI-Powered Indian Election Process Education Assistant

---

# Project Goal

Build a modern, multilingual, educational web application that helps users understand the Indian election system in a simple, interactive, and beginner-friendly way.

The platform should educate users about:
- election processes,
- voter registration,
- voting procedures,
- election timelines,
- democratic awareness,
- election-related FAQs.

The application must remain:
- politically neutral,
- educational,
- accessible,
- easy to understand,
- mobile-friendly.

---

# Core Objectives

The application should:
- simplify election education,
- support first-time voters,
- provide step-by-step learning,
- improve democratic awareness,
- support multilingual users.

---

# Target Audience

The platform should be understandable for:
- students,
- first-time voters,
- rural users,
- general public,
- multilingual users,
- non-technical users.

---

# UI/UX Requirements

## Design Style
Create a:
- modern,
- minimal,
- clean,
- educational,
- trustworthy UI.

The interface should NOT feel:
- political,
- biased,
- government-heavy,
- cluttered.

---

# Theme Requirements

## Light Mode Only
- Use ONLY light mode.
- Do NOT implement dark mode.

---

# Indian Flag Inspired Color Palette

Use these colors consistently throughout the UI:

| Color | Hex |
|---|---|
| Saffron | `#FF671F` |
| White | `#FFFFFF` |
| Navy Blue | `#06038D` |
| Green | `#046A38` |

---

# Color Usage Suggestions

## Saffron
Use for:
- CTA buttons,
- highlights,
- active states,
- important actions.

## Navy Blue
Use for:
- headings,
- navbar,
- footer,
- important text.

## Green
Use for:
- success/info sections,
- educational highlights,
- positive actions.

## White
Use for:
- backgrounds,
- readability,
- clean spacing.

---

# Typography

Use modern readable fonts such as:
- Inter
- Poppins
- Open Sans
- Nunito

Requirements:
- excellent readability,
- large mobile-friendly headings,
- proper line spacing,
- accessible font sizes.

---

# Technical Stack

## Frontend
- React
- Vite
- Tailwind CSS

## Animations
- Framer Motion

## Icons
- Lucide React

## Internationalization
- react-i18next

---

# Responsive Design Requirements

The application MUST be:
- mobile-first,
- fully responsive,
- tablet compatible,
- desktop compatible.

Special focus:
- small-screen readability,
- touch-friendly interactions,
- responsive layouts.

---

# Multilingual Support

The application must support:
1. English
2. Tamil
3. Hindi

---

# Translation Architecture (IMPORTANT)

DO NOT rely on browser auto-translation.

Implement proper internationalization using:
- `react-i18next`
- translation JSON files.

---

# Correct Translation Structure

## BAD
```jsx
<h1>Election Process</h1>
```

## GOOD
```jsx
<h1>{t("electionProcess")}</h1>
```

---

# Translation File Examples

## English
```json
{
  "electionProcess": "Election Process"
}
```

## Tamil
```json
{
  "electionProcess": "தேர்தல் செயல்முறை"
}
```

## Hindi
```json
{
  "electionProcess": "चुनाव प्रक्रिया"
}
```

---

# Homepage Structure

---

# 1. Hero Section

## Purpose
Clearly explain the platform purpose.

## Include
- App name
- Tagline
- CTA buttons
- Election-themed illustration or icon

## Example Content
- “Understand Elections the Simple Way”
- “Learn voting, voter registration, and election timelines interactively.”

## CTA Buttons
- Start Learning
- Ask AI Assistant

---

# 2. Introduction Section

Explain:
- what elections are,
- why elections matter,
- how voting strengthens democracy.

Keep content:
- short,
- simple,
- beginner-friendly.

---

# 3. Why Voting Matters

Create educational cards.

## Topics
- Every vote matters
- Democracy depends on participation
- Equal voice for citizens
- Responsible voting

Use:
- icons,
- cards,
- subtle animations.

---

# 4. Election Process Section (Main Feature)

Create a visual step-by-step learning section.

## Steps
1. Election Announcement
2. Candidate Nomination
3. Campaign Period
4. Voter Verification
5. Voting Day
6. Vote Counting
7. Election Results

---

# UI Suggestions

Use:
- timeline components,
- stepper UI,
- animated cards,
- progress flow visualization.

---

# 5. Types of Elections

Explain election categories clearly.

## Include
- Lok Sabha Election
- Rajya Sabha Election
- State Assembly Election
- Local Body Elections

Use:
- tabs,
- comparison cards,
- responsive layouts.

---

# 6. Lok Sabha vs Rajya Sabha Comparison

Create a clean educational comparison table.

## Compare
- lower house vs upper house,
- direct vs indirect election,
- term duration,
- representation.

Keep explanations:
- short,
- visual,
- easy to understand.

---

# 7. Election Timeline Section

Create a clean election timeline flow.

## Example Flow
```text
Announcement
↓
Nomination
↓
Campaign
↓
Voting
↓
Counting
↓
Results
```

---

# 8. Voter ID Registration Guide

Explain voter registration step-by-step.

## Include
- eligibility,
- required documents,
- registration steps,
- verification process.

Use:
- cards,
- numbered steps,
- visual indicators.

---

# 9. Eligibility Criteria

Use simple informational cards.

## Include
- Age 18+
- Indian citizen
- Valid address proof
- Registered voter

---

# 10. Election Awareness Section

Promote democratic awareness.

## Topics
- Avoid fake news
- Verify election information
- Respect democracy
- Vote responsibly

IMPORTANT:
Maintain complete political neutrality.

---

# 11. AI Assistant CTA Section

Encourage interaction with chatbot.

## Example
“Still have questions? Ask the AI Election Assistant.”

## Button
- Ask Now

---

# 12. FAQ Section

Use accordion-style UI.

## Example Questions
- How to register voter ID?
- What is EVM?
- Can I vote without voter ID?
- What documents are required?
- How are votes counted?

---

# 13. Footer Section

Include:
- About project
- Educational disclaimer
- Contact
- GitHub
- Privacy policy
- Language selector
- References/sources

---

# AI Assistant Requirements

The AI assistant should:
- explain concepts simply,
- avoid political bias,
- support multilingual replies,
- provide educational guidance only.

---

# Example AI System Prompt

```text
You are an Election Education Assistant.

Explain election concepts in simple beginner-friendly language.
Avoid political bias.
Provide step-by-step educational responses.
Support multilingual communication.
Focus only on educational election awareness.
```

---

# Accessibility Requirements

The application MUST maintain:

## Accessibility
- WCAG-friendly contrast ratios
- keyboard navigation support
- semantic HTML
- screen-reader compatibility
- alt text for images/icons
- accessible forms/buttons
- readable typography
- responsive layouts

---

# Code Quality Requirements

The application MUST maintain:

## Code Quality
- clean folder structure
- reusable components
- modular architecture
- maintainable codebase
- readable naming conventions
- scalable design patterns
- proper separation of concerns

---

# Security Requirements

The application MUST maintain:

## Security
- safe API handling
- protected API keys
- secure authentication practices
- input validation
- safe rendering
- prevention of unsafe user input handling

---

# Efficiency Requirements

The application MUST maintain:

## Efficiency
- optimized rendering
- minimal unnecessary re-renders
- lazy loading where appropriate
- optimized assets/images
- smooth mobile performance
- fast loading experience

---

# Testing Requirements

The application MUST maintain:

## Testing
- multilingual switching validation
- responsive layout testing
- form validation testing
- component functionality testing
- navigation testing
- mobile usability testing

---

# Design Guidelines

## MUST HAVE
- modern educational UI
- responsive cards
- sticky navbar
- smooth animations
- clean spacing
- rounded corners
- subtle shadows
- beginner-friendly layout

---

# AVOID

DO NOT:
- implement dark mode
- add political party branding
- create biased content
- clutter the interface
- overload with text
- use complicated layouts
- use aggressive animations

---

# Final Experience Goal

The platform should feel:
- educational,
- trustworthy,
- modern,
- interactive,
- multilingual,
- accessible,
- beginner-friendly.

The final experience should help users:
- understand elections confidently,
- learn voting processes easily,
- access election knowledge without confusion.