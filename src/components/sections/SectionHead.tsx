import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadProps {
  eyebrow: string;
  heading: string;
  description: string;
  className?: string;
}

export function SectionHead({ eyebrow, heading, description, className }: SectionHeadProps) {
  return (
    <Reveal className={cn("max-w-[640px]", className)}>
      <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">{eyebrow}</div>
      <h2 className="mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] leading-[1.12] font-medium tracking-[-0.01em]">
        {heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-paper-dim">{description}</p>
    </Reveal>
  );
}
