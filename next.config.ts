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
};

export default withNextIntl(nextConfig);
