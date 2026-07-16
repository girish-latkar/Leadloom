import { Button } from "@/components/ui/Button";
import { ClockIcon } from "@/components/ui/icons";
import { LoomVisual } from "@/components/sections/LoomVisual";

const FADE_UP = "animate-fade-up translate-y-4 opacity-0";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[120px] pb-[90px]">
      <div className="relative z-[2] mx-auto grid max-w-[1180px] grid-cols-[1.1fr_0.9fr] items-center gap-10 px-8 max-[900px]:grid-cols-1 max-sm:px-5">
        <div>
          <div className={`${FADE_UP} font-mono text-xs tracking-[0.14em] text-grey uppercase [animation-delay:0.05s]`}>
            Interior design, matched properly
          </div>

          <h1 className={`${FADE_UP} mt-[18px] font-display text-[clamp(38px,5.4vw,64px)] leading-[1.04] font-medium tracking-[-0.01em] [animation-delay:0.15s]`}>
            Fewer leads.
            <br />
            <em className="text-gold italic">Better</em> matches.
          </h1>

          <p className={`${FADE_UP} mt-[22px] max-w-[480px] text-lg leading-relaxed text-paper-dim [animation-delay:0.3s]`}>
            Leadloom weaves homeowners together with the interior designers who actually fit their
            home, budget, and taste — so designers stop chasing cold leads, and homeowners stop
            scrolling portfolios that don&apos;t fit.
          </p>

          <div className={`${FADE_UP} mt-9 flex flex-wrap gap-3.5 [animation-delay:0.45s]`}>
            <Button href="#homeowner-form" variant="teal">
              I&apos;m looking for a designer
            </Button>
            <Button href="#designer-form" variant="gold">
              I&apos;m a designer
            </Button>
          </div>

          <div className={`${FADE_UP} mt-[22px] flex items-center gap-2 text-[13px] text-grey [animation-delay:0.6s]`}>
            <ClockIcon />
            Every match is reviewed before it&apos;s sent — not auto-blasted to twenty inboxes.
          </div>
        </div>

        <LoomVisual />
      </div>
    </section>
  );
}
