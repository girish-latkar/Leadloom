import Image from "next/image";

import { PUNE_NETWORK } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function PuneNetwork() {
  return (
    <section id="network" className="border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-center gap-12 px-8 max-[900px]:grid-cols-1 max-sm:px-5">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-md max-[900px]:order-2">
          <Image
            src={PUNE_NETWORK.image.src}
            alt={PUNE_NETWORK.image.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 900px) 100vw, 540px"
          />
        </Reveal>

        <Reveal delay={0.1} className="max-[900px]:order-1">
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
            {PUNE_NETWORK.heading}
          </h2>
          <p className="mt-5 text-[16px] leading-[1.75] text-paper-dim">{PUNE_NETWORK.description}</p>
          <Button href={PUNE_NETWORK.cta.href} variant="gold" className="mt-8 px-7 py-3.5">
            {PUNE_NETWORK.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
