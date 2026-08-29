import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";

interface LegalPageProps {
  title: string;
  intro: string;
  children: ReactNode;
}

export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <section className="scroll-mt-[72px] border-b border-line bg-ink-soft py-24 max-sm:py-20">
      <div className="mx-auto max-w-[760px] px-8 max-sm:px-5">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-grey uppercase">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.02em]">
            {title}
          </h1>
          <p className="mt-4 text-[15px] leading-[1.75] text-paper-dim">{intro}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10 space-y-8 text-[15px] leading-[1.75] text-paper-dim">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
