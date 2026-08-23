"use client";

import { useEffect, useState } from "react";

import { useAudience, type Audience } from "@/context/AudienceContext";
import { DESIGNER_FORM, HOMEOWNER_FORM } from "@/lib/formConfig";
import { cn } from "@/lib/cn";
import { LeadForm } from "@/components/forms/LeadForm";
import { Modal } from "@/components/ui/Modal";

const OPTIONS: { value: Audience; label: string; accent: "teal" | "gold" }[] = [
  { value: "homeowners", label: "Homeowner", accent: "teal" },
  { value: "designers", label: "Designer", accent: "gold" },
];

interface GetStartedModalProps {
  open: boolean;
  onClose: () => void;
  initialAudience?: Audience;
}

export function GetStartedModal({
  open,
  onClose,
  initialAudience,
}: GetStartedModalProps) {
  const { audience } = useAudience();
  const [formAudience, setFormAudience] = useState<Audience>(initialAudience ?? audience);

  useEffect(() => {
    if (open) setFormAudience(initialAudience ?? audience);
  }, [open, audience, initialAudience]);

  const config = formAudience === "designers" ? DESIGNER_FORM : HOMEOWNER_FORM;

  return (
    <Modal open={open} onClose={onClose} label="Get started">
      <div className="mb-4 rounded-md border border-line bg-ink-card px-6 py-5 max-sm:px-5">
        <p className="text-sm text-grey">Tell us who you are and we&apos;ll show the right form.</p>
        <div
          role="tablist"
          aria-label="I am a"
          className="mt-4 inline-flex w-full items-center rounded-[6px] border border-line p-1 sm:w-auto"
        >
          {OPTIONS.map(({ value, label, accent }) => {
            const active = formAudience === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFormAudience(value)}
                className={cn(
                  "flex-1 cursor-pointer rounded-[4px] px-4 py-2 text-[13px] font-medium sm:flex-none sm:px-5",
                  "transition-all duration-250 ease-out-loom",
                  "focus-visible:outline-none focus-visible:ring-2",
                  accent === "gold" ? "focus-visible:ring-gold/40" : "focus-visible:ring-teal/40",
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
      </div>

      <LeadForm key={formAudience} config={config} embedded />
    </Modal>
  );
}
