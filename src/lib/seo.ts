import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: "/brand/fairhelm-og.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — governed software systems`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/fairhelm-og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
