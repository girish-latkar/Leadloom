"use client";

import { useRef, useState, type FormEvent } from "react";

import { cn } from "@/lib/cn";
import type { LeadFormConfig } from "@/lib/formConfig";
import { Button } from "@/components/ui/Button";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { SuccessCheckIcon } from "@/components/ui/icons";
import { FormField } from "@/components/forms/FormField";

type Phase = "editing" | "fading" | "submitted";

interface LeadFormProps {
  config: LeadFormConfig;
}

export function LeadForm({ config }: LeadFormProps) {
  const [phase, setPhase] = useState<Phase>("editing");
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (name: string) => `${config.formId}-${name}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const requiredFields = config.rows.flat().filter((field) => field.required);
    const invalid = requiredFields
      .filter((field) => !String(data.get(field.name) ?? "").trim())
      .map((field) => field.name);

    if (invalid.length > 0) {
      setErrors(new Set(invalid));
      form.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    // Fade the form out, then show the success state.
    // (Submission endpoint intentionally omitted — wire up an API route here.)
    setPhase("fading");
    window.setTimeout(() => setPhase("submitted"), 350);
  }

  /** Clear a field's error state as the user types. */
  function handleInput(event: FormEvent<HTMLFormElement>) {
    const name = (event.target as HTMLInputElement).name;
    if (!name || !errors.has(name)) return;
    setErrors((current) => {
      const next = new Set(current);
      next.delete(name);
      return next;
    });
  }

  return (
    <div
      id={config.id}
      className={cn(
        "scroll-mt-[100px] rounded-md border border-line bg-ink-card p-10 max-sm:px-[22px] max-sm:py-7",
        "transition-[border-color,box-shadow,transform] duration-[350ms] ease-out-loom",
        "hover:-translate-y-[3px] hover:border-line-strong hover:shadow-(--card-shadow)",
      )}
    >
      <ThreadTag color={config.accent}>{config.tag}</ThreadTag>
      <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.01em]">
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
          onInput={handleInput}
          className={cn(
            "transition-opacity duration-[350ms]",
            phase === "fading" ? "opacity-0" : "opacity-100",
          )}
        >
          {config.rows.map((row, rowIndex) =>
            row.length === 2 ? (
              <div key={rowIndex} className="grid grid-cols-2 gap-3.5 max-[480px]:grid-cols-1">
                {row.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    accent={config.accent}
                    fieldId={fieldId(field.name)}
                    hasError={errors.has(field.name)}
                  />
                ))}
              </div>
            ) : (
              <FormField
                key={row[0].name}
                field={row[0]}
                accent={config.accent}
                fieldId={fieldId(row[0].name)}
                hasError={errors.has(row[0].name)}
              />
            ),
          )}

          <Button
            type="submit"
            variant={config.accent}
            className="mt-[26px] w-full p-[13px] text-[15px]"
          >
            {config.submitLabel}
          </Button>
          <p className="mt-3.5 text-xs leading-normal text-grey-soft">{config.finePrint}</p>
        </form>
      )}
    </div>
  );
}
