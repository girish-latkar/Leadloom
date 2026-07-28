"use client";

import { useEffect, useRef } from "react";

import { DESIGNER_FORM, HOMEOWNER_FORM } from "@/lib/formConfig";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { LeadForm } from "@/components/forms/LeadForm";
import { useActiveForm } from "@/context/FormNavigationContext";

export function LeadForms() {
  const activeForm = useActiveForm();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll into view whenever the active form changes
  useEffect(() => {
    if (activeForm === null) return;
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(timer);
  }, [activeForm]);

  // Don't render the section at all when no form is active
  if (activeForm === null) return null;

  return (
    <section ref={sectionRef} id="forms" className="scroll-mt-[72px] py-[100px]">
      <div className="mx-auto max-w-[1180px] px-8 max-sm:px-5">
        <SectionHead
          className="mb-11"
          eyebrow="Two threads, two forms"
          heading="Tell us which side of the loom you're on."
          description="Each form feeds a different queue — homeowner requests go to matching, designer applications go to verification. Nothing gets mixed together."
        />

        <div className="mx-auto max-w-[600px]">
          {activeForm === "designer-form" && (
            <Reveal key="designer-form">
              <LeadForm config={DESIGNER_FORM} />
            </Reveal>
          )}
          {activeForm === "homeowner-form" && (
            <Reveal key="homeowner-form">
              <LeadForm config={HOMEOWNER_FORM} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
