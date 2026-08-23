import "server-only";

import { sanitizeHeaderValue } from "@/lib/server/escapeHtml";
import { isTurnstileEnabled } from "@/lib/turnstileConfig";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export interface RegistrationEmailConfig extends SmtpConfig {
  toEmail: string;
  fromEmail: string;
  fromName: string;
}

function parseFromAddress(raw: string): { fromName: string; fromEmail: string } {
  const trimmed = raw.trim();
  const match = trimmed.match(/^(.+?)\s*<([^>]+)>$/);

  if (match) {
    return {
      fromName: sanitizeHeaderValue(match[1]),
      fromEmail: sanitizeHeaderValue(match[2]),
    };
  }

  return {
    fromName: "Website Registration",
    fromEmail: sanitizeHeaderValue(trimmed),
  };
}

function parseSecureFlag(raw: string | undefined): boolean {
  const normalized = raw?.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

export function getRegistrationEmailConfig(): RegistrationEmailConfig {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.trim();
  const toEmail =
    process.env.REGISTRATION_TO_EMAIL?.trim() ?? process.env.REGISTRATION_EMAIL?.trim();
  const fromRaw = process.env.REGISTRATION_FROM_EMAIL?.trim();

  if (!host || !portRaw || !user || !password || !toEmail || !fromRaw) {
    throw new Error("Registration email delivery is not configured.");
  }

  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    throw new Error("Registration email delivery is not configured.");
  }

  const { fromName, fromEmail } = parseFromAddress(fromRaw);

  if (!fromEmail.includes("@")) {
    throw new Error("Registration email delivery is not configured.");
  }

  return {
    host,
    port,
    secure: parseSecureFlag(process.env.SMTP_SECURE),
    user,
    password,
    toEmail: sanitizeHeaderValue(toEmail),
    fromEmail,
    fromName,
  };
}

export function isTurnstileConfigured(): boolean {
  return isTurnstileEnabled();
}

export function isRateLimitConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}
