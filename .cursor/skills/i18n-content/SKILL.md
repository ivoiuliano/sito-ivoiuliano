---
name: i18n-content
description: Add or change user-facing text with next-intl. Use when adding copy, labels, buttons, or accessibility text. Ensures all text comes from message files and all locales stay in sync.
---
# Internationalized Content

All user-facing text must come from message files. No hardcoded strings in components.

## Message files

- **Global UI:** `messages/[locale]/globals.json` (nav, footer, buttons, errors)
- **Page content:** `messages/[locale]/[page].json` (e.g. `landing.json`, `about.json`)

Structure must be **identical across all locales** (same keys). Add new keys to every locale when adding content.

## Key rules

- **Semantic keys:** `hero.title`, `cta.primary`, not `heading1` or `button1`
- **Nested by section:** e.g. `landing.hero.title`, `landing.about.content`
- **Include a11y:** Put `alt`, `aria-label`, `title` in the same JSON where the component uses them

## In components

```typescript
import { useTranslations } from "next-intl";

const t = useTranslations("namespace"); // e.g. "hero", "landing.hero"

<h1>{t("title")}</h1>
<p>{t("description")}</p>
<button aria-label={t("cta.ariaLabel")}>{t("cta.primary")}</button>
<img alt={t("imageAlt")} />
```

Namespace = top-level key or path in the JSON (e.g. `landing.json` with `"hero": { "title": "..." }` → `useTranslations("landing.hero")` or `useTranslations("hero")` if the file only has `hero` at root).

## In `generateMetadata` (server)

```typescript
import { getTranslations } from "next-intl/server";

const t = await getTranslations({ locale, namespace: "pageOrSection" });

return buildMetadata({
  title: t("title"),
  description: t("description"),
  locale,
  path: "/path",
});
```

## Adding new content

1. Choose the right file: `globals.json` vs page-specific JSON.
2. Add the key(s) in **every** locale file with the same structure.
3. Use the key in the component via `t("key")` or nested `t("nested.key")`.
4. For new pages, create e.g. `messages/en/new-page.json` and `messages/it/new-page.json` with matching keys.

## Checklist

- [ ] No hardcoded user-visible strings in components
- [ ] New keys added to all locales
- [ ] Keys are semantic and nested logically
- [ ] Alt text and ARIA labels come from messages where needed
