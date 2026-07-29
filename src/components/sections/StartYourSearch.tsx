import Image from "next/image";

import { INQUIRY_FORM } from "@/lib/formConfig";
import { START_YOUR_SEARCH } from "@/lib/constants";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/ui/Reveal";

export function StartYourSearch() {
  return (
    <section id="contact" className="py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-2 items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {START_YOUR_SEARCH.eyebrow}
            </div>
            <h2 className="mt-3.5 max-w-[480px] font-display text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-medium tracking-[-0.02em]">
              {START_YOUR_SEARCH.heading}
            </h2>
            <p className="mt-4 max-w-[440px] text-base leading-relaxed text-paper-dim">
              {START_YOUR_SEARCH.description}
            </p>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-md max-[900px]:hidden">
              <Image
                src={START_YOUR_SEARCH.image.src}
                alt={START_YOUR_SEARCH.image.alt}
                fill
                className="object-cover object-center"
                sizes="540px"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <LeadForm config={INQUIRY_FORM} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
