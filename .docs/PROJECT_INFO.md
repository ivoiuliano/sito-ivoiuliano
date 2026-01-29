# Ivo Iuliano - Master Luthier Website

Portfolio website for Ivo Iuliano, master luthier based in Rovereto, Italy.

## About

This is a professional portfolio website showcasing the handcrafted string instruments made by Ivo Iuliano, including violins, violas, cellos, and baroque instruments.

## Features

- ✅ **Bilingual**: Full Italian and English support
- ✅ **Single Page Design**: All content on one scrollable page with navigation
- ✅ **Image Gallery**: B&W to color effect on hover with subtle zoom
- ✅ **Testimonials**: Quotes from professional musicians worldwide
- ✅ **Responsive Design**: Optimized for all devices
- ✅ **SEO Optimized**: Complete metadata and structured data
- ✅ **Dark/Light Mode**: Theme switching support
- ✅ **Accessibility**: ARIA labels and semantic HTML

## Sections

1. **Hero** - Main introduction with CTA
2. **About** - Biography and training background
3. **Instruments** - Types of instruments crafted
4. **Gallery** - Visual showcase with B&W hover effect
5. **Testimonials** - Reviews from professional musicians
6. **Contact** - Workshop location and contact information

## Tech Stack

- **Framework**: Next.js 15+ (Static Export)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Typography**: Playfair Display (headings) & Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

Deploy is on Vercel; each push to the connected branch triggers a new deploy.

## TODO Before Launch

### Required

- [ ] Add professional photos of instruments to `/public/images/gallery/`
- [ ] Add logo or update brand identity in Header/Footer
- [ ] Add Open Graph image (`/public/images/og-image.jpg`)
- [ ] Configure analytics IDs in environment variables (optional)
- [ ] Test on multiple devices and browsers
- [ ] Verify all translations are accurate
- [ ] Add more testimonials if available

### Optional

- [ ] Add video content (workshop tour, instrument making process)
- [ ] Add blog section for news/updates
- [ ] Add online booking system for workshop visits
- [ ] Add price list or inquiry form

## Content Management

### Adding Images

Place images in `/public/images/gallery/` following the naming convention:
- `violin-1.jpg`, `violin-2.jpg`, etc.
- `viola-1.jpg`, `viola-2.jpg`, etc.
- `cello-1.jpg`
- `workshop-1.jpg`
- `instrument-detail-1.jpg`
- `baroque-1.jpg`

Images should be:
- Square aspect ratio (1:1)
- At least 1200x1200px
- High quality JPG or WebP

### Updating Translations

Edit the JSON files in:
- `/messages/en/` - English content
- `/messages/it/` - Italian content

### Updating Business Info

Edit `/lib/meta.ts` to update:
- Contact information
- Business details
- Services offered

## Deployment

Deploy on **Vercel**. Push to the connected branch to trigger a new deploy.

### Environment Variables

Create `.env.local` for analytics (optional):

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
```

## Design Notes

- **No squircle effects**: Using standard rounded corners (rounded-md, rounded-lg)
- **Clean aesthetic**: Minimalist design to highlight craftsmanship
- **B&W to color**: Gallery images start grayscale, color on hover with zoom
- **Professional typography**: 
  - **Playfair Display** for elegant, classic headings
  - **Inter** for clean, readable body text
- **No hardcoded text**: All site name references use `baseMetadata` from `lib/meta.ts`

## Contact

- **Website**: https://www.ivoiuliano.it
- **Email**: info@ivoiuliano.it
- **Phone**: +39 3496739825
- **Address**: Via Prato, 50 - 38068 Rovereto (TN) - Italy

## License

© 2025 Ivo Iuliano - P.IVA: IT 01866260225

