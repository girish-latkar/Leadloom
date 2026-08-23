import "server-only";

import { getFormConfig, getFormFields } from "@/lib/forms/registry";
import { EMAIL_PATTERN, validateField } from "@/lib/validateFormFields";

export interface LeadSubmissionPayload {
  formId: string;
  fields: Record<string, string>;
  website?: string;
}

export interface ValidatedLeadSubmission {
  formId: string;
  formLabel: string;
  fields: { label: string; value: string }[];
  replyToEmail?: string;
}

function trim(value: unknown): string {
  return String(value ?? "").trim();
}

export function validateLeadSubmission(
  payload: unknown,
): { ok: true; data: ValidatedLeadSubmission } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid submission." };
  }

  const { formId, fields, website } = payload as LeadSubmissionPayload;

  if (trim(website)) {
    return { ok: false, error: "Invalid submission." };
  }

  if (typeof formId !== "string" || !formId) {
    return { ok: false, error: "Unknown form." };
  }

  const config = getFormConfig(formId);
  if (!config) {
    return { ok: false, error: "Unknown form." };
  }

  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return { ok: false, error: "Invalid form data." };
  }

  const formFields = getFormFields(config);
  const allowedNames = new Set(formFields.map((field) => field.name));
  const normalized: Record<string, string> = {};

  for (const [name, value] of Object.entries(fields)) {
    if (!allowedNames.has(name)) continue;
    normalized[name] = trim(value);
  }

  for (const field of formFields) {
    const error = validateField(field, normalized[field.name] ?? "");
    if (error) return { ok: false, error };
  }

  const labeledFields = formFields
    .map((field) => ({
      label: field.label,
      value: normalized[field.name] ?? "",
    }))
    .filter((field) => field.value);

  const replyToEmail =
    normalized.email && EMAIL_PATTERN.test(normalized.email) ? normalized.email : undefined;

  return {
    ok: true,
    data: {
      formId,
      formLabel: config.tag,
      fields: labeledFields,
      replyToEmail,
    },
  };
}
