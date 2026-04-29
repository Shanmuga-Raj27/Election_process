# UI Border & Layout Enhancement Prompt

## Current Problem
The current UI only shows tricolor styling on the top portion of cards/layouts.

Issues:
- Only upper border is colored
- Full card border is missing
- Border colors appear only on hover/cursor move
- Layouts look plain without hover
- Need permanent static bordered design

---

# Required UI Changes

## 1. Full Static Borders
Apply visible borders on **all 4 sides** of every:
- Card
- Section
- Layout container
- Timeline box
- FAQ card
- Process step card
- Footer container

Borders must always remain visible without mouse hover.

---

## 2. Indian Flag Inspired Border Theme

Use premium dark tricolor inspired gradients:

- Saffron → `#FF6B35`
- White / Light Gray
- Green → `#138808`
- Optional Navy Blue → `#000080`

Make borders modern and elegant.

---

## 3. Remove Hover-Only Border Effects

Currently borders appear only when cursor moves over cards.

Remove this behavior completely.

### Important:
- Border visibility must NOT depend on hover
- Borders should remain permanently visible
- Hover should only enhance UI slightly

---

## 4. Hover Effects (Minimal)

Keep only subtle hover effects:

- Slight scale animation
- Soft shadow increase
- Smooth transition

DO NOT:
- Change border visibility
- Remove borders
- Add flashy effects

---

## 5. Card Styling

Apply these styles consistently:

- Full rectangular border
- Border thickness: `2px – 3px`
- Border radius: `16px – 20px`
- Clean white/light background inside
- Soft dark shadow
- Professional modern government portal look

---

## 6. Premium Border Glow

Add subtle glow effects:

### Orange Glow
```css
rgba(255,107,53,0.2)

Green Glow
rgba(19,136,8,0.2)

Glow should be elegant and not excessive.

Styling Requirements
Use Full Gradient Borders

Apply gradient borders around the entire card perimeter.

Example CSS
border: 2px solid transparent;

background:
  linear-gradient(white, white) padding-box,
  linear-gradient(135deg, #FF6B35, #ffffff, #138808) border-box;

border-radius: 18px;

box-shadow:
  0 0 10px rgba(255,107,53,0.2),
  0 0 10px rgba(19,136,8,0.2);

transition:
  transform 0.3s ease,
  box-shadow 0.3s ease;
Hover Example
.card:hover {
  transform: translateY(-4px) scale(1.01);

  box-shadow:
    0 8px 24px rgba(0,0,0,0.12),
    0 0 15px rgba(255,107,53,0.25),
    0 0 15px rgba(19,136,8,0.25);
}
Important Instructions
MUST DO
Full border on all sides
Static visible borders
Premium modern UI
Consistent design across all layouts
Responsive design for mobile + desktop
MUST NOT DO
Border only at top
Hover-only border visibility
Plain flat cards
Inconsistent border styles
Overly flashy animations
Final Design Goal

Create a modern Digital India Election Portal UI with:

Elegant tricolor bordered layouts
Premium government-tech style
Professional modern card system
Smooth animations
Clean readable interface
Static visible borders on every section