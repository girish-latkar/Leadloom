/**
 * Inline SVG icons. Colors come from CSS custom properties so
 * they respond to theme changes automatically.
 */

export function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M2 6 L24 20 M2 20 L24 6" stroke="var(--gold)" strokeWidth="1.4" />
      <path d="M2 13 L24 13" stroke="var(--teal)" strokeWidth="1.4" />
      <circle cx="13" cy="13" r="2.4" fill="var(--paper)" />
    </svg>
  );
}

export function CheckIcon({ color }: { color: "gold" | "teal" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-[3px] shrink-0"
    >
      <path d="M3 8.5 6 11.5 13 4.5" stroke={`var(--${color})`} strokeWidth="1.6" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="var(--grey)" />
      <path d="M7 4v3.5l2.2 1.3" stroke="var(--grey)" />
    </svg>
  );
}

export function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="3.4" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8.5 1v2M8.5 14v2M1 8.5h2M14 8.5h2M3.2 3.2l1.4 1.4M12.4 12.4l1.4 1.4M13.8 3.2l-1.4 1.4M4.6 12.4l-1.4 1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.5A6 6 0 0 1 6.5 2.5 6 6 0 1 0 13.5 9.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AutoThemeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="6.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8.5 1.9v13.2A6.6 6.6 0 0 0 8.5 1.9Z" fill="currentColor" />
    </svg>
  );
}

export function SuccessCheckIcon({ color }: { color: "gold" | "teal" }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="mx-auto mb-3.5 block"
    >
      <circle cx="20" cy="20" r="19" stroke={`var(--${color})`} />
      <path
        d="M12 20.5 17 25.5 28 13.5"
        stroke={`var(--${color})`}
        strokeWidth="1.8"
        className="animate-draw-check [stroke-dasharray:60] [stroke-dashoffset:60]"
      />
    </svg>
  );
}
