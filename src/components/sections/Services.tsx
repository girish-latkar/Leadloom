import Image from "next/image";

import { SERVICES } from "@/lib/constants";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="scroll-mt-[72px] border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md max-[900px]:aspect-[16/10]">
            <Image
              src={SERVICES.image.src}
              alt={SERVICES.image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 900px) 100vw, 540px"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="font-mono text-xs tracking-[0.14em] text-gold uppercase">
              {SERVICES.eyebrow}
            </div>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {SERVICES.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-paper-dim">{SERVICES.description}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.offerings.map((offering, index) => (
            <Reveal key={offering.title} delay={index * 0.08}>
              <div className="h-full rounded-md border border-line bg-ink-card px-6 py-6">
                <h3 className="font-display text-[19px] font-medium">{offering.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-grey">{offering.body}</p>
                <ul className="mt-5 list-none space-y-3 p-0">
                  {offering.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-paper-dim">
                      <span className="mt-[2px] shrink-0">
                        <CheckIcon color={index === 0 ? "gold" : "teal"} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {SERVICES.homeownerSteps.eyebrow}
            </div>
            <h3 className="mt-3 max-w-[640px] font-display text-[clamp(24px,3vw,32px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {SERVICES.homeownerSteps.heading}
            </h3>
          </Reveal>

          <div className="mt-10 grid grid-cols-5 gap-px border border-line bg-line max-[1100px]:grid-cols-3 max-[820px]:grid-cols-1">
            {SERVICES.homeownerSteps.steps.map((step, index) => (
              <Reveal
                key={step.num}
                delay={index * 0.08}
                className="bg-ink-card px-5 py-6 transition-[background-color,transform] duration-[350ms] ease-out-loom hover:-translate-y-1 hover:bg-ink-soft max-sm:px-5 max-sm:py-6"
              >
                <div className="font-mono text-[13px] text-teal">{step.num}</div>
                <h4 className="mt-4 font-display text-[17px] font-medium tracking-[-0.01em]">
                  {step.title}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed text-grey">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-[1fr_1fr] items-start gap-16 max-[820px]:grid-cols-1 max-[820px]:gap-10">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {SERVICES.quoteComparison.eyebrow}
            </div>
            <h3 className="mt-3 font-display text-[clamp(24px,3vw,32px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {SERVICES.quoteComparison.heading}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-paper-dim">
              {SERVICES.quoteComparison.description}
            </p>
          </Reveal>

          <ul className="list-none space-y-0 p-0">
            {SERVICES.quoteComparison.points.map((point, index) => (
              <Reveal
                key={point}
                delay={index * 0.08}
                className="flex items-start gap-3 border-t border-line py-[15px] text-[15px] text-paper-dim last:border-b"
              >
                <span className="mt-[2px] shrink-0">
                  <CheckIcon color="teal" />
                </span>
                {point}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-line pt-16">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {SERVICES.benefits.eyebrow}
            </div>
            <h3 className="mt-3 max-w-[640px] font-display text-[clamp(24px,3vw,32px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {SERVICES.benefits.heading}
            </h3>
            <p className="mt-4 max-w-[680px] text-[15px] leading-[1.75] text-paper-dim">
              {SERVICES.benefits.description}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.benefits.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-md border border-line bg-ink-card px-5 py-5">
                  <h4 className="font-display text-[17px] font-medium">{item.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-grey">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
