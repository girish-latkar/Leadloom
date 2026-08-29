"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { useAudience } from "@/context/AudienceContext";
import { TESTIMONIALS } from "@/lib/constants";
import { getSocialProofLabel } from "@/lib/socialProof";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const { audience } = useAudience();
  const content = TESTIMONIALS[audience];
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const total = content.items.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [content.items.length],
  );

  useEffect(() => {
    if (audience !== "homeowners") return;
    const timer = window.setInterval(() => goTo(activeIndex + 1), 7000);
    return () => window.clearInterval(timer);
  }, [activeIndex, audience, goTo]);

  const activeItem = content.items[activeIndex];
  const isHomeowner = audience === "homeowners";

  return (
    <section id="testimonials" className="border-b border-line py-24 max-sm:py-20">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <Reveal className="max-w-[640px]">
          <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">{content.eyebrow}</div>
          <h2 className="mt-3.5 font-display text-[clamp(28px,3.6vw,42px)] leading-[1.12] font-medium tracking-[-0.01em]">
            {content.heading}
          </h2>
          {isHomeowner && (
            <p className="mt-4 font-display text-[clamp(22px,3vw,30px)] text-teal">
              {getSocialProofLabel()}
            </p>
          )}
        </Reveal>

        {isHomeowner ? (
          <div className="mt-14">
            <Reveal>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out-loom"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {content.items.map((item) => (
                    <article
                      key={item.name}
                      className="flex w-full shrink-0 flex-col border border-line bg-ink-card p-7 max-sm:p-5"
                    >
                      {"tag" in item && item.tag && (
                        <div className="mb-4 inline-flex w-fit rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-teal uppercase">
                          {item.tag}
                        </div>
                      )}
                      <blockquote className="flex-1 text-[clamp(16px,2.2vw,18px)] leading-[1.75] text-paper-dim">
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
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                {content.items.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={index === activeIndex}
                    onClick={() => goTo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === activeIndex ? "w-6 bg-teal" : "w-2 bg-line-strong",
                    )}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
