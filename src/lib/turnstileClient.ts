/** Cloudflare Turnstile dummy site key — always passes; shows a dev-only test banner. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export function getTurnstileSiteKey(): string {
  const configured = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") return "";
  return TURNSTILE_TEST_SITE_KEY;
}

/** True when the dummy Cloudflare test key is in use (local dev fallback only). */
export function isTurnstileTestMode(): boolean {
  return getTurnstileSiteKey() === TURNSTILE_TEST_SITE_KEY;
}

/** Whether the browser should render Turnstile. */
export function isTurnstileClientEnabled(): boolean {
  return Boolean(getTurnstileSiteKey());
}
