"use client";

import { FormNavigationProvider } from "@/context/FormNavigationContext";
import { AudiencePanels } from "@/components/sections/AudiencePanels";
import { LeadForms } from "@/components/sections/LeadForms";

export function FormSections() {
  return (
    <FormNavigationProvider>
      <AudiencePanels />
      <div id="contact">
        <LeadForms />
      </div>
    </FormNavigationProvider>
  );
}
