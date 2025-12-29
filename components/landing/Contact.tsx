import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Mail, MapPin, Phone } from "lucide-react";
import { baseMetadata } from "@/lib/meta";
import { Link } from "@/i18n/routing";

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
            {/* <p className="text-lg text-muted-foreground">
              {t("subtitle")}
            </p> */}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto max-w-md space-y-6">
            <Link
              href={`https://maps.google.com/?q=${encodeURIComponent(baseMetadata.business.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center text-center group gap-4"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              {/* <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
                {t("labels.workshop")}
              </h3> */}
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors leading-snug">
                {baseMetadata.business.address}
              </p>
            </Link>

            <Link
              href={`tel:${baseMetadata.business.phone}`}
              className="flex flex-row items-center text-center group gap-4"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              {/* <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
                {t("labels.phone")}
              </h3> */}
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors leading-snug">
                {baseMetadata.business.phone}
              </p>
            </Link>

            <Link
              href={`mailto:${baseMetadata.business.email}`}
              className="flex flex-row items-center text-center group gap-4"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              {/* <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5">
                {t("labels.email")}
              </h3> */}
              <p className="text-sm text-muted-foreground break-all group-hover:text-primary transition-colors leading-snug">
                {baseMetadata.business.email}
              </p>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
