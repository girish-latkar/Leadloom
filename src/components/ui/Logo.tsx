import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("relative inline-flex h-16 w-16 shrink-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-light.png"
        alt="Leadloom"
        className="absolute inset-0 h-full w-full object-contain object-left"
      />
    </span>
  );
}
