import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ThreadTagProps {
  color: "gold" | "teal";
  children: ReactNode;
}

/** Monospace pill identifying which "thread" (audience) a block belongs to. */
export function ThreadTag({ color, children }: ThreadTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[20px] border px-3 py-1.5",
        "font-mono text-xs tracking-[0.1em] uppercase",
        color === "gold" ? "border-gold-soft text-gold" : "border-teal-soft text-teal",
      )}
    >
      {children}
    </span>
  );
}
