import { Metadata } from "next";
import { baseMetadata } from "@/lib/meta";

type BuildMetadataParams = {
  title?: string;
  description?: string;
  locale: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  locale,
  path = "",
}: BuildMetadataParams): Metadata {
  const fullTitle = title
    ? `${title} | ${baseMetadata.siteName}`
    : baseMetadata.title;
  const fullDescription = description || baseMetadata.description;
  const url = `${baseMetadata.url}/${locale}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(baseMetadata.url),
    alternates: {
      canonical: url,
      languages: {
        it: `${baseMetadata.url}/it${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: url,
      siteName: baseMetadata.siteName,
      locale: locale,
      type: "website",
      images: [
        {
          url: baseMetadata.ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      creator: baseMetadata.twitterHandle,
      images: {
        url: baseMetadata.ogImage,
        alt: fullTitle,
      },
    },
    manifest: baseMetadata.manifest,
  };
}
