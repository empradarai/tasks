import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/lib/site";

const siteUrl = () => getSiteUrl();

export function buildLandingMetadata(): Metadata {
  const url = siteUrl();

  return {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name, url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "productivity",
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.shortDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.shortDescription,
      ...(siteConfig.twitterHandle
        ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
        : {}),
    },
    other: {
      "apple-mobile-web-app-title": siteConfig.name,
    },
  };
}

export function buildLandingJsonLd() {
  const url = siteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url,
      description: siteConfig.description,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url,
      description: siteConfig.shortDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free Starter plan",
      },
      description: siteConfig.description,
      url,
    },
  ];
}
