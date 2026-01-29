import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",

  // Compression
  compress: true,

  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },

  // Image (unoptimized for static export - no Image Optimization API)
  images: {
    unoptimized: true,
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
