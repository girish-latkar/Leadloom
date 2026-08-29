import "server-only";

import {
  getConfiguredSiteKey,
  TURNSTILE_TEST_SITE_KEY,
  type TurnstileMode,
} from "@/lib/turnstileClient";

/** Cloudflare Turnstile dummy secret — always passes in local dev fallback. */
const TURNSTILE_TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

function resolveTurnstileServerMode(): TurnstileMode {
  const siteKey = getConfiguredSiteKey();
  const secretKey = process.env.TURNSTILE_SECRET_KEY?.trim() ?? "";

  if (siteKey && secretKey) return "configured";

  if (siteKey || secretKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[turnstile] Set both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY, or leave both unset for local test keys.",
      );
    }
    return "disabled";
  }

  if (process.env.NODE_ENV === "production") return "disabled";
  return "test";
}

export function getTurnstileSecretKey(): string {
  const mode = resolveTurnstileServerMode();
  if (mode === "configured") return process.env.TURNSTILE_SECRET_KEY!.trim();
  if (mode === "test") return TURNSTILE_TEST_SECRET_KEY;
  return "";
}

/** Whether the API must verify Turnstile tokens before accepting submissions. */
export function isTurnstileServerEnabled(): boolean {
  const mode = resolveTurnstileServerMode();
  if (mode === "disabled") return false;

  const siteKey = mode === "configured" ? getConfiguredSiteKey() : TURNSTILE_TEST_SITE_KEY;
  const secretKey = getTurnstileSecretKey();
  return Boolean(siteKey && secretKey);
}
