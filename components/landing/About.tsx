import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-8 text-center">
              {t("title")}
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg leading-8 text-muted-foreground text-justify">
                {t("content")}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

