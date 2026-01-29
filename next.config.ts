import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Compression
  compress: true,

  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },

  // Image optimization (dynamic mode - Next.js Image Optimization API available)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
