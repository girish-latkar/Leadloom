"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "auto" | "light" | "dark";

const MODES: readonly ThemeMode[] = ["auto", "light", "dark"];
const STORAGE_KEY = "leadloom-theme";

/** localStorage may be unavailable (privacy mode, sandboxed previews) — degrade gracefully. */
function readSaved(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return MODES.includes(saved as ThemeMode) ? (saved as ThemeMode) : "auto";
  } catch {
    return "auto";
  }
}

function save(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* no-op */
  }
}

function applyToDocument(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === "auto") {
    // No attribute — CSS falls back to the system preference.
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", mode);
  }
}

export function themeLabel(mode: ThemeMode): string {
  return mode === "auto" ? "Theme: auto (follows system)" : `Theme: ${mode}`;
}

/**
 * Three-mode theme: auto (follows system) → light → dark.
 * The saved manual mode is applied before hydration by the inline
 * script in `app/layout.tsx` to prevent a flash of the wrong theme.
 */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("auto");

  // Sync with the persisted value after mount (SSR-safe).
  useEffect(() => {
    const saved = readSaved();
    setMode(saved);
    applyToDocument(saved);
  }, []);

  const cycleMode = useCallback(() => {
    setMode((current) => {
      const next = MODES[(MODES.indexOf(current) + 1) % MODES.length];
      save(next);
      applyToDocument(next);
      return next;
    });
  }, []);

  return { mode, cycleMode, label: themeLabel(mode) };
}
