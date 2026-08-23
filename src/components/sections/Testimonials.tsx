"use client";

import Image from "next/image";

import { useAudience } from "@/context/AudienceContext";
import { TESTIMONIALS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const { audience } = useAudience();
  const content = TESTIMONIALS[audience];

  return (
    <section id="testimonials" className="border-b border-line py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <Reveal className="max-w-[640px]">
          <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
            {content.eyebrow}
          </div>
          <h2 className="mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] leading-[1.12] font-medium tracking-[-0.01em]">
            {content.heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 gap-6 max-[980px]:grid-cols-1">
          {content.items.map((item, index) => (
            <Reveal
              key={item.name}
              delay={index * 0.1}
              className="flex flex-col border border-line bg-ink-card p-7 max-sm:p-5"
            >
              <blockquote className="flex-1 text-[15px] leading-[1.75] text-paper-dim">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <div className="text-[15px] font-medium">{item.name}</div>
                  <div className="mt-0.5 text-[13px] text-grey">{item.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
