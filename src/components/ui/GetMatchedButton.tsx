"use client";

import { CTA } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useAudience } from "@/context/AudienceContext";
import { useGetStarted } from "@/context/GetStartedContext";
import { Button, type ButtonVariant } from "@/components/ui/Button";

interface GetMatchedButtonProps {
  variant?: ButtonVariant;
  className?: string;
  showReassurance?: boolean;
  /** Compact sizing for navbar and other tight layouts */
  compact?: boolean;
  /** Stretch button to container width */
  fullWidth?: boolean;
  /** Force homeowner intake even when audience is designers */
  forceHomeowner?: boolean;
  /** Override audience context (e.g. Services page local tab) */
  audienceOverride?: "homeowners" | "designers";
  /** Optional side effect after opening the modal */
  onOpen?: () => void;
}

export function GetMatchedButton({
  variant = "teal",
  className,
  showReassurance = false,
  compact = false,
  fullWidth = false,
  forceHomeowner = false,
  audienceOverride,
  onOpen,
}: GetMatchedButtonProps) {
  const { audience } = useAudience();
  const { openGetStarted } = useGetStarted();
  const effectiveAudience = audienceOverride ?? audience;
  const isDesigner = !forceHomeowner && effectiveAudience === "designers";
  const label = isDesigner
    ? compact
      ? CTA.navDesignerLabel
      : CTA.designerLabel
    : compact
      ? CTA.navLabel
      : CTA.primaryLabel;

  return (
    <div
      className={cn(
        fullWidth && "w-full",
        showReassurance && "flex w-full flex-col items-center gap-2.5",
      )}
    >
      <Button
        type="button"
        variant={isDesigner ? "gold" : variant}
        className={cn(
          compact && "h-[38px] px-3.5 py-0 text-[13px] leading-none hover:-translate-y-px hover:shadow-none",
          fullWidth && "w-full",
          className,
        )}
        onClick={() => {
          openGetStarted(isDesigner ? "designers" : "homeowners");
          onOpen?.();
        }}
      >
        {label}
      </Button>
      {showReassurance && !isDesigner && (
        <p className="text-center text-xs leading-relaxed text-grey">{CTA.reassurance}</p>
      )}
    </div>
  );
}
