import { MetadataRoute } from "next";
import { baseMetadata } from "@/lib/meta";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseMetadata.url}/sitemap.xml`,
  };
}
