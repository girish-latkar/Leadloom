"use client";

import { useEffect, useRef, useState } from "react";

import { DESIGNER_FORM, HOMEOWNER_FORM } from "@/lib/formConfig";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/sections/SectionHead";
import { LeadForm } from "@/components/forms/LeadForm";

type ActiveForm = "designer-form" | "homeowner-form" | null;

function getActiveFormFromHash(): ActiveForm {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "");
  if (hash === "designer-form" || hash === "homeowner-form") return hash;
  return null;
}

export function LeadForms() {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set initial state from URL hash (handles direct links)
    setActiveForm(getActiveFormFromHash());

    function onHashChange() {
      setActiveForm(getActiveFormFromHash());
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll into view whenever the active form changes
  useEffect(() => {
    if (activeForm === null) return;
    // Small delay lets the DOM paint the section before scrolling
    const timer = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(timer);
  }, [activeForm]);

  // Don't render the section at all when no form is active
  if (activeForm === null) return null;

  return (
    <section ref={sectionRef} id="forms" className="py-[100px]">
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
