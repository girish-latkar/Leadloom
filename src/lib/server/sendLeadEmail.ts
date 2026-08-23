import "server-only";

import { escapeHtml, sanitizeHeaderValue } from "@/lib/server/escapeHtml";
import { getRegistrationEmailConfig } from "@/lib/server/emailConfig";
import { getMailTransporter } from "@/lib/server/mailer";
import type { ValidatedLeadSubmission } from "@/lib/server/validateLeadSubmission";

function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

function buildEmailContent(submission: ValidatedLeadSubmission, submittedAt: Date) {
  const submittedLabel = formatSubmittedAt(submittedAt);

  const textSections = submission.fields.map(
    (field) => `${field.label}:\n${field.value}`,
  );

  const text = [
    "New Website Registration",
    "",
    `Form: ${submission.formLabel}`,
    "",
    ...textSections.flatMap((section) => [section, ""]),
    `Submitted:\n${submittedLabel}`,
  ].join("\n");

  const htmlRows = submission.fields
    .map(
      (field) => `
        <tr>
          <td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#111;">${escapeHtml(field.label)}</td>
          <td style="padding:8px 0;vertical-align:top;color:#333;">${escapeHtml(field.value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
      <h2 style="margin:0 0 16px;font-size:20px;">New Website Registration</h2>
      <p style="margin:0 0 16px;"><strong>Form:</strong> ${escapeHtml(submission.formLabel)}</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px;">
        ${htmlRows}
        <tr>
          <td style="padding:8px 12px 8px 0;font-weight:600;vertical-align:top;color:#111;">Submitted</td>
          <td style="padding:8px 0;vertical-align:top;color:#333;">${escapeHtml(submittedLabel)}</td>
        </tr>
      </table>
    </div>
  `;

  return { text, html };
}

export async function sendLeadEmail(submission: ValidatedLeadSubmission) {
  const config = getRegistrationEmailConfig();
  const transporter = getMailTransporter();
  const submittedAt = new Date();
  const { text, html } = buildEmailContent(submission, submittedAt);

  const subject = sanitizeHeaderValue(`New ${submission.formLabel} registration — Leadloom`);
  const from = `${config.fromName} <${config.fromEmail}>`;

  try {
    await transporter.sendMail({
      from,
      to: config.toEmail,
      replyTo: submission.replyToEmail
        ? sanitizeHeaderValue(submission.replyToEmail)
        : undefined,
      subject,
      text,
      html,
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";

    console.error("[registration-email] SMTP delivery failed.", { code });
    throw new Error("Registration email failed.");
  }
}
