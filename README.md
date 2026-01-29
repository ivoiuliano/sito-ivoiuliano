# Static Next.js Template

A production-ready Next.js template for building modern marketing and content websites with internationalization, SEO optimization, and a beautiful squircle design system.

## ✨ Features

- 🌍 **Multi-language** - Full i18n support with next-intl
- 🚀 **SEO Optimized** - Metadata, JSON-LD, sitemap, robots.txt
- 🤖 **AI-Ready** - llms.txt protocol for AI assistants
- 🎨 **Modern Design** - Squircle design system with Tailwind CSS
- 📱 **Responsive** - Mobile-first, fully responsive
- ♿ **Accessible** - WCAG AA compliant
- 🍪 **GDPR Compliant** - Cookie consent management
- ⚡ **High Performance** - Static generation for optimal speed
- 🔒 **Type-Safe** - TypeScript strict mode

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Site

Edit `lib/meta.ts` with your business information:

```typescript
export const baseMetadata = {
  siteName: "Your Business Name",
  title: "Your Site Title",
  description: "Your site description",
  url: "https://yourdomain.com",
  business: {
    name: "Legal Business Name",
    vat: "VAT123456",
    address: "Your Address",
  },
  // ... more configuration
};
```

### 3. Add Content

Update translation files in `messages/[locale]/`:
- `globals.json` - Navigation, footer, common UI
- `landing.json` - Homepage content
- Create new files for additional pages

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── services/      # Services page
│   │   └── contact/       # Contact page
│   ├── sitemap.ts         # Sitemap generator
│   ├── robots.ts          # Robots.txt
│   └── layout.tsx         # Root layout
│
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── navigation/        # Header & Footer
│   ├── CookieConsent.tsx  # Cookie banner
│   └── SquircleSvgDefs.tsx # Squircle SVG definitions
│
├── lib/
│   ├── meta.ts            # Site configuration
│   ├── seo.ts             # SEO metadata builder
│   ├── jsonld.ts          # Structured data
│   ├── llms.ts            # LLMs.txt builder
│   └── utils.ts           # Utilities
│
├── messages/
│   ├── en/                # English translations
│   └── it/                # Italian translations
│
└── i18n/
    └── routing.ts         # Locale configuration
```

## 🌍 Internationalization

### Add a New Language

1. **Create message folder:**
   ```bash
   mkdir messages/es
   ```

2. **Copy and translate files:**
   ```bash
   cp messages/en/*.json messages/es/
   # Edit messages/es/*.json with Spanish translations
   ```

3. **Update routing config** (`i18n/routing.ts`):
   ```typescript
   locales: ['en', 'it', 'es']
   ```

### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('landing.hero');
  
  return <h1>{t('title')}</h1>;
}
```

## 🎨 Squircle Design System

The template uses squircles (smooth continuous curves) instead of standard border-radius.

### CSS Classes

```tsx
<div className="squircle-lg">       {/* Large squircle */}
<button className="squircle">       {/* Default squircle */}
<img className="squircle-img" />    {/* Squircle image */}
```

### Sizes

- `squircle-sm` - Small
- `squircle` - Default
- `squircle-lg` - Large
- `squircle-xl` - Extra large
- `squircle-2xl` - 2XL

### Helpers

- `squircle-img` - Images with squircle mask
- `squircle-shadow` - Squircle + shadow
- `squircle-interactive` - Interactive elements with hover

## 📄 Adding New Pages

1. **Create page file:**
   ```bash
   mkdir app/[locale]/new-page
   touch app/[locale]/new-page/page.tsx
   ```

2. **Add metadata and content:**
   ```tsx
   import { buildMetadata } from '@/lib/seo';
   
   export async function generateMetadata({ params }) {
     return buildMetadata({
       title: 'Page Title',
       description: 'Page description',
       locale: params.locale,
       path: '/new-page',
     });
   }
   
   export default function NewPage() {
     return <div>Content</div>;
   }
   ```

3. **Add translations** to `messages/[locale]/new-page.json`

4. **Update sitemap** in `app/sitemap.ts`

5. **Add to navigation** (optional) in `components/navigation/Header.tsx`

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

### Metadata

All metadata is centralized in `lib/meta.ts`. Update once, use everywhere:
- SEO tags
- JSON-LD structured data
- LLMs.txt
- Social links
- Business info

## 📊 SEO

### Metadata

Every page automatically includes:
- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Alternate language links

### Structured Data

Add JSON-LD to pages:

```tsx
import JsonLd from '@/components/JsonLd';
import { getOrganizationJsonLd } from '@/lib/jsonld';

<JsonLd data={getOrganizationJsonLd()} />
```

### Sitemap

Automatically generated at `/sitemap.xml` including all locales.

## 🤖 AI Integration

The template implements the [llms.txt protocol](https://llmstxt.org/).

AI assistants can access `/llms.txt` to get structured information about your business, services, and site structure.

## 🚀 Deployment

### Deploy (Vercel)

Il deploy è su Vercel. Collega il repository Git a Vercel; ogni push sul branch connesso (es. `main`) farà un nuovo deploy in automatico.

**1. Push del codice su Git**

Assicurati che il progetto sia su GitHub, GitLab o Bitbucket.

**2. Importa il progetto su Vercel**

- Vai su [vercel.com](https://vercel.com) e accedi
- **Add New…** → **Project**
- Importa il repository del sito
- Vercel imposta automaticamente **Framework Preset: Next.js** e **Build Command: `npm run build`** (esegue anche `prebuild` → genera `llms.txt`)

**3. Variabili d’ambiente (opzionale)**

Se usi analytics, in **Settings → Environment Variables** aggiungi:

- `NEXT_PUBLIC_GA_ID` – Google Analytics
- `NEXT_PUBLIC_META_PIXEL_ID` – Meta Pixel

**4. Deploy**

Clicca **Deploy**. Ogni push sul branch connesso (es. `main`) farà un nuovo deploy.

**Dominio:** in **Settings → Domains** puoi collegare un dominio personalizzato (es. `www.ivoiuliano.it`).

## 📚 Documentation

- **ARCHITECTURE.md** - Complete architecture guide
- **AGENTS.md** - AI agent guidelines and best practices

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## 🎯 Best Practices

✅ **Do:**
- All text in `messages/*.json`
- Use `squircle-*` classes
- Generate metadata with `buildMetadata()`
- Add structured data via `lib/jsonld.ts`
- Keep components under 200 lines
- Mobile-first design
- Test accessibility

❌ **Don't:**
- Hardcode user-facing text
- Use standard `rounded-*` classes
- Inline JSON-LD in components
- Modify `components/ui/*` directly
- Use `any` types
- Skip TypeScript types

## 📝 License

MIT License - Use freely for any project

## 🤝 Contributing

Contributions welcome! Please follow the guidelines in `AGENTS.md`.

## 📧 Support

For issues and questions, please open a GitHub issue.

---

**Template Version:** 1.0.0  
**Last Updated:** December 2024
