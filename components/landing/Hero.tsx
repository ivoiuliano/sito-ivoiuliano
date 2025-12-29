import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { HeroBackground } from "@/components/HeroBackground";

export function Hero() {
  const t = useTranslations("hero");
  const tAbout = useTranslations("about");

  // Hero background images
  const heroImages = [
    "/images/hero/1.webp",
    "/images/hero/2.webp",
    "/images/hero/3.webp",
  ];

  return (
    <section className="relative overflow-hidden py-32 sm:py-40 lg:py-48 dark text-foreground">
      {/* Rotating B&W Background */}
      <HeroBackground images={heroImages} interval={6000} />

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <div className="inline-block rounded-md bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                {t("subtitle")}
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8 text-center">
              {t("title")}
            </h1>

            <div className="prose prose-lg dark:prose-invert mx-auto mt-8">
              <p className="text-lg leading-8 text-center text-white/90 max-w-4xl mx-auto">
                {tAbout("content")}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
