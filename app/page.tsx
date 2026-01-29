"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root Page
 *
 * Redirects to the default locale on the client. All actual content is in app/[locale]/page.tsx.
 */
export default function RootPage() {
  const router = useRouter();
  const target = `/${routing.defaultLocale}`;

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <p className="text-muted-foreground">
        Redirecting to <a href={target} className="text-primary underline">{target}</a>…
      </p>
    </div>
  );
}
