import "server-only";

import nodemailer from "nodemailer";

import type { ValidatedLeadSubmission } from "@/lib/server/validateLeadSubmission";

function getEmailConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL;
  const port = Number(process.env.SMTP_PORT ?? "587");

  if (!host || !user || !pass || !notifyEmail) {
    throw new Error("Email delivery is not configured on the server.");
  }

  return { host, user, pass, notifyEmail, port };
}

function buildEmailContent(submission: ValidatedLeadSubmission) {
  const lines = submission.fields.map((field) => `${field.label}: ${field.value}`);
  const text = [
    `New Leadloom form submission`,
    ``,
    `Form: ${submission.formLabel} (${submission.formId})`,
    ``,
    ...lines,
    ``,
    `Submitted at: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <h2>New Leadloom form submission</h2>
    <p><strong>Form:</strong> ${submission.formLabel} (${submission.formId})</p>
    <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
      ${submission.fields
        .map(
          (field) =>
            `<tr><td style="font-weight:600;vertical-align:top;">${field.label}</td><td>${field.value.replace(/\n/g, "<br>")}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="color:#666;font-size:12px;">Submitted at ${new Date().toISOString()}</p>
  `;

  return { text, html };
}

export async function sendLeadEmail(submission: ValidatedLeadSubmission) {
  const { host, user, pass, notifyEmail, port } = getEmailConfig();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const { text, html } = buildEmailContent(submission);

  await transporter.sendMail({
    from: `"Leadloom Forms" <${user}>`,
    to: notifyEmail,
    replyTo: submission.replyToEmail,
    subject: `New ${submission.formLabel} submission — Leadloom`,
    text,
    html,
  });
}
