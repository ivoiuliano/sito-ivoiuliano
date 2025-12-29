# AI Agent Guidelines

This document contains guidelines and rules for AI assistants working on this codebase. It ensures consistency, quality, and adherence to project standards.

---

## Project Type

This is a **static Next.js template** for building marketing/content websites with:
- Multi-language support (i18n)
- Advanced SEO optimization
- AI/LLM integration
- Squircle design system
- GDPR-compliant analytics & tracking

---

## Core Principles

### 1. Architecture First
- **Always read `ARCHITECTURE.md` before making changes**
- Follow established patterns and conventions
- Don't reinvent solutions that already exist in the codebase
- Maintain consistency with existing code style

### 2. Centralization
- **Metadata** → `lib/meta.ts`
- **SEO** → `lib/seo.ts`
- **Structured Data** → `lib/jsonld.ts`
- **LLM Data** → `lib/llms.ts`
- **Utilities** → `lib/utils.ts`
- **Translations** → `messages/[locale]/*.json`

Never duplicate these concerns across the codebase.

### 3. No Hardcoded Content
- **All user-facing text** must come from `messages/*.json` files
- **All business data** must come from `lib/meta.ts`
- **All metadata** must be generated via `lib/seo.ts`

### 4. TypeScript Strict Mode
- No `any` types unless absolutely necessary
- Export and document types for reusable components
- Use type inference where appropriate
- Validate props with proper interfaces

---

## File Organization Rules

### Components

```
components/
├── ui/              # NEVER modify directly - these are shadcn/ui primitives
├── [page]/          # Page-specific sections (e.g., landing/, about/)
└── [shared].tsx     # Shared across multiple pages
```

**Rules:**
- Page-specific components → `components/[page]/ComponentName.tsx`
- Reusable UI → `components/ComponentName.tsx`
- Design system → `components/ui/` (extend, don't modify)

### Lib Files

```
lib/
├── meta.ts      # Business data, contact info, services
├── seo.ts       # Metadata generation
├── jsonld.ts    # Structured data (JSON-LD)
├── llms.ts      # AI-readable business info
└── utils.ts     # Generic utilities (cn, squircle helpers)
```

**Rules:**
- One responsibility per file
- Export documented functions
- Import from `meta.ts` when needed
- Keep utilities pure (no side effects)

### Message Files

```
messages/
├── en/
│   ├── globals.json   # Navigation, footer, buttons, errors
│   └── [page].json    # Page-specific content
└── it/
    └── ...
```

**Rules:**
- Use semantic keys: `hero.title`, not `heading1`
- Nest logically: `landing.hero.cta.primary`
- Include a11y labels: `alt`, `aria-label`, `title`
- Keep structure identical across locales

---

## Code Style

### TypeScript/React

```typescript
// ✅ Good
export function Hero() {
  const t = useTranslations('landing.hero');
  
  return (
    <section className="squircle-lg bg-card p-6">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </section>
  );
}

// ❌ Bad
export function Hero() {
  return (
    <div style={{ borderRadius: '12px' }}>
      <h1>Welcome to Our Site</h1>  {/* Hardcoded text */}
      <p>We offer great services</p>  {/* Hardcoded text */}
    </div>
  );
}
```

### CSS/Tailwind

```tsx
// ✅ Good - Use Tailwind utilities + squircle classes
<div className="squircle-lg bg-card text-foreground p-6 shadow-lg">

// ❌ Bad - Don't use inline styles or arbitrary values
<div style={{ borderRadius: '12px', padding: '24px' }}>

// ❌ Bad - Don't use standard border-radius
<div className="rounded-lg">  {/* Use squircle-lg instead */}
```

### Naming Conventions

- **Components:** PascalCase (`Hero.tsx`, `FeatureCard.tsx`)
- **Utilities:** camelCase (`buildMetadata`, `generateSquirclePath`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_RETRIES`, `API_URL`)
- **Files:** kebab-case for routes (`about-us/page.tsx`)

---

## SEO Requirements

### Every Page Must Have

1. **Metadata via `generateMetadata()`:**
   ```typescript
   export async function generateMetadata({ params }: Props) {
     return buildMetadata({
       title: 'Page Title',
       description: 'Page description',
       locale: params.locale,
       path: '/page-path',
     });
   }
   ```

2. **JSON-LD Structured Data:**
   ```typescript
   import JsonLd from '@/components/JsonLd';
   import { getOrganizationJsonLd } from '@/lib/jsonld';
   
   <JsonLd data={getOrganizationJsonLd()} />
   ```

3. **Sitemap Entry:**
   Add route to `app/sitemap.ts` routes array.

---

## Internationalization Rules

### Message File Structure

```json
{
  "hero": {
    "title": "Welcome",
    "description": "Description text",
    "cta": {
      "primary": "Get Started",
      "secondary": "Learn More"
    }
  }
}
```

### Usage in Components

```typescript
const t = useTranslations('landing.hero');

<h1>{t('title')}</h1>
<p>{t('description')}</p>
<button>{t('cta.primary')}</button>
```

### Adding New Locales

1. Create folder: `messages/[new-locale]/`
2. Copy all JSON files from existing locale
3. Translate content (preserve keys)
4. Update `i18n/routing.ts`:
   ```typescript
   locales: ['en', 'it', 'new-locale']
   ```
5. Update sitemap and metadata generators

---

## Design System - Squircles

### Always Use Squircles

Replace all `rounded-*` classes with `squircle-*`:

```tsx
// ✅ Correct
<div className="squircle-lg">
<button className="squircle">
<img className="squircle-xl" />

// ❌ Wrong
<div className="rounded-lg">
<button className="rounded">
```

### Squircle Size Guide

- `squircle-sm` → Small elements (badges, chips)
- `squircle` → Default (buttons, small cards)
- `squircle-lg` → Cards, panels
- `squircle-xl` → Large cards, images
- `squircle-2xl` → Hero sections, modals

### Helpers

- `squircle-img` → Images with squircle mask
- `squircle-shadow` → Squircle + shadow
- `squircle-interactive` → Cards/buttons with hover

### SVG Definitions

Include once in root layout:

```tsx
import SquircleSvgDefs from '@/components/SquircleSvgDefs';

<SquircleSvgDefs />
```

---

## Testing & Quality Checklist

Before considering a feature complete:

- [ ] All text comes from message files
- [ ] Metadata is generated via `buildMetadata()`
- [ ] JSON-LD structured data is present
- [ ] Route is added to sitemap
- [ ] All locales have translations
- [ ] Squircle classes are used (not `rounded-*`)
- [ ] TypeScript has no errors
- [ ] Component is responsive (mobile-first)
- [ ] Accessibility: semantic HTML, alt text, ARIA labels
- [ ] Performance: images optimized, lazy loading

---

## Common Patterns

### New Page Setup

1. Create page: `app/[locale]/new-page/page.tsx`
2. Add metadata:
   ```typescript
   export async function generateMetadata({ params }) {
     return buildMetadata({
       title: 'Page Title',
       description: 'Description',
       locale: params.locale,
       path: '/new-page',
     });
   }
   ```
3. Add structured data:
   ```typescript
   <JsonLd data={getPageJsonLd()} />
   ```
4. Create translations: `messages/[locale]/new-page.json`
5. Add to sitemap: Update `app/sitemap.ts`

### New Component Pattern

```typescript
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  variant?: 'default' | 'secondary';
}

export function Component({ className, variant = 'default' }: ComponentProps) {
  const t = useTranslations('component');
  
  return (
    <div className={cn(
      'squircle-lg p-6',
      variant === 'secondary' && 'bg-secondary',
      className
    )}>
      <h2>{t('title')}</h2>
    </div>
  );
}
```

### Adding Business Data

All business data goes in `lib/meta.ts`:

```typescript
export const baseMetadata = {
  siteName: "Business Name",
  business: {
    name: "Legal Name",
    vat: "VAT123456",
    address: "Full Address",
  },
  services: {
    newService: {
      name: "Service Name",
      description: "Service description",
      serviceType: "Type",
    },
  },
  // ...
};
```

This data flows to:
- SEO metadata
- JSON-LD
- LLMs.txt
- Site content (via i18n if needed)

---

## What NOT to Do

❌ **Never:**
- Hardcode user-facing text in components
- Modify `components/ui/*` files directly
- Use `rounded-*` classes (use `squircle-*`)
- Inline JSON-LD in components
- Duplicate metadata logic
- Skip TypeScript types
- Ignore accessibility
- Use `any` types
- Create components over 200 lines
- Mix English and other languages in code
- Commit sensitive data (API keys, tokens)

✅ **Always:**
- Read `ARCHITECTURE.md` first
- Use centralized libs (`meta`, `seo`, `jsonld`, `llms`)
- Extract text to message files
- Generate metadata via `buildMetadata()`
- Use squircle design system
- Follow TypeScript strict mode
- Test on mobile devices
- Include accessibility features
- Keep components focused and small
- Document complex logic

---

## Emergency Fixes

If something is broken:

1. **Build fails:**
   - Check TypeScript errors: `npm run type-check`
   - Check for missing imports
   - Verify all locales have matching keys

2. **Missing translations:**
   - Check `messages/[locale]/` for missing keys
   - Ensure structure matches across locales

3. **Metadata not showing:**
   - Verify `generateMetadata()` is exported
   - Check `lib/meta.ts` has correct data
   - Test in production build

4. **Squircles not working:**
   - Ensure `<SquircleSvgDefs />` in layout
   - Check CSS is properly loaded
   - Verify Tailwind config includes utilities

---

## Version & Maintenance

**Template Version:** 1.0.0  
**Last Updated:** December 2024

### Regular Updates

- **Monthly:** Update dependencies
- **Quarterly:** Review message files
- **Bi-annually:** Audit SEO and structured data
- **Annually:** Review and update documentation

---

## Questions?

- Read `ARCHITECTURE.md` for detailed patterns
- Check existing code for examples
- Follow established conventions
- When in doubt, prioritize consistency over novelty

