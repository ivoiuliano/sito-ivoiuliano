---
name: new-page
description: Add a new page to the static Next.js site. Use when creating a new route, new page, or adding a section that needs its own URL. Covers page file, routes config, metadata, JSON-LD, and i18n.
---

# New Page Setup

Follow this workflow when adding a new page. Read `ARCHITECTURE.md` before making changes.

## 1. Add route to `lib/routes.ts`

Routes are the single source of truth for sitemap and navigation. Add an entry to the `routes` array:

```typescript
export const routes: RouteConfig[] = [
  // existing routes...
  {
    path: "/new-page",
    priority: 0.8,
    changeFrequency: "monthly",
    title: "Page Title",
    description: "Short description for SEO",
  },
];
```

- `path`: URL path without locale (e.g. `"/about"`, `""` for home).
- `priority`: 1.0 homepage, 0.8 main sections, 0.6–0.7 content.
- `changeFrequency`: `"weekly"` | `"monthly"` | `"yearly"` etc.

## 2. Create page file

Path: `app/[locale]/new-page/page.tsx` (use kebab-case for route segment).

```typescript
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/jsonld";
// Import section components as needed

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "newPage" });

  return buildMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/new-page",
  });
}

export default function NewPage() {
  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      {/* Optional: <JsonLd data={getWebPageSchema(url, title, description)} /> */}
      {/* Page sections / content */}
    </>
  );
}
```

- `params` is a `Promise`; await it before use.
- Use `getTranslations` in `generateMetadata` for title/description from messages.
- Include at least organization and website JSON-LD; add `getWebPageSchema` from `@/lib/jsonld` if the page has specific URL/title/description.

## 3. Create translations

Add `messages/en/new-page.json` and `messages/it/new-page.json` (and any other locales). Keep keys and structure identical.

```json
{
  "title": "Page Title",
  "description": "Page description for SEO (120–160 chars)."
}
```

Use semantic keys (e.g. `hero.title`, `cta.primary`). Include `alt`, `aria-label`, `title` where needed for a11y.

## 4. Add to navigation (optional)

If the page should appear in header/footer, update the component that reads routes (e.g. `Header`, `Footer`) to include the new path, or use `getAllRoutePaths()` / `getRoutesByPriority()` from `lib/routes.ts` if the nav is driven by routes.

## Checklist

- [ ] Entry in `lib/routes.ts` with path, priority, changeFrequency
- [ ] Page at `app/[locale]/<segment>/page.tsx` with `generateMetadata` and `buildMetadata`
- [ ] JSON-LD: `getOrganizationSchema()`, `getWebSiteSchema()`, and optionally `getWebPageSchema()`
- [ ] Message files for every locale with same keys
- [ ] No hardcoded user-facing text; no `rounded-*` (use `squircle-*`)
