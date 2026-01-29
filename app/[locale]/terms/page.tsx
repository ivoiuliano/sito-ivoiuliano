import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebPageSchema,
} from "@/lib/jsonld";
import { baseMetadata } from "@/lib/meta";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/terms",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });
  const pageUrl = `${baseMetadata.url}/${locale}/terms`;
  const sectionOrder = (t.raw("sectionOrder") as string[]) ?? [];

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />
      <JsonLd
        data={getWebPageSchema(
          pageUrl,
          t("title"),
          t("description"),
        )}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("lastUpdated")}: January 2025
          </p>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">{t("intro")}</p>

          <div className="mt-10 space-y-8">
            {sectionOrder.map((key) => (
              <section key={key} className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
