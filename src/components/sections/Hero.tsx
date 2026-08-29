"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CTA, HERO } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { GetMatchedButton } from "@/components/ui/GetMatchedButton";

const FADE_UP = "animate-fade-up translate-y-4 opacity-0";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxOffset = Math.min(scrollY * 0.28, 120);

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Mobile: full-bleed photo behind copy; desktop: side column — same asset, different layout */}
      <div className="relative min-h-[88vh] max-[900px]:flex max-[900px]:min-h-[82vh] max-[900px]:items-end max-[900px]:pb-10 max-sm:min-h-[80vh] max-sm:pb-8">
        <div
          className="pointer-events-none absolute inset-0 max-[900px]:block min-[901px]:hidden"
          aria-hidden="true"
        >
          <Image
            src={HERO.image.src}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/75 to-ink/20" />
        </div>

        <div className="relative z-[2] mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8 py-[120px] max-[900px]:grid-cols-1 max-[900px]:px-5 max-[900px]:py-0 max-sm:px-5">
          <div className="max-[900px]:pt-[44vh] max-sm:pt-[40vh]">
            <div className={`${FADE_UP} font-mono text-[11px] tracking-[0.12em] text-grey uppercase [animation-delay:0.05s] max-[900px]:text-paper-dim max-sm:text-[10px]`}>
              {HERO.eyebrow}
            </div>

            <h1
              className={`${FADE_UP} mt-4 font-display text-[clamp(36px,9vw,58px)] leading-[1.05] font-medium tracking-[-0.02em] [animation-delay:0.15s] max-[900px]:max-w-[13ch] max-sm:mt-3 max-sm:text-[clamp(32px,8.5vw,40px)]`}
            >
              {HERO.heading}
            </h1>

            <p
              className={`${FADE_UP} mt-5 max-w-[500px] text-base leading-relaxed text-paper-dim [animation-delay:0.3s] max-[900px]:text-paper/90 max-sm:mt-4 max-sm:text-[15px]`}
            >
              {HERO.description}
            </p>

            <div className={`${FADE_UP} mt-8 flex w-full flex-col items-stretch gap-3 [animation-delay:0.45s] max-sm:mt-7 min-[901px]:w-auto min-[901px]:items-start`}>
              <GetMatchedButton
                variant="teal"
                fullWidth
                className="justify-center px-7 py-3.5 text-[15px] min-[901px]:w-auto"
              />
              <a
                href={CTA.secondaryHref}
                className="text-sm font-medium text-paper-dim no-underline transition-colors hover:text-paper"
              >
                {CTA.secondaryLabel}
              </a>
              <p className="text-xs leading-relaxed text-grey">{CTA.reassurance}</p>
            </div>
          </div>

          <div
            className={cn(
              `${FADE_UP} relative aspect-[4/3] overflow-hidden rounded-md [animation-delay:0.35s]`,
              "max-[900px]:hidden",
            )}
          >
            <Image
              src={HERO.image.src}
              alt={HERO.image.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 900px) 100vw, 540px"
              style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
