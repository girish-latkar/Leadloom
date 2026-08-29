import { enforceRegistrationRateLimit, GENERIC_ERROR, getClientIdentifier } from "@/lib/server/rateLimit";
import { sendLeadEmail } from "@/lib/server/sendLeadEmail";
import { validateLeadSubmission } from "@/lib/server/validateLeadSubmission";
import { verifyTurnstileToken } from "@/lib/server/verifyTurnstile";

const SUCCESS_MESSAGE = "Registration submitted successfully.";
const MAX_BODY_BYTES = 32_768;

function methodNotAllowed(): Response {
  return Response.json({ success: false, message: GENERIC_ERROR }, { status: 405 });
}

function isSameSiteRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function parseJsonBody(request: Request): Promise<unknown | null> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const length = Number.parseInt(contentLength, 10);
    if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
      return null;
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return null;
  }

  if (!raw.trim()) {
    return null;
  }

  return JSON.parse(raw) as unknown;
}

export async function GET() {
  return methodNotAllowed();
}

export async function POST(request: Request) {
  if (!isSameSiteRequest(request)) {
    return Response.json({ success: false, message: GENERIC_ERROR }, { status: 403 });
  }

  const rateLimit = await enforceRegistrationRateLimit(request);
  if (!rateLimit.ok) {
    const headers =
      rateLimit.retryAfter !== undefined
        ? { "Retry-After": String(Math.ceil(rateLimit.retryAfter / 1000)) }
        : undefined;

    return Response.json(
      { success: false, message: rateLimit.message },
      { status: 429, headers },
    );
  }

  try {
    const payload = await parseJsonBody(request);
    if (payload === null) {
      return Response.json({ success: false, message: GENERIC_ERROR }, { status: 400 });
    }

    const result = validateLeadSubmission(payload);

    if (!result.ok) {
      return Response.json({ success: false, message: GENERIC_ERROR }, { status: 400 });
    }

    const turnstile = await verifyTurnstileToken(
      (payload as { turnstileToken?: unknown }).turnstileToken,
      getClientIdentifier(request),
    );

    if (!turnstile.ok) {
      return Response.json({ success: false, message: GENERIC_ERROR }, { status: 403 });
    }

    await sendLeadEmail(result.data);

    return Response.json({ success: true, message: SUCCESS_MESSAGE }, { status: 200 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json({ success: false, message: GENERIC_ERROR }, { status: 400 });
    }

    console.error("[submit-lead] Registration submission failed.", error);
    return Response.json({ success: false, message: GENERIC_ERROR }, { status: 500 });
  }
}

export async function PUT() {
  return methodNotAllowed();
}

export async function PATCH() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}
