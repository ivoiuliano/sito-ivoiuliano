import { baseMetadata } from "./meta";

// Types for JSON-LD
export type JsonLdObject = {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: string | JsonLdObject | JsonLdObject[] | object | undefined;
};

// Organization (Luthier - ProfessionalService)
export const getOrganizationSchema = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${baseMetadata.url}/#organization`,
  name: baseMetadata.siteName,
  url: baseMetadata.url,
  logo: `${baseMetadata.url}/logo.png`,
  description: baseMetadata.description,
  founder: {
    "@type": "Person",
    name: baseMetadata.luthier.name,
    url: `${baseMetadata.url}/#luthier`,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Prato, 50",
    addressLocality: "Rovereto",
    addressRegion: "Trento",
    postalCode: "38068",
    addressCountry: "IT",
  },
  telephone: baseMetadata.business.phone,
  email: baseMetadata.business.email,
  areaServed: "Worldwide",
});

// Person (Luthier)
export const getPersonSchema = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseMetadata.url}/#luthier`,
  name: baseMetadata.luthier.name,
  jobTitle: "Master Luthier",
  url: baseMetadata.url,
  worksFor: {
    "@id": `${baseMetadata.url}/#organization`,
  },
  birthPlace: baseMetadata.luthier.birthPlace,
  alumniOf: baseMetadata.luthier.training,
  knowsAbout: baseMetadata.luthier.specialization,
});

// WebSite
export const getWebSiteSchema = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseMetadata.url}/#website`,
  url: baseMetadata.url,
  name: baseMetadata.siteName,
  publisher: {
    "@id": `${baseMetadata.url}/#organization`,
  },
});

// WebPage (Generic or Home)
export const getWebPageSchema = (
  url: string,
  title: string,
  description: string
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}/#webpage`,
  url: url,
  name: title,
  description: description,
  isPartOf: {
    "@id": `${baseMetadata.url}/#website`,
  },
  about: {
    "@id": `${baseMetadata.url}/#organization`,
  },
});

// Service - Lutherie Services
export const getServiceSchema = (serviceKey: keyof typeof baseMetadata.services): JsonLdObject => {
  const service = baseMetadata.services[serviceKey];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseMetadata.url}/#${serviceKey}-service`,
    name: service.name,
    provider: {
      "@id": `${baseMetadata.url}/#organization`,
    },
    areaServed: "Worldwide",
    description: service.description,
    serviceType: service.serviceType,
  };
};

// BlogPosting
export const getBlogPostingSchema = (
  url: string,
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate?: string,
  image?: string
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${url}/#article`,
  headline: title,
  description: description,
  author: {
    "@id": `${baseMetadata.url}/#manuel`,
  },
  publisher: {
    "@id": `${baseMetadata.url}/#organization`,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": url,
  },
  datePublished: publishedDate,
  dateModified: modifiedDate || publishedDate,
  image: image
    ? image.startsWith("http")
      ? image
      : `${baseMetadata.url}${image}`
    : undefined,
});

// FAQPage
export const getFAQPageSchema = (
  faqs: Array<{ question: string; answer: string }>
): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
