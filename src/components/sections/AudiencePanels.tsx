import { DESIGNER_PANEL, HOMEOWNER_PANEL } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { CheckIcon } from "@/components/ui/icons";

type PanelContent = typeof DESIGNER_PANEL | typeof HOMEOWNER_PANEL;

interface PanelProps {
  id: string;
  color: "gold" | "teal";
  content: PanelContent;
  className?: string;
}

function Panel({ id, color, content, className }: PanelProps) {
  return (
    <Reveal
      id={id}
      className={cn(
        "relative overflow-hidden px-12 py-[90px] max-sm:px-6 max-sm:py-16",
        className,
      )}
    >
      <ThreadTag color={color}>{content.tag}</ThreadTag>

      <h2 className="mt-5 max-w-[420px] font-display text-[clamp(26px,3vw,34px)] font-medium tracking-[-0.01em]">
        {content.heading}
      </h2>
      <p className="mt-4 max-w-[420px] text-[15.5px] leading-[1.65] text-paper-dim">
        {content.description}
      </p>

      <ul className="mt-7 max-w-[420px] list-none p-0">
        {content.features.map((feature, index) => (
          <li
            key={feature}
            className={cn(
              "flex gap-3 border-t border-line py-[13px] text-[14.5px] text-paper-dim",
              "transition-[color,padding-left] duration-300 ease-out-loom hover:pl-1.5 hover:text-paper",
              index === content.features.length - 1 && "border-b",
            )}
          >
            <CheckIcon color={color} />
            {feature}
          </li>
        ))}
      </ul>

      <Button href={content.cta.href} variant={color} className="mt-8">
        {content.cta.label}
      </Button>
    </Reveal>
  );
}

export function AudiencePanels() {
  return (
    <section className="border-b border-line">
      <div className="grid grid-cols-2 max-[900px]:grid-cols-1">
        <Panel
          id="designers"
          color="gold"
          content={DESIGNER_PANEL}
          className={cn(
            "border-r border-line bg-linear-160 from-ink-soft to-ink to-70%",
            "max-[900px]:border-r-0 max-[900px]:border-b",
          )}
        />
        <Panel
          id="homeowners"
          color="teal"
          content={HOMEOWNER_PANEL}
          className="bg-linear-200 from-ink-soft to-ink to-70%"
        />
      </div>
    </section>
  );
}
