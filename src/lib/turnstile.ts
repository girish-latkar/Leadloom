const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

/** Hostnames where Cloudflare Turnstile accepts the widget during local development. */
const DEV_TURNSTILE_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

export function getTurnstileSiteKey(): string {
  return SITE_KEY;
}

export function isTurnstileConfigured(): boolean {
  return SITE_KEY.length > 0;
}

export function isTurnstileHostnameSupported(hostname: string): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return DEV_TURNSTILE_HOSTNAMES.has(hostname);
}

/** Whether the Turnstile widget should load in the current browser context. */
export function isTurnstileActive(hostname?: string): boolean {
  if (!isTurnstileConfigured()) return false;
  if (process.env.NODE_ENV === "production") return true;

  const resolvedHostname =
    hostname ?? (typeof window !== "undefined" ? window.location.hostname : undefined);

  if (!resolvedHostname) return false;

  return isTurnstileHostnameSupported(resolvedHostname);
}
