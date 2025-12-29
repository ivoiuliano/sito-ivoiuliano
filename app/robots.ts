import { MetadataRoute } from "next";
import { baseMetadata } from "@/lib/meta";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseMetadata.url}/sitemap.xml`,
  };
}
