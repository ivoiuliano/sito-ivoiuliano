/**
 * Blog content utilities (localized)
 *
 * Reads Markdown files from content/blog/[locale] at build time.
 * One .md file per locale = one article in that language. Slug = filename without extension.
 * Frontmatter: title, description, date (YYYY-MM-DD), image (optional)
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { routing } from "@/i18n/routing";

const CONTENT_BASE = path.join(process.cwd(), "content", "blog");

function getContentDir(locale: string): string {
  return path.join(CONTENT_BASE, locale);
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  locale: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

/**
 * Get all blog post slugs for a locale (from filenames in content/blog/[locale]/)
 */
export function getBlogSlugs(locale: string): string[] {
  const dir = getContentDir(locale);
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = fs.readdirSync(dir);
  return files
    .filter(
      (f) => f.endsWith(".md") && !path.basename(f, ".md").startsWith("_"),
    )
    .map((f) => path.basename(f, ".md"));
}

/**
 * Get a single post by slug and locale
 */
export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  const fullPath = path.join(getContentDir(locale), `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    frontmatter: data as BlogPostFrontmatter,
    content,
  };
}

/**
 * Get all posts for a locale, sorted by date (newest first)
 */
export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getBlogSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

/**
 * Union of all slugs across locales (for sitemap / generateStaticParams)
 */
export function getAllBlogSlugs(): string[] {
  const set = new Set<string>();
  for (const locale of routing.locales) {
    for (const slug of getBlogSlugs(locale)) {
      set.add(slug);
    }
  }
  return Array.from(set);
}

/**
 * Locales that have a post for the given slug
 */
export function getLocalesForSlug(slug: string): string[] {
  return routing.locales.filter(
    (locale) => getPostBySlug(slug, locale) !== null,
  );
}
