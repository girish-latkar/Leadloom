"use client";

import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Accessible label for the dialog */
  label: string;
  className?: string;
  /** Bottom sheet on mobile; centered dialog on larger screens */
  variant?: "center" | "sheet";
  /** Show the floating close button (disable when embedding close in children) */
  showCloseButton?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  label,
  className,
  variant = "center",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isSheet = variant === "sheet";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex overflow-y-auto",
        isSheet
          ? "items-end justify-center p-0 sm:items-start sm:justify-center sm:p-6 sm:pt-20"
          : "items-start justify-center p-4 pt-[88px] max-sm:pt-20 sm:p-6",
      )}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-[3px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "relative z-[101] w-full animate-success-in",
          isSheet ? "max-w-none sm:max-w-[640px]" : "max-w-[640px]",
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={cn(
              "absolute z-[102] flex size-9 items-center justify-center rounded-full",
              "border border-line bg-ink-soft text-grey transition-colors",
              "hover:border-grey hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
              isSheet ? "right-4 top-4 sm:-top-3 sm:right-0" : "-top-3 right-0",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
