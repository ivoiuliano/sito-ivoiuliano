import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";
import { baseMetadata } from "@/lib/meta";
import { Button } from "@/components/ui/button";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-20 sm:py-32 bg-muted/30">
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

        <FadeIn delay={0.2}>
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-card p-10 sm:p-12 shadow-lg border border-border">
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    {t("labels.workshop")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {baseMetadata.business.address}
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    {t("labels.phone")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {baseMetadata.business.phone}
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    {t("labels.email")}
                  </h3>
                  <p className="text-sm text-muted-foreground break-all">
                    {baseMetadata.business.email}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button asChild size="lg" className="rounded-md w-full sm:w-auto min-w-[280px]">
                  <a href={`mailto:${baseMetadata.business.email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    {t("subtitle")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
