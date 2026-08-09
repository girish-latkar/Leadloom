import Image from "next/image";

import { LEAD_QUALIFICATION } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function LeadQualification() {
  return (
    <section id="qualify" className="border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {LEAD_QUALIFICATION.eyebrow}
            </div>
            <h2 className="mt-4 max-w-[520px] font-display text-[clamp(32px,4.2vw,52px)] leading-[1.08] font-medium tracking-[-0.02em]">
              {LEAD_QUALIFICATION.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[420px] justify-self-end max-[900px]:justify-self-start">
            <p className="text-[16px] leading-[1.75] text-paper-dim">
              {LEAD_QUALIFICATION.description}
            </p>
            <Button
              href={LEAD_QUALIFICATION.cta.href}
              variant="ghost"
              className="mt-7 border-line px-6 py-3 text-[14px]"
            >
              {LEAD_QUALIFICATION.cta.label}
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md max-[900px]:aspect-[16/10]">
            <Image
              src={LEAD_QUALIFICATION.image.src}
              alt={LEAD_QUALIFICATION.image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </Reveal>

          <div className="overflow-hidden rounded-md border border-line bg-ink-card">
            {LEAD_QUALIFICATION.criteria.map((item, index) => (
              <Reveal key={item.num} delay={index * 0.05}>
                <div
                  className="group flex gap-5 border-b border-line px-6 py-5 transition-colors duration-300 last:border-b-0 hover:bg-ink-soft max-sm:px-5 max-sm:py-4"
                >
                  <span className="shrink-0 font-mono text-[13px] leading-none text-gold pt-1">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[17px] font-medium tracking-[-0.01em] transition-colors duration-300 group-hover:text-paper">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-grey">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
