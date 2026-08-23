/** Cloudflare Turnstile dummy keys — always pass; work on any hostname in development. */
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

export function getTurnstileSiteKey(): string {
  const productionKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  if (process.env.NODE_ENV === "production") return productionKey;
  return TURNSTILE_TEST_SITE_KEY;
}

export function getTurnstileSecretKey(): string {
  const productionKey = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";
  if (process.env.NODE_ENV === "production") return productionKey;
  return TURNSTILE_TEST_SECRET_KEY;
}

/** Whether forms should show Turnstile and require a token before submit. */
export function isTurnstileEnabled(): boolean {
  if (process.env.NODE_ENV === "production") {
    return Boolean(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() &&
        process.env.TURNSTILE_SECRET_KEY?.trim(),
    );
  }

  return true;
}
