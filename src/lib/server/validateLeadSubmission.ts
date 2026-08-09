import "server-only";

import type { FieldConfig } from "@/lib/formConfig";
import { getFormConfig, getFormFields } from "@/lib/forms/registry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 5000;

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

function validateField(field: FieldConfig, rawValue: string): string | null {
  const value = trim(rawValue);

  if (field.required && !value) {
    return `${field.label} is required.`;
  }

  if (!value) return null;

  if (value.length > MAX_FIELD_LENGTH) {
    return `${field.label} is too long.`;
  }

  if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
    return `${field.label} must be a valid email address.`;
  }

  if (field.type === "select" && field.options && !field.options.includes(value)) {
    return `${field.label} has an invalid selection.`;
  }

  if (field.type === "url") {
    try {
      new URL(value);
    } catch {
      return `${field.label} must be a valid URL.`;
    }
  }

  return null;
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

  const replyToEmail = normalized.email || undefined;

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
