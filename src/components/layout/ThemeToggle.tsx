"use client";

import { useTheme, type ThemeMode } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";
import { AutoThemeIcon, MoonIcon, SunIcon } from "@/components/ui/icons";

const ICONS: Record<ThemeMode, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  auto: <AutoThemeIcon />,
};

export function ThemeToggle() {
  const { mode, cycleMode, label } = useTheme();

  return (
    <button
      type="button"
      onClick={cycleMode}
      aria-label={label}
      title={`${label} — click to change`}
      className={cn(
        "relative inline-flex size-[38px] cursor-pointer items-center justify-center",
        "rounded-full border border-line bg-transparent p-0 text-paper",
        "transition-[border-color,background-color,transform] duration-200 ease-out-loom",
        "hover:-translate-y-px hover:border-grey hover:bg-(--btn-outline-hover-bg)",
        "active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-paper",
      )}
    >
      {(Object.keys(ICONS) as ThemeMode[]).map((iconMode) => (
        <span
          key={iconMode}
          aria-hidden={iconMode !== mode}
          className={cn(
            "absolute transition-[transform,opacity] duration-[450ms] ease-out-loom",
            iconMode === mode ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
          )}
        >
          {ICONS[iconMode]}
        </span>
      ))}
    </button>
  );
}
