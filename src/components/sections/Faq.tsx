"use client";

import { useState } from "react";

import { FAQ } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-line py-24 max-sm:py-20">
      <div className="mx-auto max-w-[760px] px-8 max-sm:px-5">
        <Reveal>
          <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">FAQ</div>
          <h2 className="mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] leading-[1.12] font-medium tracking-[-0.01em]">
            Common questions
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQ.map((item, index) => {
            const open = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.06}>
                <div>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 py-5 text-left",
                      "transition-colors duration-200 hover:text-paper",
                    )}
                  >
                    <span className="font-display text-[17px] font-medium leading-snug">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 shrink-0 text-lg leading-none text-teal transition-transform duration-300",
                        open && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out-loom",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[15px] leading-[1.75] text-paper-dim">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
