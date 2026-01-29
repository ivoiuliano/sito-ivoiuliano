import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";
import { baseMetadata } from "@/lib/meta";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: baseMetadata.title,
  description: baseMetadata.description,
  metadataBase: new URL(baseMetadata.url),
};

/**
 * Root Layout
 *
 * Global layout that wraps all pages with:
 * - Font configuration
 * - Analytics and cookie consent
 * - Base metadata
 */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  // Get locale from params or use default
  const { locale } = await params;
  const currentLocale = locale || routing.defaultLocale;

  // Enable static rendering (avoid headers() in next-intl)
  setRequestLocale(currentLocale);

  // Get messages for the locale
  const messages = await getMessages({ locale: currentLocale });

  return (
    <html lang={currentLocale} suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={currentLocale} messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/**
 * Generate static params for all supported locales
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
