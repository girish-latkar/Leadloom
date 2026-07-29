import Image from "next/image";

import { HERO } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const FADE_UP = "animate-fade-up translate-y-4 opacity-0";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[120px] pb-[90px]">
      <div className="relative z-[2] mx-auto grid max-w-[1180px] grid-cols-[1.05fr_0.95fr] items-center gap-12 px-8 max-[900px]:grid-cols-1 max-sm:px-5">
        <div>
          <div className={`${FADE_UP} font-mono text-xs tracking-[0.14em] text-grey uppercase [animation-delay:0.05s]`}>
            {HERO.eyebrow}
          </div>

          <h1 className={`${FADE_UP} mt-[18px] font-display text-[clamp(34px,4.8vw,58px)] leading-[1.06] font-medium tracking-[-0.02em] [animation-delay:0.15s]`}>
            {HERO.heading}
          </h1>

          <p className={`${FADE_UP} mt-[22px] max-w-[500px] text-lg leading-relaxed text-paper-dim [animation-delay:0.3s]`}>
            {HERO.description}
          </p>

          <div className={`${FADE_UP} mt-9 flex flex-wrap gap-3.5 [animation-delay:0.45s]`}>
            {HERO.ctas.map((cta) => (
              <Button key={cta.label} href={cta.href} variant={cta.variant} className="px-6 py-3">
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        <div className={`${FADE_UP} relative aspect-[4/3] overflow-hidden rounded-md [animation-delay:0.35s]`}>
          <Image
            src={HERO.image.src}
            alt={HERO.image.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 900px) 100vw, 540px"
          />
        </div>
      </div>
    </section>
  );
}
