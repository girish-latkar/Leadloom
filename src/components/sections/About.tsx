import Image from "next/image";

import { ABOUT } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-[72px] border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md max-[900px]:aspect-[16/10]">
            <div className="absolute inset-y-0 left-0 w-[200%]">
              <Image
                src={ABOUT.image.src}
                alt={ABOUT.image.alt}
                fill
                className="object-cover object-left"
                sizes="(max-width: 900px) 100vw, 540px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="font-mono text-xs tracking-[0.14em] text-gold uppercase">
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
      </div>
    </section>
  );
}
