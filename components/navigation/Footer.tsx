import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { baseMetadata } from "@/lib/meta";

export default function Footer() {
  const t = useTranslations("footer");
  const tAria = useTranslations("aria");

  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: t("links.privacy"), href: "/privacy" },
    { name: t("links.terms"), href: "/terms" },
    { name: t("links.cookies"), href: "/cookies" },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-foreground font-bold text-xl tracking-tight">
              {baseMetadata.siteName}
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("tagline")}
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              {t("visitByAppointment")}
            </p>
          </div>

          {/* Legal Column - Aligned to right */}
          <div className="lg:text-right">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {baseMetadata.business.name}.{" "}
              {t("rights")}
            </p>
            <p className="text-xs text-muted-foreground">
              P.IVA: {baseMetadata.business.vat}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
