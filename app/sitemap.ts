import { MetadataRoute } from "next";
import { baseMetadata } from "@/lib/meta";
import { routing } from "@/i18n/routing";
import { routes } from "@/lib/routes";
import { getAllBlogSlugs, getLocalesForSlug, getPostBySlug } from "@/lib/blog";

export const dynamic = "force-static";

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
      alternates.languages[locale] =
        `${baseMetadata.url}/${locale}${route.path}`;
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

  // Blog posts (dynamic entries, localized)
  const slugs = getAllBlogSlugs();
  for (const slug of slugs) {
    const locales = getLocalesForSlug(slug);
    const post = getPostBySlug(slug, locales[0]);
    if (!post) continue;
    const path = `/blog/${slug}`;
    const defaultUrl = `${baseMetadata.url}/${routing.defaultLocale}${path}`;
    const alternates = {
      languages: {} as Record<string, string>,
    };
    for (const locale of locales) {
      alternates.languages[locale] = `${baseMetadata.url}/${locale}${path}`;
    }
    sitemapEntries.push({
      url: defaultUrl,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates,
    });
  }

  return sitemapEntries;
}
