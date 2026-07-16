"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  /** Element to render as (defaults to div). */
  as?: ElementType;
  className?: string;
  /** Stagger delay in seconds (e.g. index * 0.12 inside grids). */
  delay?: number;
  id?: string;
}

/** Fades and slides content up once it enters the viewport. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, id }: RevealProps) {
  const { ref, inView } = useScrollReveal<HTMLElement>();

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      className={cn(
        "transition-[opacity,transform] duration-800 ease-out-loom will-change-[opacity,transform]",
        inView ? "translate-y-0 opacity-100" : "translate-y-[26px] opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
