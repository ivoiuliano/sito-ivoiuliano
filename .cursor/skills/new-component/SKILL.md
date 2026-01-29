---
name: new-component
description: Create a new React component in this codebase. Use when adding a UI component, landing section, or shared widget. Ensures correct placement, i18n, squircle design, and TypeScript props.
---
# New Component

Follow project structure and AGENTS.md. Use squircle classes only; no hardcoded text.

## Where to put it

| Type | Path | Example |
|------|------|---------|
| Page-specific section | `components/[page]/ComponentName.tsx` | `components/landing/Hero.tsx` |
| Shared across pages | `components/ComponentName.tsx` | `components/FadeIn.tsx` |
| Tracking pixel | `components/pixels/Name.tsx` | `components/pixels/MetaPixel.tsx` |

- **Never modify** `components/ui/*` directly (shadcn primitives); extend or compose them.

## Pattern

```typescript
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  className?: string;
  variant?: "default" | "secondary";
}

export function ComponentName({
  className,
  variant = "default",
}: ComponentNameProps) {
  const t = useTranslations("namespace"); // e.g. "hero", "landing.about"

  return (
    <section className={cn("squircle-lg p-6", variant === "secondary" && "bg-secondary", className)}>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
    </section>
  );
}
```

- Use `useTranslations` with a namespace that matches your message file (e.g. `landing.json` → `"landing.sectionName"` or key at root).
- Use `cn()` for conditional and overridable classes.
- Use **squircle** classes (`squircle`, `squircle-lg`, etc.), not `rounded-*`.
- Keep components under ~200 lines; split if larger.

## Props

- **className?: string** – Allow parent to add/override styles.
- **variant?** – Use for visual variants (default, secondary, etc.).
- Export a clear interface and avoid `any`.

## Scroll / motion

For sections that should animate on scroll, wrap content in `FadeIn`:

```tsx
import FadeIn from "@/components/FadeIn";

<FadeIn>
  <div>...</div>
</FadeIn>
```

## Checklist

- [ ] File in correct folder (page-specific vs shared)
- [ ] All user-facing text from `useTranslations` (no hardcoded strings)
- [ ] Message keys added in every locale with same structure
- [ ] Squircle classes only; no `rounded-*`
- [ ] TypeScript interface for props; no `any`
- [ ] Semantic HTML and a11y (alt, aria-label) where needed
