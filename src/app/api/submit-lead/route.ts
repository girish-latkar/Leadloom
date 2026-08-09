import { sendLeadEmail } from "@/lib/server/sendLeadEmail";
import { validateLeadSubmission } from "@/lib/server/validateLeadSubmission";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = validateLeadSubmission(payload);

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    await sendLeadEmail(result.data);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[submit-lead]", error);
    return Response.json(
      { error: "Unable to send your submission right now. Please try again or call us directly." },
      { status: 500 },
    );
  }
}
