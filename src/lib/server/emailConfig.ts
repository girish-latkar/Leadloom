import "server-only";

import { sanitizeHeaderValue } from "@/lib/server/escapeHtml";
import { isTurnstileServerEnabled } from "@/lib/server/turnstileServer";

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
  const normalized = sanitizeEnvValue(raw)?.toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

/** Trim and strip accidental surrounding quotes from Vercel / .env values. */
function sanitizeEnvValue(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

export function getRegistrationEmailConfig(): RegistrationEmailConfig {
  const host = sanitizeEnvValue(process.env.SMTP_HOST);
  const portRaw = sanitizeEnvValue(process.env.SMTP_PORT);
  const user = sanitizeEnvValue(process.env.SMTP_USER);
  const password = sanitizeEnvValue(process.env.SMTP_PASSWORD);
  const toEmail =
    sanitizeEnvValue(process.env.REGISTRATION_TO_EMAIL) ??
    sanitizeEnvValue(process.env.REGISTRATION_EMAIL);
  const fromRaw = sanitizeEnvValue(process.env.REGISTRATION_FROM_EMAIL);

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
  return isTurnstileServerEnabled();
}

export function isRateLimitConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() && process.env.UPSTASH_REDIS_REST_TOKEN?.trim(),
  );
}
