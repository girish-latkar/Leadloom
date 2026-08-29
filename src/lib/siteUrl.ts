const PRODUCTION_SITE_URL = "https://leadloom.in";

/** Canonical site origin for metadata, sitemap, and structured data. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return PRODUCTION_SITE_URL;
}
