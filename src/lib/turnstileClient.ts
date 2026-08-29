/** Cloudflare Turnstile dummy site key — always passes; shows a dev-only test banner. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export type TurnstileMode = "configured" | "test" | "disabled";

export function getConfiguredSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

/** Client-safe mode resolution (secret key is not available in the browser). */
export function resolveTurnstileClientMode(): TurnstileMode {
  if (getConfiguredSiteKey()) return "configured";
  if (process.env.NODE_ENV === "production") return "disabled";
  return "test";
}

export function getTurnstileSiteKey(): string {
  const mode = resolveTurnstileClientMode();
  if (mode === "configured") return getConfiguredSiteKey();
  if (mode === "test") return TURNSTILE_TEST_SITE_KEY;
  return "";
}

/** True when the dummy Cloudflare test key is in use (local dev fallback only). */
export function isTurnstileTestMode(): boolean {
  return resolveTurnstileClientMode() === "test";
}

/** Whether the browser should render Turnstile. */
export function isTurnstileClientEnabled(): boolean {
  return resolveTurnstileClientMode() !== "disabled";
}
