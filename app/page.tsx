import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root Page
 * 
 * Redirects to the default locale.
 * All actual content is in app/[locale]/page.tsx
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}

