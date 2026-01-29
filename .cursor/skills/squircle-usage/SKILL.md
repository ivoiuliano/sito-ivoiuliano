---
name: squircle-usage
description: Use the squircle design system for rounded corners. Use when styling components, cards, buttons, or images. Never use rounded-*; use squircle-* classes and include SquircleSvgDefs in layout.
---
# Squircle Design System

This project uses **squircles** (smooth rounded rectangles) instead of CSS `border-radius`. Never use `rounded-*`; use `squircle-*` only.

## Classes (Tailwind / globals.css)

| Class | Use for |
|-------|---------|
| `squircle-sm` | Badges, chips, small elements |
| `squircle` | Buttons, small cards |
| `squircle-lg` | Cards, panels |
| `squircle-xl` | Large cards, images |
| `squircle-2xl` | Hero blocks, modals |

**Helpers:**

- `squircle-img` – Images with squircle mask
- `squircle-shadow` – Squircle + shadow
- `squircle-interactive` – Hover feedback for cards/buttons

## Usage

```tsx
// ✅ Correct
<div className="squircle-lg bg-card p-6">
<button className="squircle squircle-interactive">
<img className="squircle-img squircle-xl" alt="..." />

// ❌ Wrong
<div className="rounded-lg">
<button className="rounded-md">
```

## Layout requirement

Root layout must include squircle SVG definitions once:

```tsx
import SquircleSvgDefs from "@/components/SquircleSvgDefs";

<SquircleSvgDefs />
```

## When not to use

- Circles (use `rounded-full`)
- Pills (use `rounded-full`)
- Very small elements (<24px) where squircle has little effect

## Dynamic squircles

For SVG or inline styles, use `@/lib/utils`:

```typescript
import { generateSquirclePath, getSquircleStyle } from "@/lib/utils";
```

Prefer the CSS classes above when possible.
