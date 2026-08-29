import { PROCESS_STEPS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

export function HowItWorks() {
  return (
    <section id="about" className="border-b border-line py-[100px]">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <SectionHead
          className="mb-14"
          eyebrow="How the match gets made"
          heading="Three checks happen before anyone sees a lead."
          description="Most platforms sell contact information. Leadloom sells fit — every homeowner request is qualified and every designer profile is reviewed before a single thread is woven between them."
        />

        <div className="grid grid-cols-3 gap-px border border-line bg-line max-[820px]:grid-cols-1">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal
              key={step.num}
              delay={index * 0.12}
              className="bg-ink px-8 py-9 transition-[background-color,transform] duration-[350ms] ease-out-loom hover:-translate-y-1 hover:bg-ink-soft"
            >
              <div className="font-mono text-[13px] text-gold">{step.num}</div>
              <h3 className="mt-4 font-display text-[21px] font-medium tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-grey">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
