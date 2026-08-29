import "server-only";

/** Cloudflare Turnstile dummy secret — always passes in local dev fallback. */
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export function getTurnstileSecretKey(): string {
  const configured = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") return "";
  return TURNSTILE_TEST_SECRET_KEY;
}

/** Whether the API must verify Turnstile tokens before accepting submissions. */
export function isTurnstileServerEnabled(): boolean {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";

  if (process.env.NODE_ENV === "production") {
    return Boolean(siteKey && secretKey);
  }

  return Boolean(getTurnstileSecretKey());
}
