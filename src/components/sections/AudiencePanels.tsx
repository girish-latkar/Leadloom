"use client";

import { useState } from "react";

import { DESIGNER_PANEL, HOMEOWNER_PANEL } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ThreadTag } from "@/components/ui/ThreadTag";
import { CheckIcon } from "@/components/ui/icons";

type Tab = "designers" | "homeowners";
type PanelContent = typeof DESIGNER_PANEL | typeof HOMEOWNER_PANEL;

interface PanelProps {
  id: string;
  color: "gold" | "teal";
  content: PanelContent;
  active: boolean;
}

function Panel({ id, color, content, active }: PanelProps) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={cn(
        "absolute inset-0 w-full",
        active ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{ display: active ? "block" : "none" }}
    >
      {/* Ambient background gradient */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.12]",
          color === "gold"
            ? "bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--gold),transparent)]"
            : "bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--teal),transparent)]",
        )}
      />

      {/* Floating orb — top right */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-[-100px] top-[-100px] h-[450px] w-[450px] rounded-full opacity-[0.06] blur-[100px]",
          color === "gold" ? "bg-gold" : "bg-teal",
        )}
      />
      {/* Floating orb — bottom left */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-[-80px] left-[-80px] h-[300px] w-[300px] rounded-full opacity-[0.04] blur-[80px]",
          color === "gold" ? "bg-gold" : "bg-teal",
        )}
      />

      <div className="relative mx-auto flex max-w-[780px] flex-col items-center px-8 py-[100px] text-center max-sm:px-5 max-sm:py-16">
        {/* Thread tag — animated */}
        <div
          key={`${id}-tag`}
          className="animate-panel-in"
          style={{ animationDelay: "0ms" }}
        >
          <ThreadTag color={color}>{content.tag}</ThreadTag>
        </div>

        {/* Heading — animated */}
        <h2
          key={`${id}-heading`}
          className="animate-panel-in mt-6 max-w-[600px] font-display text-[clamp(30px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.02em]"
          style={{ animationDelay: "60ms" }}
        >
          {content.heading}
        </h2>

        {/* Description — animated */}
        <p
          key={`${id}-desc`}
          className="animate-panel-in mt-5 max-w-[520px] text-[16px] leading-[1.7] text-paper-dim"
          style={{ animationDelay: "120ms" }}
        >
          {content.description}
        </p>

        {/* Feature list — staggered */}
        <ul
          key={`${id}-features`}
          className="mt-10 w-full max-w-[520px] list-none p-0 text-left"
        >
          {content.features.map((feature, index) => (
            <li
              key={feature}
              className={cn(
                "animate-feature-in flex items-start gap-3 border-t border-line py-[13px] text-[14.5px] text-paper-dim",
                "transition-[color,padding-left] duration-300 ease-out-loom hover:pl-2 hover:text-paper",
                index === content.features.length - 1 && "border-b",
              )}
              style={{ animationDelay: `${200 + index * 70}ms` }}
            >
              <span className="mt-[2px] shrink-0">
                <CheckIcon color={color} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA — animated */}
        <div
          key={`${id}-cta`}
          className="animate-panel-in mt-10"
          style={{ animationDelay: `${200 + content.features.length * 70 + 60}ms` }}
        >
          <Button href={content.cta.href} variant={color} className="px-8 py-3.5 text-[15px]">
            {content.cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AudiencePanels() {
  const [activeTab, setActiveTab] = useState<Tab>("designers");

  return (
    <section id="services" className="border-b border-line">
      {/* Tab switcher — centered */}
      <div className="border-b border-line bg-ink-soft/60">
        <div className="mx-auto flex max-w-[1180px] items-center justify-center gap-1 px-8 pt-5 max-sm:px-5">
          {/* Designers tab */}
          <button
            id="tab-designers"
            role="tab"
            aria-selected={activeTab === "designers"}
            aria-controls="designers"
            onClick={() => setActiveTab("designers")}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-t-[6px] px-6 py-3 text-sm font-medium",
              "transition-all duration-250 ease-out-loom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
              activeTab === "designers"
                ? "bg-ink text-paper"
                : "text-grey hover:text-paper-dim",
            )}
          >
            <span
              className={cn(
                "absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gold transition-all duration-300 ease-out-loom",
                activeTab === "designers" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
              )}
            />
            <span
              className={cn(
                "h-[7px] w-[7px] rounded-full border transition-all duration-250",
                activeTab === "designers"
                  ? "border-transparent bg-gold scale-110"
                  : "border-grey-soft bg-transparent group-hover:border-gold-soft",
              )}
            />
            For Designers
          </button>

          {/* Homeowners tab */}
          <button
            id="tab-homeowners"
            role="tab"
            aria-selected={activeTab === "homeowners"}
            aria-controls="homeowners"
            onClick={() => setActiveTab("homeowners")}
            className={cn(
              "group relative flex items-center gap-2.5 rounded-t-[6px] px-6 py-3 text-sm font-medium",
              "transition-all duration-250 ease-out-loom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40",
              activeTab === "homeowners"
                ? "bg-ink text-paper"
                : "text-grey hover:text-paper-dim",
            )}
          >
            <span
              className={cn(
                "absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-teal transition-all duration-300 ease-out-loom",
                activeTab === "homeowners" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
              )}
            />
            <span
              className={cn(
                "h-[7px] w-[7px] rounded-full border transition-all duration-250",
                activeTab === "homeowners"
                  ? "border-transparent bg-teal scale-110"
                  : "border-grey-soft bg-transparent group-hover:border-teal-soft",
              )}
            />
            For Homeowners
          </button>
        </div>
      </div>

      {/* Panel container — fixed height so it doesn't collapse */}
      <div
        role="tablist"
        aria-label="Audience"
        className="relative min-h-[620px] max-sm:min-h-0"
      >
        <Panel
          id="designers"
          color="gold"
          content={DESIGNER_PANEL}
          active={activeTab === "designers"}
        />
        <Panel
          id="homeowners"
          color="teal"
          content={HOMEOWNER_PANEL}
          active={activeTab === "homeowners"}
        />
      </div>
    </section>
  );
}
