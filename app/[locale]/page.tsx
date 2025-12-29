import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/jsonld";
import { Hero } from "@/components/landing/Hero";
import { Gallery } from "@/components/landing/Gallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";

/**
 * Homepage - Ivo Iuliano Luthier Portfolio
 *
 * Sections:
 * - Hero with introduction
 * - About section
 * - Instruments showcase
 * - Gallery with B&W to color effect
 * - Testimonials from musicians
 * - Contact information
 */

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return buildMetadata({
    title: t("title") + " - " + t("subtitle"),
    description: t("description"),
    locale,
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />

      {/* Main Content */}
      <Hero />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
