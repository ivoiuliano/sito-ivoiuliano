import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const locale = (await requestLocale) as Locale;

  // Validate that the incoming `locale` parameter is valid
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  )
    notFound();

  // Load all message files for the locale
  const [globals, landing, blog, privacy, terms, cookiePolicy] =
    await Promise.all([
      import(`@/messages/${locale}/globals.json`),
      import(`@/messages/${locale}/landing.json`),
      import(`@/messages/${locale}/blog.json`),
      import(`@/messages/${locale}/privacy.json`),
      import(`@/messages/${locale}/terms.json`),
      import(`@/messages/${locale}/cookiePolicy.json`),
    ]);

  const messages = {
    ...globals.default,
    ...landing.default,
    blog: blog.default,
    privacy: privacy.default,
    terms: terms.default,
    cookiePolicy: cookiePolicy.default,
  };

  return {
    locale,
    messages,
  };
});
