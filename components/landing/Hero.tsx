import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { HeroBackground } from "@/components/HeroBackground";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  // Hero background images
  const heroImages = [
    "/images/hero/1.webp",
    "/images/hero/2.webp",
    "/images/hero/3.webp",
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40 dark text-foreground">
      {/* Rotating B&W Background */}
      <HeroBackground images={heroImages} interval={6000} />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-md bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              {t("subtitle")}
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8">
              {t("title")}
            </h1>
            <p className="text-xl leading-8 text-white/80 mb-12 max-w-2xl mx-auto">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-md group bg-white text-black hover:bg-white/90">
                <Link href="#gallery">
                  {t("cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-md border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#contact">{t("cta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

