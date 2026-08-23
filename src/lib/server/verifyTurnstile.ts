import "server-only";

import { isTurnstileConfigured } from "@/lib/server/emailConfig";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp: string | null,
): Promise<{ ok: true } | { ok: false }> {
  if (!isTurnstileConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] Turnstile is not configured in production.");
      return { ok: false };
    }

    console.warn("[turnstile] Turnstile not configured — skipping verification in development.");
    return { ok: true };
  }

  if (typeof token !== "string" || !token.trim()) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[turnstile] No token in development — skipping verification.");
      return { ok: true };
    }

    return { ok: false };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!.trim();

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
