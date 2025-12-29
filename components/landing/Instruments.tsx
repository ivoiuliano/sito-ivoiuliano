import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Music, Music2, Music3, Music4 } from "lucide-react";

export function Instruments() {
  const t = useTranslations("instruments");

  const instruments = [
    {
      icon: Music,
      key: "violin",
    },
    {
      icon: Music2,
      key: "viola",
    },
    {
      icon: Music3,
      key: "cello",
    },
    {
      icon: Music4,
      key: "baroque",
    },
  ];

  return (
    <section id="instruments" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {instruments.map((instrument, index) => {
            const Icon = instrument.icon;
            return (
              <FadeIn key={instrument.key} delay={index * 0.1}>
                <div className="rounded-lg bg-card p-8 shadow-sm border border-border/50 h-full hover:shadow-md transition-shadow">
                  <div className="rounded-md bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t(`${instrument.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${instrument.key}.description`)}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

