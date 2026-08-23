import Image from "next/image";

import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "relative inline-block h-10 w-[148px] shrink-0 sm:h-11 sm:w-[168px]",
        className,
      )}
    >
      <Image
        src="/logo/logo-light.png"
        alt="Leadloom"
        fill
        priority
        sizes="168px"
        className="logo-for-light object-contain object-left"
      />
      <Image
        src="/logo/logo-dark.png"
        alt=""
        aria-hidden
        fill
        sizes="168px"
        className="logo-for-dark object-contain object-left"
      />
    </span>
  );
}
