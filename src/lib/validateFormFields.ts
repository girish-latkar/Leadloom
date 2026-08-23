import type { FieldConfig } from "@/lib/formConfig";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_PATTERN = /^[+()\d\s.-]{7,20}$/;
export const MAX_FIELD_LENGTH = 5000;
export const MIN_PHONE_DIGITS = 7;
export const INDIAN_PHONE_DIGITS = 10;
export const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;

function trim(value: unknown): string {
  return String(value ?? "").trim();
}

/** Strip country/leading zero prefixes and return up to 10 local digits. */
export function extractIndianPhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length > 2) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length > 1) {
    digits = digits.slice(1);
  }

  return digits.slice(0, INDIAN_PHONE_DIGITS);
}

function formatIndianPhoneLocal(digits: string): string {
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

/** Limit Indian phone inputs to 10 local digits while typing. */
export function sanitizeIndianPhoneInput(value: string): string {
  const trimmed = value.trim();
  const allDigits = value.replace(/\D/g, "");
  const usesCountryCode = trimmed.startsWith("+") || allDigits.startsWith("91");
  const localDigits = extractIndianPhoneDigits(value);

  if (usesCountryCode) {
    if (localDigits.length === 0) {
      return trimmed.startsWith("+") ? "+91" : "";
    }
    return `+91 ${formatIndianPhoneLocal(localDigits)}`;
  }

  return formatIndianPhoneLocal(localDigits);
}

export function isValidIndianPhone(value: string): boolean {
  const digits = extractIndianPhoneDigits(value);
  return digits.length === INDIAN_PHONE_DIGITS && INDIAN_MOBILE_PATTERN.test(digits);
}

export function validateField(field: FieldConfig, rawValue: string): string | null {
  const value = trim(rawValue);

  if (field.required && !value) {
    return `${field.label} is required.`;
  }

  if (!value) return null;

  if (value.length > MAX_FIELD_LENGTH) {
    return `${field.label} is too long.`;
  }

  if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
    return "Please enter a valid email address.";
  }

  if (field.type === "tel") {
    if (field.phoneLocale === "in") {
      if (!isValidIndianPhone(value)) {
        return "Please enter a valid 10-digit mobile number.";
      }
    } else {
      const digits = value.replace(/\D/g, "");
      if (digits.length < MIN_PHONE_DIGITS || !PHONE_PATTERN.test(value)) {
        return "Please enter a valid phone number.";
      }
    }
  }

  if (field.type === "select") {
    if (field.required && !value) {
      return `Please select ${field.label.toLowerCase()}.`;
    }
    if (field.options && !field.options.includes(value)) {
      return `Please select a valid ${field.label.toLowerCase()}.`;
    }
  }

  if (field.type === "url") {
    try {
      new URL(value);
    } catch {
      return "Please enter a valid URL.";
    }
  }

  return null;
}

export function validateFormFields(
  fields: readonly FieldConfig[],
  values: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const error = validateField(field, values[field.name] ?? "");
    if (error) errors[field.name] = error;
  }

  return errors;
}
