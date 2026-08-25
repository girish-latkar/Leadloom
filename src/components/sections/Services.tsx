"use client";

import Image from "next/image";
import { useState } from "react";

import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/icons";
import { GetMatchedButton } from "@/components/ui/GetMatchedButton";
import { Reveal } from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

type ServicesAudience = "homeowners" | "designers";

const AUDIENCE_TABS: { value: ServicesAudience; label: string; compactLabel: string }[] = [
  { value: "homeowners", label: "I'm a homeowner", compactLabel: "Homeowner" },
  { value: "designers", label: "I'm a designer", compactLabel: "Designer" },
];

function StepCard({
  num,
  title,
  body,
  index,
}: {
  num: string;
  title: string;
  body: string;
  index: number;
}) {
  const stepNumber = Number.parseInt(num, 10);
  const { ref, value } = useCountUp(stepNumber);

  return (
    <Reveal delay={index * 0.08} className="snap-center">
      <article className="flex h-full min-h-[260px] flex-col justify-between rounded-md border border-line bg-ink-card px-5 py-7 sm:min-h-[280px] sm:px-6 sm:py-8">
        <div ref={ref} className="font-display text-[clamp(40px,7vw,72px)] leading-none font-medium text-teal/80">
          {String(value).padStart(2, "0")}
        </div>
        <div>
          <h4 className="font-display text-[18px] font-medium tracking-[-0.01em] sm:text-[20px]">{title}</h4>
          <p className="mt-3 text-[15px] leading-relaxed text-grey">{body}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function Services() {
  const [audience, setAudience] = useState<ServicesAudience>("homeowners");
  const offering = SERVICES.offerings[audience === "designers" ? 0 : 1];

  return (
    <section id="services" className="scroll-mt-[72px] overflow-x-clip border-b border-line bg-ink-soft py-24 max-sm:py-20">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <Reveal className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="font-mono text-xs tracking-[0.14em] text-gold uppercase">{SERVICES.eyebrow}</div>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {SERVICES.heading}
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Choose your path"
            className="inline-flex w-full shrink-0 items-center rounded-[6px] border border-line p-1 lg:w-auto"
          >
            {AUDIENCE_TABS.map(({ value, label, compactLabel }) => {
              const active = audience === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setAudience(value)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-[4px] px-3 py-2.5 text-[12px] font-medium sm:px-4 sm:text-[13px] lg:flex-none lg:px-5",
                    "transition-all duration-250 ease-out-loom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40",
                    active ? "bg-teal/15 text-teal" : "text-grey hover:text-paper-dim",
                  )}
                >
                  <span className="sm:hidden">{compactLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
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
            <h3 className="font-display text-[clamp(24px,3vw,34px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {offering.title}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-paper-dim">{offering.body}</p>
            <ul className="mt-6 list-none space-y-3 p-0">
              {offering.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14px] leading-relaxed text-paper-dim">
                  <span className="mt-[2px] shrink-0">
                    <CheckIcon color={audience === "designers" ? "gold" : "teal"} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 max-sm:w-full">
              <GetMatchedButton
                variant={audience === "designers" ? "gold" : "teal"}
                className="px-7 py-3 text-[15px] max-sm:w-full max-sm:justify-center"
                audienceOverride={audience}
              />
            </div>
          </Reveal>
        </div>

        {audience === "homeowners" && (
          <div id="how-it-works" className="mt-20 scroll-mt-[88px]">
            <Reveal>
              <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
                {SERVICES.homeownerSteps.eyebrow}
              </div>
              <h3 className="mt-3 max-w-[640px] font-display text-[clamp(24px,3vw,32px)] leading-[1.12] font-medium tracking-[-0.02em]">
                {SERVICES.homeownerSteps.heading}
              </h3>
            </Reveal>

            <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 xl:mx-0 xl:grid xl:grid-cols-5 xl:gap-4 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden">
              {SERVICES.homeownerSteps.steps.map((step, index) => (
                <div key={step.num} className="w-[min(78vw,300px)] shrink-0 snap-center xl:w-auto">
                  <StepCard num={step.num} title={step.title} body={step.body} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {audience === "homeowners" && (
          <>
            <div className="mt-20 grid grid-cols-[1fr_1fr] items-start gap-16 max-[820px]:grid-cols-1 max-[820px]:gap-10">
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

            <div className="mt-20 border-t border-line pt-16">
              <Reveal>
                <h3 className="font-display text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-medium tracking-[-0.02em]">
                  {SERVICES.benefits.headline}
                </h3>
                <p className="mt-4 max-w-[680px] text-[15px] leading-[1.75] text-paper-dim">
                  {SERVICES.benefits.description}
                </p>
              </Reveal>

              <ul className="mt-8 max-w-[720px] list-none space-y-3 p-0">
                {SERVICES.benefits.items.map((item, index) => (
                  <Reveal key={item} delay={index * 0.06} className="flex items-start gap-3 text-[15px] text-paper-dim">
                    <span className="mt-[2px] shrink-0">
                      <CheckIcon color="teal" />
                    </span>
                    {item}
                  </Reveal>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
