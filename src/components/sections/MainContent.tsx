"use client";

import { useAudience } from "@/context/AudienceContext";
import { Hero } from "@/components/sections/Hero";
import { LeadQualification } from "@/components/sections/LeadQualification";
import { Testimonials } from "@/components/sections/Testimonials";
import { PuneNetwork } from "@/components/sections/PuneNetwork";
import { DesignerJoin } from "@/components/sections/DesignerJoin";
import { StartYourSearch } from "@/components/sections/StartYourSearch";

export function MainContent() {
  const { audience } = useAudience();

  return (
    <>
      <Hero />
      {audience === "designers" ? (
        <>
          <LeadQualification />
          <Testimonials />
          <PuneNetwork />
          <DesignerJoin />
        </>
      ) : (
        <>
          <Testimonials />
          <StartYourSearch />
        </>
      )}
    </>
  );
}
