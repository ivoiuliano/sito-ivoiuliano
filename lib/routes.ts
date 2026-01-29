/**
 * Centralized Routes Configuration
 *
 * Single source of truth for all routes in the application.
 * Used by:
 * - Sitemap generation (app/sitemap.ts)
 * - LLMs.txt (lib/llms.ts)
 * - Navigation components
 */

export interface RouteConfig {
  /** Route path (without locale prefix) */
  path: string;
  /** SEO priority (0.0 to 1.0) */
  priority: number;
  /** How frequently the content changes */
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** Human-readable title for the route */
  title?: string;
  /** Short description of the route */
  description?: string;
}

/**
 * All static routes in the application
 */
export const routes: RouteConfig[] = [
  {
    path: "",
    priority: 1.0,
    changeFrequency: "weekly",
    title: "Home",
    description:
      "Ivo Iuliano - Master Luthier - Handcrafted violins, violas, cellos and baroque instruments",
  },
  {
    path: "/blog",
    priority: 0.8,
    changeFrequency: "weekly",
    title: "Blog",
    description: "Articles and news from the workshop",
  },
  {
    path: "/privacy",
    priority: 0.5,
    changeFrequency: "yearly",
    title: "Privacy Policy",
    description: "Privacy policy and personal data processing",
  },
  {
    path: "/terms",
    priority: 0.5,
    changeFrequency: "yearly",
    title: "Terms of Service",
    description: "Terms and conditions of use of the website",
  },
  {
    path: "/cookies",
    priority: 0.5,
    changeFrequency: "yearly",
    title: "Cookie Policy",
    description: "Information on the use of cookies",
  },
];

/**
 * Get route by path
 */
export function getRouteByPath(path: string): RouteConfig | undefined {
  return routes.find((route) => route.path === path);
}

/**
 * Get all route paths
 */
export function getAllRoutePaths(): string[] {
  return routes.map((route) => route.path);
}

/**
 * Get routes filtered by priority
 */
export function getRoutesByPriority(minPriority: number = 0.5): RouteConfig[] {
  return routes.filter((route) => route.priority >= minPriority);
}
