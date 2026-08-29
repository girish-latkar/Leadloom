import "server-only";

import { getTurnstileSecretKey, isTurnstileServerEnabled } from "@/lib/server/turnstileServer";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string | null,
): Promise<{ ok: true } | { ok: false }> {
  if (!isTurnstileServerEnabled()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] Turnstile is not configured in production.");
      return { ok: false };
    }

    return { ok: true };
  }

  if (typeof token !== "string" || !token.trim()) {
    return { ok: false };
  }

  const secret = getTurnstileSecretKey();
  if (!secret) {
    console.error("[turnstile] Secret key is missing.");
    return { ok: false };
  }

  const body = new URLSearchParams({
    secret,
    response: token.trim(),
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[turnstile] Verification request failed.", response.status);
      return { ok: false };
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (!result.success) {
      console.error("[turnstile] Verification rejected.", result["error-codes"]?.join(", "));
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("[turnstile] Verification error.", error);
    return { ok: false };
  }
}
