"use client";

import { useRef, useState, type FormEvent } from "react";

import { cn } from "@/lib/cn";
import type { LeadFormConfig } from "@/lib/formConfig";
import { Button } from "@/components/ui/Button";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { SuccessCheckIcon } from "@/components/ui/icons";
import { FormField } from "@/components/forms/FormField";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { isTurnstileClientEnabled } from "@/lib/turnstileClient";
import { validateField, validateFormFields } from "@/lib/validateFormFields";

type Phase = "editing" | "submitting" | "fading" | "submitted";

const GENERIC_ERROR = "Unable to submit your registration right now. Please try again.";

interface LeadFormProps {
  config: LeadFormConfig;
  /** Removes hover lift — use inside modals or embedded panels */
  embedded?: boolean;
}

export function LeadForm({ config, embedded = false }: LeadFormProps) {
  const [phase, setPhase] = useState<Phase>("editing");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRequired = isTurnstileClientEnabled();

  const fieldId = (name: string) => `${config.formId}-${name}`;
  const formFields = config.rows.flat();

  function getFieldValue(name: string): string {
    const form = formRef.current;
    if (!form) return "";

    const element = form.elements.namedItem(name);
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      return element.value.trim();
    }

    return "";
  }

  function setFieldError(name: string, message: string | null) {
    setErrors((current) => {
      const next = { ...current };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  function validateFieldByName(name: string): string | null {
    const field = formFields.find((item) => item.name === name);
    if (!field) return null;
    return validateField(field, getFieldValue(name));
  }

  function handleFieldBlur(name: string) {
    setTouched((current) => ({ ...current, [name]: true }));
    setFieldError(name, validateFieldByName(name));
  }

  /** Re-validate touched fields as the user edits them. */
  function handleFieldChange(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).name;
    if (!name || (!touched[name] && !errors[name])) return;
    setFieldError(name, validateFieldByName(name));
  }

  function resetTurnstile() {
    setTurnstileToken(null);
    setTurnstileResetKey((current) => current + 1);
  }

  function handleTurnstileError() {
    setTurnstileToken(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const values: Record<string, string> = {};
    for (const field of formFields) {
      values[field.name] = String(data.get(field.name) ?? "").trim();
    }

    const fieldErrors = validateFormFields(formFields, values);
    const invalidFields = Object.keys(fieldErrors);

    if (invalidFields.length > 0) {
      setTouched(Object.fromEntries(formFields.map((field) => [field.name, true])));
      setErrors(fieldErrors);
      setSubmitError(null);
      form.querySelector<HTMLElement>(`[name="${invalidFields[0]}"]`)?.focus();
      return;
    }

    if (turnstileRequired && !turnstileToken) {
      setSubmitError(GENERIC_ERROR);
      return;
    }

    setPhase("submitting");
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: config.formId,
          fields: values,
          website: String(data.get("website") ?? ""),
          turnstileToken,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(GENERIC_ERROR);
      }

      setPhase("fading");
      window.setTimeout(() => setPhase("submitted"), 350);
    } catch {
      setPhase("editing");
      resetTurnstile();
      setSubmitError(GENERIC_ERROR);
    }
  }

  const isSubmitting = phase === "submitting";

  function renderFormField(field: (typeof formFields)[number]) {
    return (
      <FormField
        key={field.name}
        field={field}
        accent={config.accent}
        fieldId={fieldId(field.name)}
        errorMessage={errors[field.name]}
        onBlur={() => handleFieldBlur(field.name)}
      />
    );
  }

  return (
    <div
      id={config.id}
      className={cn(
        "scroll-mt-[100px] rounded-md border border-line bg-ink-card p-10 max-sm:px-[22px] max-sm:py-7",
        embedded && "rounded-none border-0 bg-transparent p-6 max-sm:px-5 max-sm:py-5",
        !embedded &&
          "transition-[border-color,box-shadow,transform] duration-[350ms] ease-out-loom hover:-translate-y-[3px] hover:border-line-strong hover:shadow-(--card-shadow)",
      )}
    >
      <ThreadTag color={config.accent}>{config.tag}</ThreadTag>
      <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em] max-sm:text-xl">
        {config.heading}
      </h3>
      <p className="mt-2.5 text-sm leading-[1.55] text-grey">{config.sub}</p>

      {phase === "submitted" ? (
        <div className="animate-success-in px-2.5 py-[30px] text-center">
          <SuccessCheckIcon color={config.accent} />
          <h4 className="font-display text-xl font-medium">{config.success.title}</h4>
          <p className="mt-2 text-sm leading-[1.55] text-grey">{config.success.body}</p>
        </div>
      ) : (
        <form
          ref={formRef}
          id={config.formId}
          noValidate
          onSubmit={handleSubmit}
          onChange={handleFieldChange}
          className={cn(
            "transition-opacity duration-[350ms]",
            phase === "fading" || isSubmitting ? "opacity-60" : "opacity-100",
          )}
        >
          {/* Honeypot — hidden from users, catches bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          {config.rows.map((row, rowIndex) =>
            row.length === 2 ? (
              <div key={rowIndex} className="grid grid-cols-2 gap-3.5 max-[480px]:grid-cols-1">
                {row.map((field) => renderFormField(field))}
              </div>
            ) : (
              renderFormField(row[0])
            ),
          )}

          <TurnstileField
            resetKey={turnstileResetKey}
            onVerify={setTurnstileToken}
            onExpire={resetTurnstile}
            onError={handleTurnstileError}
          />

          {submitError && (
            <p className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            variant={config.accent}
            disabled={isSubmitting || (turnstileRequired && !turnstileToken)}
            className="mt-[26px] w-full p-[13px] text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : config.submitLabel}
          </Button>
          <p className="mt-3.5 text-xs leading-normal text-grey-soft">{config.finePrint}</p>
        </form>
      )}
    </div>
  );
}
