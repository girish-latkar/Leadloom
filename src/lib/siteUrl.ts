/**
 * Default production origin when no env override is set.
 * Set NEXT_PUBLIC_SITE_URL in deployment env to the live origin.
 */
const PRODUCTION_SITE_URL = "https://leadloom.in";

/** Canonical site origin for metadata, sitemap, robots, and structured data. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");

  return PRODUCTION_SITE_URL;
}

/** True when the request host matches the configured production origin (indexable). */
export function isIndexableHost(host: string | null | undefined): boolean {
  if (!host) return false;

  const productionHost = new URL(getSiteUrl()).host.toLowerCase();
  const requestHost = host.toLowerCase().replace(/:\d+$/, "");

  return requestHost === productionHost;
}
