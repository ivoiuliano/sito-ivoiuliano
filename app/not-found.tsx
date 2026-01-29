import Link from "next/link";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

/**
 * Static 404 page for static export (no headers() or other dynamic APIs).
 * Used when a route doesn't match or when notFound() is called.
 */
export default function NotFound() {
  const homeHref = `/${routing.defaultLocale}`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link
        href={homeHref}
        className="text-primary underline underline-offset-4 hover:no-underline"
      >
        Return home
      </Link>
    </div>
  );
}
