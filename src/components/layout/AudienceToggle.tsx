"use client";

import { useAudience, type Audience } from "@/context/AudienceContext";
import { cn } from "@/lib/cn";

const OPTIONS: { value: Audience; label: string; accent: "teal" | "gold" }[] = [
  { value: "homeowners", label: "Homeowners", accent: "teal" },
  { value: "designers", label: "Designers", accent: "gold" },
];

interface AudienceToggleProps {
  className?: string;
  /** Compact layout for mobile drawer */
  variant?: "inline" | "stacked";
}

export function AudienceToggle({ className, variant = "inline" }: AudienceToggleProps) {
  const { audience, setAudience } = useAudience();

  return (
    <div
      role="tablist"
      aria-label="Audience"
      className={cn(
        variant === "inline"
          ? "inline-flex items-center rounded-[6px] border border-line p-1"
          : "flex w-full flex-col gap-1 rounded-[6px] border border-line p-1",
        className,
      )}
    >
      {OPTIONS.map(({ value, label, accent }) => {
        const active = audience === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setAudience(value)}
            className={cn(
              "relative cursor-pointer rounded-[4px] px-3.5 py-1.5 text-[13px] font-medium",
              "transition-all duration-250 ease-out-loom",
              "focus-visible:outline-none focus-visible:ring-2",
              accent === "gold" ? "focus-visible:ring-gold/40" : "focus-visible:ring-teal/40",
              variant === "stacked" && "w-full text-center",
              active
                ? accent === "gold"
                  ? "bg-gold/15 text-gold"
                  : "bg-teal/15 text-teal"
                : "text-grey hover:text-paper-dim",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
