import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "gold" | "teal" | "ghost";

const BASE_CLASSES = cn(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden",
  "rounded-[3px] border border-transparent px-5 py-[11px] font-sans text-sm font-semibold no-underline",
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out-loom",
  "hover:-translate-y-0.5 active:translate-y-px",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-paper",
);

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // gold — designer actions
  gold: cn(
    "bg-(--btn-gold-bg) text-(--btn-gold-text)",
    "hover:bg-(--btn-gold-bg-hover) hover:shadow-[0_6px_22px_rgba(182,137,63,0.28)]",
  ),
  // teal — homeowner actions
  teal: cn(
    "bg-(--btn-teal-bg) text-(--btn-teal-text)",
    "hover:bg-(--btn-teal-bg-hover) hover:shadow-[0_6px_22px_rgba(63,100,97,0.32)]",
  ),
  // ghost — quiet nav action
  ghost: cn("border-line bg-transparent text-paper-dim", "hover:border-grey hover:text-paper"),
};

type CommonProps = {
  variant: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ variant, className, children, ...props }: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
