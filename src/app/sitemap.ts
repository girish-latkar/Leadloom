import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/siteUrl";

const ROUTES = ["/", "/about", "/services", "/contact", "/privacy", "/terms", "/disclaimer"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
