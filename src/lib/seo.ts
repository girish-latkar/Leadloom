import type { Metadata } from "next";

import { CONTACT_INFO, FAQ, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/siteUrl";

const OG_IMAGE_PATH = "/images/hero-living-room.png";
const LOGO_PATH = "/logo/logo-light.png";
const OG_IMAGE_WIDTH = 1344;
const OG_IMAGE_HEIGHT = 768;

export function getOgImageUrl(): string {
  return `${getSiteUrl()}${OG_IMAGE_PATH}`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/about` */
  path: string;
}

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const ogImage = getOgImageUrl();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: ogImage, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: `${SITE.name} — interior designer matching in Pune` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function getRootMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const ogImage = getOgImageUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: SITE.title,
      template: `%s — ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [
      "interior designer Pune",
      "home interior design Pune",
      "verified interior designers",
      "interior design leads",
      "Leadloom",
    ],
    authors: [{ name: SITE.name, url: siteUrl }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: siteUrl,
      siteName: SITE.name,
      title: SITE.title,
      description: SITE.description,
      images: [{ url: ogImage, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: `${SITE.name} — interior designer matching in Pune` }],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.title,
      description: SITE.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: OG_IMAGE_PATH, type: "image/png" }],
      apple: OG_IMAGE_PATH,
    },
  };
}

export function getStructuredData() {
  const siteUrl = getSiteUrl();
  const sameAs = SOCIAL_LINKS.map((link) => link.href);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: SITE.name,
    description: SITE.description,
    url: siteUrl,
    logo: `${siteUrl}${LOGO_PATH}`,
    image: getOgImageUrl(),
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Pune",
    },
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE.name,
    description: SITE.description,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-IN",
  };

  return [localBusiness, website];
}

export function getFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
