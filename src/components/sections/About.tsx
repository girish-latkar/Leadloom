import Image from "next/image";

import { ABOUT } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-[72px] border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
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
            <div className="font-mono text-xs tracking-[0.14em] text-teal uppercase">
              {ABOUT.tagline}
            </div>
            <div className="mt-3 font-mono text-xs tracking-[0.14em] text-gold uppercase">
              {ABOUT.eyebrow}
            </div>
            <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {ABOUT.heading}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-paper-dim">{ABOUT.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-ink-card px-5 py-5">
                <h3 className="font-display text-[17px] font-medium">{ABOUT.mission.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-grey">{ABOUT.mission.body}</p>
              </div>
              <div className="rounded-md border border-line bg-ink-card px-5 py-5">
                <h3 className="font-display text-[17px] font-medium">{ABOUT.vision.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-grey">{ABOUT.vision.body}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-line pt-16 max-sm:mt-14 max-sm:pt-12">
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

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.verification.pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08}>
                <div className="h-full rounded-md border border-line bg-ink-card px-5 py-5">
                  <h4 className="font-display text-[17px] font-medium">{pillar.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-grey">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
