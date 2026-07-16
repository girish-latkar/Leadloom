"use client";

import { cn } from "@/lib/cn";
import type { FieldConfig } from "@/lib/formConfig";

interface FormFieldProps {
  field: FieldConfig;
  accent: "gold" | "teal";
  fieldId: string;
  hasError: boolean;
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

export function FormField({ field, accent, fieldId, hasError }: FormFieldProps) {
  const controlClasses = cn(CONTROL_BASE, ACCENT_FOCUS[accent], hasError && ERROR_CLASSES);

  return (
    <div className="group mt-5">
      <label
        htmlFor={fieldId}
        className="mb-[7px] block font-mono text-[12.5px] tracking-[0.02em] text-grey transition-colors duration-250 group-focus-within:text-paper"
      >
        {field.label}
      </label>

      {field.type === "select" ? (
        <select id={fieldId} name={field.name} required={field.required} className={controlClasses}>
          <option value="">{field.selectPrompt}</option>
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
          required={field.required}
          placeholder={field.placeholder}
          className={cn(controlClasses, "min-h-[76px] resize-y")}
        />
      ) : (
        <input
          id={fieldId}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={controlClasses}
        />
      )}
    </div>
  );
}
