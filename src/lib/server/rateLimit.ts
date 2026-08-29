import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { isRateLimitConfigured } from "@/lib/server/emailConfig";

const GENERIC_ERROR = "Unable to submit your registration right now. Please try again.";

let ratelimit: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  if (!isRateLimitConfigured()) return null;

  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "leadloom:registration",
    });
  }

  return ratelimit;
}

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function enforceRegistrationRateLimit(
  request: Request,
): Promise<{ ok: true } | { ok: false; message: string; retryAfter?: number }> {
  const limiter = getRateLimiter();

  if (!limiter) {
    if (process.env.NODE_ENV === "production" && !isRateLimitConfigured()) {
      console.error("[rate-limit] Upstash is not configured in production.");
      return { ok: false, message: GENERIC_ERROR };
    }
    return { ok: true };
  }

  const identifier = getClientIdentifier(request);
  const result = await limiter.limit(identifier);

  if (!result.success) {
    console.warn("[rate-limit] Registration request blocked.");
    return {
      ok: false,
      message: GENERIC_ERROR,
      retryAfter: Math.max(0, result.reset - Date.now()),
    };
  }

  return { ok: true };
}

export { GENERIC_ERROR };
