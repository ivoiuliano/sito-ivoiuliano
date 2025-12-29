import { MetadataRoute } from "next";
import { baseMetadata } from "@/lib/meta";
import { routing } from "@/i18n/routing";
import { routes } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each route
  for (const route of routes) {
    // Default locale URL (without prefix)
    const defaultUrl = `${baseMetadata.url}${route.path}`;

    // Build alternates for all locales
    const alternates = {
      languages: {} as Record<string, string>,
    };

    for (const locale of routing.locales) {
      // Other locales use URL with prefix
      alternates.languages[
        locale
      ] = `${baseMetadata.url}/${locale}${route.path}`;
    }

    // Add entry with default URL and all alternates
    sitemapEntries.push({
      url: defaultUrl,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates,
    });
  }

  return sitemapEntries;
}
