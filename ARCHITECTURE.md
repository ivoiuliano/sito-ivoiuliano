# Architecture

This document describes the core architecture and conventions of the static Next.js template, designed to build marketing / content websites quickly and consistently.

## Overview

This is a production-ready template for building static marketing websites with:
- Multi-language support (i18n)
- Advanced SEO optimization
- AI/LLM integration via llms.txt
- Modern UI with squircle design system
- Cookie consent management
- Structured data and rich snippets
- Performance-optimized static generation

---

## Tech Stack

### Core Framework
- **Next.js 15+** with App Router  
  Optimized for static site generation (SSG) with `output: 'export'` for maximum performance and reliability.

### Styling & UI
- **Tailwind CSS**  
  Utility-first CSS framework as the main styling system.
- **shadcn/ui**  
  Base UI component library installed under `@/components/ui`.  
  All design-system components extend or compose shadcn/ui primitives.
- **Squircle Design System**  
  Custom CSS utilities and components for smooth, continuous rounded corners (see [Squircle Design System](#squircle-design-system)).

### Internationalization
- **next-intl** (App Router compatible)  
  Full i18n support with locale-based routing.  
  All navigation and content are fully locale-aware.

### Animation
- **Framer Motion**  
  Lightweight animation library for micro-interactions and section transitions.

### Cookie Consent
- **shadcn-cookie-consent**  
  GDPR-compliant cookie consent banner.  
  Integrated as `@/components/CookieConsent.tsx`.

### Internal Libraries
- **`@/lib/meta.ts`** – Centralized static data for site-wide metadata (brand, URLs, business info, services)
- **`@/lib/seo.ts`** – Metadata builder for pages (title, description, OG tags, Twitter cards)
- **`@/lib/jsonld.ts`** – JSON-LD structured data provider
- **`@/lib/llms.ts`** – AI/LLM-readable business information builder
- **`@/lib/utils.ts`** – Generic utility functions (including squircle generators)

---

## SEO & Metadata

Every page and layout must implement comprehensive SEO metadata using the centralized helpers.

### Metadata Generation

All pages must define metadata using `@/lib/seo.ts`:

```typescript
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildMetadata({
    title: 'Custom Page Title',
    description: 'Page-specific description optimized for search engines...',
    locale: params.locale,
    path: '/custom-page',
  });
}
```

### Global Defaults

Configure site-wide defaults in `@/lib/meta.ts`:
- Site name and tagline
- Default description
- Base URL and booking links
- Open Graph default image
- Twitter handle
- Business information (VAT, address, capital)
- Founder/owner information
- Service catalog with descriptions

Each page only overrides what's specific to it; everything else is inherited from global defaults.

### Required Metadata

Every page must provide at minimum:
- **Title** – Unique, descriptive, max 60 characters
- **Description** – Compelling summary, max 160 characters
- **Locale** – Current language for proper hreflang tags
- **Path** – Relative path for canonical URL generation

Optional but recommended:
- **Custom OG image** for social sharing
- **Additional schema markup** via JSON-LD

---

## Structured Data (JSON-LD)

Structured data enables rich snippets in search results and helps search engines understand your content.

### Implementation

All JSON-LD schemas are centralized in `@/lib/jsonld.ts`:
- `getOrganizationJsonLd()` – Organization/business schema
- `getWebsiteJsonLd()` – Website schema
- `getLandingJsonLd()` – Landing page with offers
- `getServiceJsonLd(serviceKey)` – Individual service pages
- `getBreadcrumbJsonLd(items)` – Breadcrumb navigation
- `getFAQJsonLd(questions)` – FAQ schema

### Usage

Always use the `JsonLd` wrapper component:

```typescript
import JsonLd from '@/components/JsonLd';
import { getOrganizationJsonLd, getLandingJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  return (
    <>
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getLandingJsonLd()} />
      {/* page content */}
    </>
  );
}
```

### Best Practices

- **Never inline JSON-LD** – Always add new schemas to `@/lib/jsonld.ts`
- **Reuse data** – Pull information from `@/lib/meta.ts` for consistency
- **Validate schemas** – Use Google's Rich Results Test
- **Keep updated** – Update structured data when business info changes

---

## Sitemap Generation

The sitemap is automatically generated and optimized for multi-language sites.

### Implementation

Located at `app/sitemap.ts`, the sitemap builder:
- Generates entries for all static routes
- Creates locale-specific URLs for each route
- Sets appropriate priorities (1.0 for homepage, 0.8 for secondary pages)
- Includes `lastModified` timestamps
- Supports `changeFrequency` hints for crawlers

### Adding New Routes

When adding new pages, update the `routes` array in `app/sitemap.ts`:

```typescript
const routes = [
  "",           // Homepage
  "/about",     // About page
  "/services",  // Services page
  "/contact",   // Contact page
];
```

The sitemap generator will automatically:
1. Create entries for each locale (`/it`, `/en`, `/es`, etc.)
2. Build full URLs using `baseMetadata.url`
3. Set proper change frequencies
4. Assign priority weights

### Dynamic Routes

For dynamic routes (e.g., blog posts, service pages), fetch data and generate entries programmatically:

```typescript
// Fetch dynamic content
const services = await getServices();

// Add to sitemap
for (const service of services) {
  for (const locale of routing.locales) {
    sitemapEntries.push({
      url: `${baseMetadata.url}/${locale}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }
}
```

### Best Practices

- **Keep routes organized** – Group by section or type
- **Set realistic frequencies** – Don't claim 'daily' if content rarely changes
- **Prioritize properly** – Homepage: 1.0, Main sections: 0.8, Content: 0.6-0.7
- **Include all public pages** – But exclude admin, auth, or utility routes
- **Test the sitemap** – Visit `/sitemap.xml` and validate with Google Search Console

---

## LLMs.txt - AI Assistant Integration

This template implements the [llms.txt protocol](https://llmstxt.org/) to provide AI assistants with structured, easily parseable information about your business.

### What is llms.txt?

`llms.txt` is a standardized format for exposing business information, services, and site structure in a way that LLMs (Large Language Models) can easily understand and reference.

### Implementation

The system consists of two parts:

#### 1. Builder (`@/lib/llms.ts`)

Centralized builder that compiles information from `@/lib/meta.ts` into an LLM-friendly format:
- Business identification and legal info
- Services catalog with descriptions
- Contact information and social links
- Site structure and available routes
- Technical stack information

```typescript
import { buildLlmsTxt, buildLlmsJson } from '@/lib/llms';

// Generate text format
const textContent = buildLlmsTxt();

// Or JSON format for programmatic access
const jsonData = buildLlmsJson();
```

#### 2. Build-time generation (`scripts/generate-llms-txt.ts`)

With static export (`output: 'export'`), `/llms.txt` is generated at build time:
- The `prebuild` script runs `scripts/generate-llms-txt.ts`, which calls `buildLlmsTxt()` and writes to `public/llms.txt`
- Next.js copies `public/` into `out/`, so `/llms.txt` is served as a static asset
- No server or Route Handler required

### Benefits

- **Better AI interactions** – AI assistants can accurately answer questions about your business
- **Consistent information** – Single source of truth from `@/lib/meta.ts`
- **Automatic updates** – Changes to meta.ts propagate automatically
- **Developer friendly** – Easy to maintain and extend

### Usage Example

When users ask AI assistants like ChatGPT or Claude about your business, the AI can fetch `/llms.txt` to provide accurate, up-to-date answers about:
- What services you offer
- How to contact or book appointments
- Business hours and location
- Pricing and service details

### Maintenance

Update business information in `@/lib/meta.ts` and it will automatically reflect in:
- Page metadata (SEO)
- Structured data (JSON-LD)
- LLMs.txt
- Site content via i18n

---

## Squircle Design System

This template uses **squircles** (smooth continuous rounded rectangles) instead of standard border-radius for a more modern, organic aesthetic.

### What are Squircles?

Squircles are mathematically smooth curves that create more pleasing rounded corners than traditional CSS `border-radius`. They're used by Apple, iOS, and modern design systems for a premium feel.

### Implementation

#### CSS Utilities

Available classes in `app/globals.css`:

```css
.squircle         /* Base squircle shape */
.squircle-sm      /* Small corners */
.squircle-md      /* Medium corners */
.squircle-lg      /* Large corners */
.squircle-xl      /* Extra large corners */
.squircle-2xl     /* 2XL corners */

/* Helpers */
.squircle-img       /* Squircle-shaped images */
.squircle-shadow    /* Squircle with shadow */
.squircle-interactive /* For cards/buttons with hover */
```

#### Usage Examples

```tsx
// Card with squircle
<div className="squircle-lg bg-white p-6">
  <h2>Card Title</h2>
</div>

// Interactive button
<button className="squircle squircle-interactive">
  Click me
</button>

// Image with squircle mask
<img 
  src="/photo.jpg" 
  className="squircle-img squircle-xl" 
  alt="Profile"
/>
```

#### Programmatic Generation

Use utility functions from `@/lib/utils.ts` for dynamic squircles:

```typescript
import { generateSquirclePath, getSquircleStyle } from '@/lib/utils';

// Generate SVG path
const path = generateSquirclePath(200, 200, 24, 1);

// Get inline styles
const style = getSquircleStyle(300, 200, 32, 0.8);

// Apply to element
<div style={style}>Dynamic squircle</div>
```

#### SVG Definitions Component

Include `<SquircleSvgDefs />` in your root layout for clip-path support:

```tsx
import SquircleSvgDefs from '@/components/SquircleSvgDefs';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SquircleSvgDefs />
        {children}
      </body>
    </html>
  );
}
```

### Design Philosophy

- **Consistency** – Use squircles for all rounded elements (cards, buttons, images, modals)
- **Size hierarchy** – Larger elements get larger corner radius
- **Interaction feedback** – Combine with shadows and transitions for depth
- **Fallback** – Standard border-radius used as fallback for unsupported browsers

### When to Use

✅ **Use squircles for:**
- Cards and panels
- Buttons and CTAs
- Images and avatars
- Modals and dialogs
- Input fields (subtle)

❌ **Avoid for:**
- Circles (use `rounded-full`)
- Pills (use standard `rounded-full`)
- Very small elements (<24px)

---

## Components & Project Structure

### Organization Principles

All shared components live under `@/components` with a clear hierarchy:

```
components/
├── ui/                    # shadcn/ui primitives
├── landing/              # Landing page sections
├── about/                # About page sections
├── [page-name]/          # Page-specific sections
├── pixels/               # Tracking pixels (Meta, Google)
├── CookieConsent.tsx     # Cookie consent UI
├── JsonLd.tsx            # JSON-LD wrapper
├── FadeIn.tsx            # Reusable animations
└── SquircleSvgDefs.tsx   # Squircle SVG definitions
```

### Component Categories

#### 1. Design System Components (`@/components/ui`)
Base UI primitives from shadcn/ui:
- Buttons, inputs, forms
- Cards, dialogs, sheets
- Navigation, menus
- Data display (tables, charts)

**Never modify these directly** – create wrapper components or use composition.

#### 2. Page Sections (`@/components/[page-name]`)
Components specific to a page:
- `landing/Hero.tsx`
- `landing/Features.tsx`
- `landing/Testimonials.tsx`
- `about/Team.tsx`

**Naming convention:** PascalCase, descriptive of the section's purpose.

#### 3. Shared/Global Components (`@/components`)
Reusable across multiple pages:
- `CookieConsent.tsx` – GDPR banner
- `JsonLd.tsx` – Structured data wrapper
- `FadeIn.tsx` – Scroll animations
- `SquircleSvgDefs.tsx` – SVG definitions

### Best Practices

- **DRY Principle** – Don't duplicate code. If a pattern repeats 3+ times, extract a component.
- **Single Responsibility** – Each component should do one thing well.
- **Composition over Complexity** – Build complex UIs from simple, composable pieces.
- **Co-location** – Keep related files together (component + types + tests).

---

## Internationalization & Content Management

The template uses **next-intl** with JSON message files for complete internationalization.

### Message Organization

```
messages/
├── en/
│   ├── globals.json      # Navigation, footer, buttons
│   ├── landing.json      # Landing page content
│   ├── about.json        # About page content
│   └── services.json     # Services content
├── it/
│   ├── globals.json
│   ├── landing.json
│   └── ...
└── es/
    └── ...
```

### Content Categories

#### 1. **globals.json**
Site-wide UI elements:
- Navigation links
- Footer content
- Common buttons (CTA, submit, cancel)
- Cookie consent text
- Error messages

#### 2. **Page-specific JSON** (`landing.json`, `about.json`, etc.)
Page content:
- Headings and subheadings
- Paragraphs and descriptions
- Page-specific CTAs
- Feature lists
- Testimonials

### Usage in Components

```tsx
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('landing.hero');
  
  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('cta')}</button>
    </section>
  );
}
```

### Key Rules

1. **Never hardcode text** – All text must come from message files
2. **Include accessibility labels** – Even `aria-label` and `alt` text in JSON
3. **Use nested keys** – Organize with dot notation: `landing.hero.title`
4. **Keep keys semantic** – Name keys by purpose, not appearance
5. **Provide context** – Add comments in JSON for translators

### Locale Routing

next-intl handles locale routing automatically:
- `/it` → Italian
- `/en` → English
- `/es` → Spanish (if configured)

The `middleware.ts` handles locale detection and redirection.

---

## Styling & Layout

### Tailwind CSS

The entire design system is built with **Tailwind CSS** utility classes.

#### Configuration

- **Custom colors** – Defined in `app/globals.css` using CSS variables
- **Design tokens** – Spacing, typography, shadows follow a consistent scale
- **Dark mode** – Supported via CSS variables (`.dark` class)
- **Squircle utilities** – Custom clip-path utilities for smooth corners

#### Usage

```tsx
// Utility-first approach
<div className="bg-card text-foreground p-6 squircle-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4">Heading</h2>
  <p className="text-muted-foreground">Description</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### shadcn/ui Customization

Customize components using:
1. **Variants** – Defined in component files
2. **Tailwind classes** – Override via `className` prop
3. **CSS variables** – Global theme changes in `globals.css`

```tsx
// Using variants
<Button variant="default" size="lg">Click me</Button>

// Custom styling
<Button className="squircle bg-gradient-to-r from-primary to-secondary">
  Gradient Button
</Button>
```

### Global Styles

Defined in `app/globals.css`:
- CSS custom properties (colors, radii)
- Base styles (typography, links)
- Utility classes (squircle shapes)
- Theme definitions (light/dark)

---

## Animations

Animations are powered by **Framer Motion** for smooth, performant transitions.

### When to Animate

✅ **Good use cases:**
- Hero section entrance
- Scroll-triggered reveals
- Hover/tap feedback on interactive elements
- Page transitions
- Success confirmations

❌ **Avoid:**
- Unnecessary decorative animations
- Blocking content loading
- Animations longer than 500ms
- Excessive movement

### Implementation

#### Scroll Animations

Use the `FadeIn` component:

```tsx
import FadeIn from '@/components/FadeIn';

<FadeIn>
  <section>Content fades in when scrolled into view</section>
</FadeIn>
```

#### Custom Animations

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Performance

- **Use `transform` and `opacity`** – GPU-accelerated properties
- **Avoid animating layout** – Don't animate `width`, `height`, `top`, etc.
- **Respect reduced motion** – Check `prefers-reduced-motion` preference

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
>
  Accessible animation
</motion.div>
```

---

## Cookie Consent & Tracking

### Implementation

The template uses an integrated **Analytics component** (`@/components/Analytics.tsx`) that manages:
- Cookie consent banner (GDPR/CCPA compliant)
- Google Analytics (via `@next/third-parties`)
- Meta Pixel tracking
- Consent-based script loading

### Architecture

```
Analytics.tsx
├── CookieConsent (banner UI)
├── Google Analytics (loads only after consent)
└── Meta Pixel (loads only after consent)
```

### Usage in Root Layout

**Always use `Analytics` in the root layout, NOT `CookieConsent` directly:**

```tsx
import Analytics from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SquircleSvgDefs />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### How It Works

1. **User visits site** → Cookie consent banner appears
2. **User accepts** → Consent cookie is set, tracking scripts load
3. **User declines** → No tracking scripts load
4. **Return visit** → If consent exists, scripts load automatically

### Configuration

Set tracking IDs in `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

### Features

- ✅ GDPR/CCPA compliant
- ✅ Scripts blocked until explicit consent
- ✅ Persistent consent state (localStorage)
- ✅ Easy to add new tracking providers
- ✅ Client-side only (no server-side tracking)

### Adding New Tracking Providers

Edit `@/components/Analytics.tsx`:

```tsx
{consent && (
  <>
    {/* Google Analytics */}
    {process.env.NEXT_PUBLIC_GA_ID && (
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    )}

    {/* Meta Pixel */}
    {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
      <MetaPixel id={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
    )}

    {/* Add your tracking here */}
    {process.env.NEXT_PUBLIC_YOUR_TRACKING_ID && (
      <YourTrackingComponent id={process.env.NEXT_PUBLIC_YOUR_TRACKING_ID} />
    )}
  </>
)}
```

### Tracking Pixels

Pre-configured pixel components in `@/components/pixels/`:
- `MetaPixel.tsx` – Facebook/Meta Pixel tracking

To add more pixels:
1. Create component in `components/pixels/`
2. Import in `Analytics.tsx`
3. Add environment variable
4. Conditionally render based on consent

### Cookie Consent Customization

The consent banner is based on **shadcn-cookie-consent**.
Customize in `@/components/CookieConsent.tsx`:
- Text and labels (use i18n message files)
- Styling (Tailwind classes + squircle)
- Consent categories (if needed)
- Accept/decline behavior

---

## Best Practices & Conventions

### SEO

✅ **Do:**
- Use `@/lib/seo.ts` helpers for all metadata
- Provide unique title and description for each page
- Include Open Graph images for social sharing
- Add structured data via `@/lib/jsonld.ts`
- Keep titles under 60 characters
- Keep descriptions between 120-160 characters
- Use semantic HTML headings (H1 → H2 → H3)

❌ **Don't:**
- Duplicate titles across pages
- Leave metadata empty or use defaults
- Inline structured data in components
- Keyword stuff titles or descriptions

### Code Organization

✅ **Do:**
- Keep components under 200 lines
- Extract repeated patterns into utilities
- Use TypeScript for type safety
- Group related files in folders
- Export from index files for clean imports

❌ **Don't:**
- Create "god components" with multiple responsibilities
- Copy-paste code blocks
- Use `any` types
- Mix concerns (UI + business logic)

### Text Management

✅ **Do:**
- All text in `messages/*.json` files
- Use semantic key names (`hero.cta`, not `button1`)
- Include accessibility labels in translations
- Add translator comments when needed

❌ **Don't:**
- Hardcode any user-facing text
- Use technical terms as keys
- Mix languages in the same file
- Forget pluralization rules

### Mobile-First Design

✅ **Do:**
- Design for mobile screens first
- Use responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Test on real devices
- Ensure touch targets are at least 44×44px
- Use relative units (`rem`, `%`, `vh`)

❌ **Don't:**
- Start with desktop and scale down
- Use fixed pixel widths
- Assume mouse hover is available
- Ignore safe areas on notched devices

### Accessibility (a11y)

✅ **Do:**
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- Provide alt text for all images
- Ensure color contrast meets WCAG AA
- Support keyboard navigation
- Include ARIA labels where needed
- Test with screen readers

❌ **Don't:**
- Use `<div>` for interactive elements
- Rely solely on color to convey information
- Trap keyboard focus
- Remove focus indicators

### Performance

✅ **Do:**
- Use Next.js `<Image>` component
- Implement lazy loading for below-fold content
- Optimize images (WebP/AVIF)
- Split code with dynamic imports
- Minimize CSS/JS bundle sizes
- Use static generation when possible

❌ **Don't:**
- Load all images eagerly
- Import entire libraries for one function
- Inline large data in components
- Skip image optimization

---

## File & Folder Structure

```
project/
├── app/
│   ├── [locale]/              # Internationalized routes
│   │   ├── page.tsx           # Homepage
│   │   ├── about/page.tsx     # About page
│   │   └── layout.tsx         # Locale layout
│   ├── sitemap.ts             # Sitemap generator
│   ├── robots.ts              # robots.txt generator
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles
│   └── favicon.ico            # Favicon
│
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── landing/               # Landing page sections
│   ├── pixels/                # Tracking pixels
│   ├── CookieConsent.tsx      # Cookie banner
│   ├── JsonLd.tsx             # Structured data wrapper
│   ├── FadeIn.tsx             # Scroll animations
│   └── SquircleSvgDefs.tsx    # Squircle SVG defs
│
├── lib/
│   ├── meta.ts                # Central metadata config
│   ├── seo.ts                 # SEO metadata builder
│   ├── jsonld.ts              # JSON-LD generators
│   ├── llms.ts                # LLMs.txt builder
│   └── utils.ts               # Utility functions
│
├── messages/
│   ├── en/
│   │   ├── globals.json       # Global UI text
│   │   └── landing.json       # Landing content
│   ├── it/
│   │   └── ...
│   └── es/
│       └── ...
│
├── i18n/
│   ├── routing.ts             # Locale routing config
│   └── request.ts             # Server-side i18n
│
├── scripts/
│   └── generate-llms-txt.ts   # Build-time llms.txt generator
│
├── hooks/
│   └── use-mobile.ts          # Custom React hooks
│
├── public/
│   └── images/                # Static assets
│
├── middleware.ts              # Locale detection
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
├── ARCHITECTURE.md            # This file
└── README.md                  # Project documentation
```

---

## Development Workflow

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure metadata:**
   Edit `lib/meta.ts` with your business information.

3. **Add content:**
   Update message files in `messages/[locale]/`.

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

### Common Tasks

#### Adding a New Page

1. Create page file: `app/[locale]/new-page/page.tsx`
2. Add translations: `messages/[locale]/new-page.json`
3. Update sitemap: Add route to `app/sitemap.ts`
4. Generate metadata: Use `buildMetadata()` helper

#### Adding a New Language

1. Create message folder: `messages/[new-locale]/`
2. Copy and translate JSON files
3. Update `i18n/routing.ts`:
   ```typescript
   locales: ['en', 'it', 'es', 'new-locale']
   ```
4. Rebuild sitemap and metadata

#### Customizing shadcn/ui Components

1. Locate component: `components/ui/[component].tsx`
2. Modify variants or styles
3. Keep changes minimal and reusable
4. Document custom variants

#### Adding Tracking Pixels

1. Create component: `components/pixels/NewPixel.tsx`
2. Add configuration to `lib/meta.ts`
3. Import in root layout
4. Respect cookie consent

---

## Deployment

### Static Export

This template is configured for static export:

```typescript
// next.config.ts
export default {
  output: 'export',
  // ...
}
```

### Build Process

```bash
# Production build
npm run build

# Output directory
out/
```

### Hosting Options

**Recommended platforms:**
- **Vercel** – Zero-config, automatic deployments
- **Netlify** – Drag-and-drop or Git integration
- **Cloudflare Pages** – Global CDN, free tier
- **AWS S3 + CloudFront** – Enterprise-grade hosting

**Requirements:**
- Static hosting (no server-side rendering)
- Support for client-side routing
- HTTPS enabled
- Custom domain support

### Environment Setup

Create `.env.local` for development:

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789

# API Keys (if needed)
NEXT_PUBLIC_API_URL=https://api.example.com
```

Never commit `.env.local` – use platform environment variables for production.

---

## Maintenance & Updates

### Regular Tasks

- **Monthly:** Update dependencies (`npm update`)
- **Quarterly:** Review and update content in message files
- **Bi-annually:** Audit SEO metadata and structured data
- **Annually:** Review and optimize images, remove unused assets

### Monitoring

- **Google Search Console** – Monitor search performance and errors
- **PageSpeed Insights** – Track performance metrics
- **Analytics** – Review traffic and user behavior
- **Uptime monitoring** – Ensure site availability

### Common Issues

| Issue | Solution |
|-------|----------|
| Translations missing | Check message files for all locales |
| Build fails | Check for TypeScript errors with `npm run type-check` |
| Images not optimized | Use Next.js `<Image>` component |
| Metadata not showing | Verify `generateMetadata()` in page.tsx |
| Squircles not working | Include `<SquircleSvgDefs />` in layout |

---

## Template Customization Guide

### For New Projects

When using this template for a new project:

1. **Update `lib/meta.ts`:**
   - Business name, address, VAT
   - Services catalog
   - Social links
   - Contact information

2. **Configure i18n:**
   - Choose required locales
   - Update `i18n/routing.ts`
   - Create message files for each locale

3. **Design system:**
   - Update colors in `app/globals.css`
   - Customize component variants
   - Add brand-specific assets

4. **Content:**
   - Update all message JSON files
   - Add images to `public/images/`
   - Create page components

5. **SEO:**
   - Verify all metadata is unique
   - Generate Open Graph images
   - Submit sitemap to search engines

6. **Tracking:**
   - Configure analytics IDs
   - Set up cookie consent
   - Add required tracking pixels

---

## Support & Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Framer Motion](https://www.framer.com/motion/)
- [llms.txt Protocol](https://llmstxt.org/)

### Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)

### Community

- Next.js Discord
- Tailwind Discord
- GitHub Issues (for this template)

---

**Last Updated:** December 2024  
**Template Version:** 1.0.0