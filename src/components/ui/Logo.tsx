import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("relative inline-flex h-9 w-[132px] shrink-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-light.png"
        alt="Leadloom"
        className="logo-light absolute inset-0 h-full w-full object-contain object-left"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-dark.png"
        alt=""
        aria-hidden="true"
        className="logo-dark absolute inset-0 h-full w-full object-contain object-left"
      />
    </span>
  );
}
