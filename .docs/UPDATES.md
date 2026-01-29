# Latest Updates

## Changes Made (December 2024)

### ✅ Font Updates
**Replaced Geist fonts with:**
- **Playfair Display** → Titoli (H1-H6)
- **Inter** → Testi/Body

**Files Modified:**
- `app/layout.tsx` - Updated font imports and variables
- `app/globals.css` - Updated CSS variables and font assignments

### ✅ No Hardcoded Text
**Removed all hardcoded "Ivo Iuliano" text and replaced with `baseMetadata` imports:**

**Files Modified:**
- `components/navigation/Header.tsx` - Logo now uses `baseMetadata.siteName`
- `components/navigation/Footer.tsx` - Brand name uses `baseMetadata.siteName`
- `components/landing/Gallery.tsx` - Alt texts use `baseMetadata.luthier.name`

**Why:** This ensures consistency across the site and makes it easier to update the name in one place (`lib/meta.ts`) if needed.

### Font Implementation Details

#### Typography Scale
- **Headings (H1-H6)**: Playfair Display (serif, elegant, for titles)
- **Body Text**: Inter (sans-serif, clean, readable)
- **All fonts**: Loaded from Google Fonts with `display: swap` for better performance

#### CSS Variables
```css
--font-playfair → Playfair Display
--font-inter → Inter
```

#### Usage in Tailwind
- `font-serif` → Playfair Display (for headings)
- `font-sans` → Inter (for body text)

### Testing Checklist

After these changes, please verify:
- [ ] All headings display in Playfair Display
- [ ] Body text displays in Inter
- [ ] Logo shows correct name from metadata
- [ ] Footer shows correct brand name
- [ ] Gallery images have correct alt text
- [ ] Fonts load correctly in both light and dark mode
- [ ] No console errors related to fonts

### How to Update Site Name

To change the site name across the entire site, edit one file:

**`lib/meta.ts`**
```typescript
export const baseMetadata = {
  siteName: "Ivo Iuliano", // Change here
  // ... rest of config
}
```

This will automatically update:
- Header logo
- Footer brand
- Gallery image alt texts
- All metadata
- All structured data

### Font Notes

**Playfair Display** is a transitional serif typeface perfect for:
- Elegant, classic aesthetic
- High-end craftsmanship presentation
- Traditional yet modern feel
- Excellent readability at large sizes

**Inter** is a modern sans-serif perfect for:
- Body text and UI elements
- High legibility on screens
- Professional, clean appearance
- Works well with Playfair Display

The combination creates a sophisticated, professional look ideal for a master luthier's portfolio.

