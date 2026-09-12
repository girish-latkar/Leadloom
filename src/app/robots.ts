import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getSiteUrl, isIndexableHost } from "@/lib/siteUrl";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();
  const headersList = await headers();
  const host = headersList.get("host");
  const indexable = isIndexableHost(host);

  if (!indexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
