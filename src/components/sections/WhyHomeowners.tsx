import { MATCHING_CRITERIA, WHY_HOMEOWNERS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";

export function WhyHomeowners() {
  return (
    <section id="why-leadloom" className="border-b border-line py-24 max-sm:py-20">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <SectionHead
          eyebrow={WHY_HOMEOWNERS.eyebrow}
          heading={WHY_HOMEOWNERS.heading}
          description={WHY_HOMEOWNERS.description}
          className="mb-14"
        />

        <div className="grid grid-cols-2 gap-px border border-line bg-line max-[820px]:grid-cols-1">
          <Reveal className="bg-ink px-8 py-9">
            <h3 className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {WHY_HOMEOWNERS.traditional.title}
            </h3>
            <ul className="mt-5 list-none space-y-3 p-0">
              {WHY_HOMEOWNERS.traditional.points.map((point) => (
                <li key={point} className="text-[15px] leading-relaxed text-paper-dim">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="bg-ink-soft px-8 py-9">
            <h3 className="font-mono text-xs tracking-[0.14em] text-teal uppercase">
              {WHY_HOMEOWNERS.leadloom.title}
            </h3>
            <ul className="mt-5 list-none space-y-3 p-0">
              {WHY_HOMEOWNERS.leadloom.points.map((point) => (
                <li key={point} className="text-[15px] leading-relaxed text-paper-dim">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10 border border-line bg-ink-card px-8 py-7 max-sm:px-5">
          <h3 className="font-display text-[20px] font-medium tracking-[-0.01em]">
            {MATCHING_CRITERIA.heading}
          </h3>
          <p className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-paper-dim">
            {MATCHING_CRITERIA.description}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5 list-none p-0">
            {MATCHING_CRITERIA.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-[0.06em] text-teal uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
