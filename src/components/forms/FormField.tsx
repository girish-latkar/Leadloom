"use client";

import type { FormEvent } from "react";

import { cn } from "@/lib/cn";
import type { FieldConfig } from "@/lib/formConfig";
import { sanitizeIndianPhoneInput } from "@/lib/validateFormFields";

interface FormFieldProps {
  field: FieldConfig;
  accent: "gold" | "teal";
  fieldId: string;
  errorMessage?: string;
  onBlur?: () => void;
}

const CONTROL_BASE = cn(
  "w-full rounded-[3px] border border-line bg-ink px-[13px] py-[11px]",
  "font-sans text-[14.5px] text-paper",
  "transition-[border-color,box-shadow,background-color] duration-250",
  "focus:bg-ink-soft focus:outline-none",
);

const ACCENT_FOCUS: Record<"gold" | "teal", string> = {
  gold: "focus:border-gold-soft focus:shadow-[0_0_0_3px_rgba(182,137,63,0.14)]",
  teal: "focus:border-teal-soft focus:shadow-[0_0_0_3px_rgba(63,100,97,0.16)]",
};

const ERROR_CLASSES = "border-gold animate-shake";

export function FormField({ field, accent, fieldId, errorMessage, onBlur }: FormFieldProps) {
  const hasError = Boolean(errorMessage);
  const errorId = `${fieldId}-error`;
  const controlClasses = cn(CONTROL_BASE, ACCENT_FOCUS[accent], hasError && ERROR_CLASSES);
  const ariaProps = hasError
    ? { "aria-invalid": true as const, "aria-describedby": errorId }
    : {};

  function handlePhoneInput(event: FormEvent<HTMLInputElement>) {
    if (field.phoneLocale !== "in") return;

    const input = event.currentTarget;
    const sanitized = sanitizeIndianPhoneInput(input.value);
    if (sanitized !== input.value) {
      input.value = sanitized;
    }
  }

  return (
    <div className="group mt-5">
      <label
        htmlFor={fieldId}
        className="mb-[7px] block font-mono text-[12.5px] tracking-[0.02em] text-grey transition-colors duration-250 group-focus-within:text-paper"
      >
        {field.label}
        {field.required && <span className="text-gold-soft"> *</span>}
      </label>

      {field.type === "select" ? (
        <select
          id={fieldId}
          name={field.name}
          className={controlClasses}
          onBlur={onBlur}
          {...ariaProps}
        >
          <option value="">{field.selectPrompt ?? "Select one"}</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={fieldId}
          name={field.name}
          placeholder={field.placeholder}
          className={cn(controlClasses, "min-h-[76px] resize-y")}
          onBlur={onBlur}
          {...ariaProps}
        />
      ) : (
        <input
          id={fieldId}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          inputMode={field.type === "tel" ? "tel" : undefined}
          autoComplete={
            field.type === "email" ? "email" : field.type === "tel" ? "tel" : undefined
          }
          className={controlClasses}
          onBlur={onBlur}
          onInput={field.type === "tel" && field.phoneLocale === "in" ? handlePhoneInput : undefined}
          {...ariaProps}
        />
      )}

      {errorMessage && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs leading-normal text-red-300">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
