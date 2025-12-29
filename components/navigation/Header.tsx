"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { baseMetadata } from "@/lib/meta";
import { cn } from "@/lib/utils";

/**
 * Header Component
 *
 * Main navigation header with:
 * - Responsive design (mobile menu)
 * - Locale-aware navigation
 * - Accessibility features
 */
export default function Header() {
    const t = useTranslations("nav");
    const tAria = useTranslations("aria");
    const tCta = useTranslations("cta");
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: t("home"), href: "/" },
        { name: t("gallery"), href: "#gallery" },
        { name: t("testimonials"), href: "#testimonials" },
        { name: t("contact"), href: "#contact" },
    ];

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                aria-label={tAria("mainNavigation")}
            >
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <div className="text-foreground font-bold text-xl tracking-tight">
                            {baseMetadata.siteName}
                        </div>
                    </Link>
                </div>

                {/* Mobile menu button, language & theme toggle */}
                <div className="flex lg:hidden gap-2 items-center">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={
                            mobileMenuOpen ? tAria("closeMenu") : tAria("toggleMenu")
                        }
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-semibold leading-6 transition-colors hover:text-primary",
                                isActive(item.href)
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Language, Theme Toggle & CTA Button */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-2 lg:items-center">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <Button asChild className="rounded-md">
                        <Link href="#contact">{tCta("contactUs")}</Link>
                    </Button>
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                                    isActive(item.href)
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4">
                            <Button asChild className="w-full rounded-md">
                                <Link href="#contact">{tCta("contactUs")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

