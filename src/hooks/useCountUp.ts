"use client";

import { useEffect, useState } from "react";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Animates a number from 0 to `target` when the element scrolls into view. */
export function useCountUp(target: number, durationMs = 900) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      requestAnimationFrame(() => setValue(target));
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, durationMs]);

  return { ref, value, inView };
}
