"use client";

import { useEffect, useState } from "react";

import { SOCIAL_LINKS, CTA } from "@/lib/constants";
import { useAudience, type Audience } from "@/context/AudienceContext";
import { DESIGNER_FORM, INTAKE_FORM } from "@/lib/formConfig";
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

  const config = formAudience === "designers" ? DESIGNER_FORM : INTAKE_FORM;
  const whatsapp = SOCIAL_LINKS.find((link) => link.platform === "whatsapp");

  return (
    <Modal open={open} onClose={onClose} label="Get matched" variant="sheet" showCloseButton={false}>
      <div
        className={cn(
          "rounded-t-2xl border border-line bg-ink-soft max-sm:rounded-t-[1.25rem] sm:rounded-md",
          "max-h-[min(92dvh,820px)] overflow-y-auto sm:max-h-none",
        )}
      >
        <div className="sticky top-0 z-[1] flex items-center gap-3 border-b border-line bg-ink-soft px-5 py-3.5 sm:px-6 sm:py-4">
          <div
            role="tablist"
            aria-label="I am a"
            className="inline-flex min-w-0 flex-1 items-center rounded-[6px] border border-line p-1 sm:w-auto sm:flex-none"
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
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={cn(
              "ml-auto flex size-9 shrink-0 items-center justify-center rounded-full",
              "border border-line bg-ink-soft text-grey transition-colors",
              "hover:border-grey hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <LeadForm key={formAudience} config={config} embedded />

        {formAudience === "homeowners" && whatsapp && (
          <div className="sticky bottom-0 border-t border-line bg-ink-soft px-5 py-4 text-center max-sm:px-5 max-sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal no-underline transition-colors hover:text-paper"
            >
              or message us on WhatsApp →
            </a>
            <p className="mt-2 text-xs text-grey">{CTA.responseTime}</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
