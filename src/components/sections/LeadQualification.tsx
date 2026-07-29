import Image from "next/image";

import { LEAD_QUALIFICATION } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function QualificationCard({
  num,
  title,
  body,
  delay,
}: {
  num: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="flex flex-col bg-ink-card px-7 py-8 max-sm:px-5 max-sm:py-6">
      <div className="font-mono text-[13px] text-gold">{num}</div>
      <h3 className="mt-5 font-display text-[22px] font-medium tracking-[-0.01em]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-grey">{body}</p>
    </Reveal>
  );
}

function QualificationImage({
  src,
  alt,
  delay,
}: {
  src: string;
  alt: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="relative min-h-[280px] overflow-hidden bg-ink-card">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 33vw" />
    </Reveal>
  );
}

export function LeadQualification() {
  return (
    <section id="qualify" className="border-b border-line bg-ink-soft py-[100px] max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.14em] text-grey uppercase">
              {LEAD_QUALIFICATION.eyebrow}
            </div>
            <h2 className="mt-4 max-w-[520px] font-display text-[clamp(32px,4.2vw,52px)] leading-[1.08] font-medium tracking-[-0.02em]">
              {LEAD_QUALIFICATION.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-[420px] justify-self-end max-[900px]:justify-self-start">
            <p className="text-[16px] leading-[1.75] text-paper-dim">
              {LEAD_QUALIFICATION.description}
            </p>
            <Button
              href={LEAD_QUALIFICATION.cta.href}
              variant="ghost"
              className="mt-7 border-line px-6 py-3 text-[14px]"
            >
              {LEAD_QUALIFICATION.cta.label}
            </Button>
          </Reveal>
        </div>

        <div
          className={cn(
            "mt-16 grid gap-5",
            "grid-cols-3 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1",
          )}
        >
          {LEAD_QUALIFICATION.items.map((item, index) => {
            const delay = index * 0.06;
            if (item.type === "image") {
              return <QualificationImage key={item.src} src={item.src} alt={item.alt} delay={delay} />;
            }
            return (
              <QualificationCard
                key={item.num}
                num={item.num}
                title={item.title}
                body={item.body}
                delay={delay}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
