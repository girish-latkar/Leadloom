/** Cloudflare Turnstile dummy site key — always passes; shows a dev-only test banner. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export type TurnstileMode = "configured" | "test" | "disabled";

export function getConfiguredSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

/** Hostnames where production Turnstile keys are not valid (use Cloudflare test keys). */
export function isLocalTurnstileHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false;

  const host = hostname.split(":")[0]?.toLowerCase();
  return host === "localhost" || host === "127.0.0.1";
}

export function shouldUseTurnstileTestKeys(hostname?: string | null): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return isLocalTurnstileHost(hostname);
}

/** Client-safe mode resolution (secret key is not available in the browser). */
export function resolveTurnstileClientMode(hostname?: string | null): TurnstileMode {
  if (shouldUseTurnstileTestKeys(hostname)) return "test";
  if (getConfiguredSiteKey()) return "configured";
  if (process.env.NODE_ENV === "production") return "disabled";
  return "test";
}

export function getTurnstileSiteKey(hostname?: string | null): string {
  const mode = resolveTurnstileClientMode(hostname);
  if (mode === "configured") return getConfiguredSiteKey();
  if (mode === "test") return TURNSTILE_TEST_SITE_KEY;
  return "";
}

/** True when the dummy Cloudflare test key is in use (local dev fallback only). */
export function isTurnstileTestMode(hostname?: string | null): boolean {
  return resolveTurnstileClientMode(hostname) === "test";
}

/** Whether the browser should render Turnstile. */
export function isTurnstileClientEnabled(hostname?: string | null): boolean {
  return resolveTurnstileClientMode(hostname) !== "disabled";
}
