import Image from "next/image";

import { ABOUT, FOUNDER } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { GetMatchedButton } from "@/components/ui/GetMatchedButton";

export function About() {
  return (
    <section id="about" className="scroll-mt-[72px] border-b border-line bg-ink-soft py-24 max-sm:py-20">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div className="relative aspect-[4/5] w-full min-h-[280px] overflow-hidden rounded-md max-[900px]:aspect-[3/4] max-[900px]:min-h-[320px]">
            <Image
              src={ABOUT.image.src}
              alt={ABOUT.image.alt}
              fill
              priority
              className="object-cover object-[center_28%] max-[900px]:object-[center_22%]"
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 64px), 540px"
            />
          </div>

          <Reveal delay={0.1}>
            <div className="font-mono text-xs tracking-[0.14em] text-teal uppercase">{ABOUT.tagline}</div>
            <div className="mt-3 font-mono text-xs tracking-[0.14em] text-gold uppercase">{ABOUT.eyebrow}</div>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {ABOUT.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-paper-dim">{ABOUT.description}</p>
            <p className="mt-6 max-w-[540px] font-display text-[clamp(18px,2.4vw,22px)] leading-[1.5] text-paper-dim italic">
              {FOUNDER.story}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-[auto_1fr] items-center gap-6 border-y border-line py-10 max-sm:grid-cols-1">
          <Reveal className="relative mx-auto h-28 w-28 overflow-hidden rounded-full max-sm:h-24 max-sm:w-24">
            <Image
              src={FOUNDER.image.src}
              alt={FOUNDER.image.alt}
              fill
              className="object-cover object-center"
              sizes="112px"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="font-display text-[22px] font-medium">{FOUNDER.name}</div>
            <div className="mt-1 text-sm text-grey">{FOUNDER.role}</div>
            <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-paper-dim">{FOUNDER.story}</p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {ABOUT.verification.eyebrow}
            </div>
            <h3 className="mt-3 max-w-[640px] font-display text-[clamp(24px,3vw,34px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {ABOUT.verification.heading}
            </h3>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.75] text-paper-dim">
              {ABOUT.verification.description}
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {ABOUT.verification.pillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={index * 0.08}
                className="grid grid-cols-[1.1fr_0.9fr] items-center gap-8 overflow-hidden rounded-md border border-line bg-ink-card max-[820px]:grid-cols-1"
              >
                <div className="px-7 py-8 max-sm:px-5">
                  <h4 className="font-display text-[clamp(22px,2.8vw,28px)] font-medium">{pillar.title}</h4>
                  <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-grey">{pillar.body}</p>
                </div>
                <div className="relative aspect-[16/10] min-h-[200px] max-[820px]:aspect-[16/9]">
                  <Image
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 820px) 100vw, 480px"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center">
            <GetMatchedButton variant="teal" className="px-8 py-3.5 text-[15px]" forceHomeowner showReassurance />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
