/**
 * LLMs.txt Builder
 *
 * This module builds a standardized, LLM-readable representation of the business
 * following the llms.txt protocol (https://llmstxt.org/).
 *
 * It pulls data from @/lib/meta.ts to provide AI assistants with structured
 * information about the business, services, and site structure.
 */

import { baseMetadata } from "@/lib/meta";
import { routing } from "@/i18n/routing";
import { routes } from "@/lib/routes";

/**
 * Builds the complete llms.txt content
 */
export function buildLlmsTxt(): string {
  const sections = [
    buildHeader(),
    buildBusinessInfo(),
    buildServices(),
    buildSiteStructure(),
    buildContactInfo(),
    buildTechnicalInfo(),
  ];

  return sections.join("\n\n---\n\n");
}

/**
 * Header section with site identification
 */
function buildHeader(): string {
  return `# ${baseMetadata.siteName}

${baseMetadata.description}

Primary URL: ${baseMetadata.url}
Last Updated: ${new Date().toISOString().split("T")[0]}`;
}

/**
 * Business information section
 */
function buildBusinessInfo(): string {
  const { business, luthier } = baseMetadata;

  return `## Business Information

**Legal Name:** ${business.name}
**VAT Number:** ${business.vat}
**Address:** ${business.address}
**Phone:** ${business.phone}
**Email:** ${business.email}

**Luthier:** ${luthier.name}
**Birth Year:** ${luthier.birthYear}
**Birth Place:** ${luthier.birthPlace}
**Training:** ${luthier.training}
**Diploma Year:** ${luthier.diplomaYear}
**Teacher:** ${luthier.teacher}
**Workshop Location:** ${luthier.workshop}
**Specializations:** ${luthier.specialization.join(", ")}`;
}

/**
 * Services section
 */
function buildServices(): string {
  const services = Object.values(baseMetadata.services)
    .map((service) => {
      return `### ${service.name}

**Type:** ${service.serviceType}
**Description:** ${service.description}`;
    })
    .join("\n\n");

  return `## Services Offered

${services}`;
}

/**
 * Site structure with available routes and locales
 */
function buildSiteStructure(): string {
  const locales = routing.locales.join(", ");
  const defaultLocale = routing.defaultLocale;

  // Build routes list from centralized config
  const routesList = routes
    .map((route) => {
      const routePath = route.path || "/";
      const routeTitle = route.title || "Page";
      const routeDesc = route.description || "";
      return `- **${routeTitle}** (${routePath}): ${routeDesc}`;
    })
    .join("\n");

  return `## Site Structure

**Available Languages:** ${locales}
**Default Language:** ${defaultLocale}

**Main Routes:**
${routesList}

**System Routes:**
- Sitemap: ${baseMetadata.url}/sitemap.xml
- Robots: ${baseMetadata.url}/robots.txt
- LLMs: ${baseMetadata.url}/llms.txt

**URL Pattern:**
- Default locale: \`${baseMetadata.url}{route}\`
- Other locales: \`${baseMetadata.url}/{locale}{route}\``;
}

/**
 * Contact information
 */
function buildContactInfo(): string {
  const { social } = baseMetadata;

  return `## Contact Information

**Email:** ${social.email}
**Phone:** ${social.phone}
**Booking/Appointments:** ${baseMetadata.booking}`;
}

/**
 * Technical information about the site
 */
function buildTechnicalInfo(): string {
  return `## Technical Information

**Framework:** Next.js (App Router)
**Generation:** Static Site Generation (SSG)
**Internationalization:** next-intl
**UI Library:** shadcn/ui with Tailwind CSS
**Animation:** Framer Motion

**SEO Features:**
- Dynamic metadata generation
- JSON-LD structured data
- Multilingual sitemap
- Optimized Open Graph tags

**Performance:**
- Static generation for optimal loading times
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Mobile-first responsive design`;
}

/**
 * Optional: Build a JSON representation for programmatic access
 */
export function buildLlmsJson() {
  return {
    site: {
      name: baseMetadata.siteName,
      description: baseMetadata.description,
      url: baseMetadata.url,
      lastUpdated: new Date().toISOString(),
    },
    business: {
      ...baseMetadata.business,
      luthier: baseMetadata.luthier,
    },
    services: baseMetadata.services,
    contact: {
      email: baseMetadata.social.email,
      phone: baseMetadata.social.phone,
      booking: baseMetadata.booking,
    },
    technical: {
      framework: "Next.js",
      generation: "SSG",
      i18n: {
        provider: "next-intl",
        locales: routing.locales,
        defaultLocale: routing.defaultLocale,
      },
    },
  };
}
