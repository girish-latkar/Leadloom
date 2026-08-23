"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view.
 * Falls back to "always visible" when the user prefers reduced
 * motion or IntersectionObserver is unavailable.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" },
    );

    observer.observe(element);

    // Fallback: never leave content hidden if the observer misses (mobile / LAN dev)
    const fallback = window.setTimeout(() => setInView(true), 1200);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return { ref, inView };
}
