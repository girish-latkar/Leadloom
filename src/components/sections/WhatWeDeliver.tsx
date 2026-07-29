import { WHAT_WE_DELIVER } from "@/lib/constants";
import { CheckIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export function WhatWeDeliver() {
  return (
    <section id="deliver" className="border-b border-line py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-[1fr_1fr] items-start gap-16 max-[820px]:grid-cols-1 max-[820px]:gap-10">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {WHAT_WE_DELIVER.eyebrow}
            </div>
            <h2 className="mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] leading-[1.12] font-medium tracking-[-0.01em]">
              {WHAT_WE_DELIVER.heading}
            </h2>
            <p className="mt-4 max-w-[480px] text-base leading-relaxed text-paper-dim">
              {WHAT_WE_DELIVER.description}
            </p>
          </Reveal>

          <ul className="list-none space-y-0 p-0">
            {WHAT_WE_DELIVER.points.map((point, index) => (
              <Reveal
                key={point}
                delay={index * 0.08}
                className="flex items-start gap-3 border-t border-line py-[15px] text-[15px] text-paper-dim last:border-b"
              >
                <span className="mt-[2px] shrink-0">
                  <CheckIcon color="gold" />
                </span>
                {point}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
