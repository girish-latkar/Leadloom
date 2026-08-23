"use client";

import { useState } from "react";

import { INQUIRY_FORM } from "@/lib/formConfig";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/ui/Reveal";

export function HomeownerEnquiry() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="border-b border-line py-[72px] max-sm:py-14">
      <div className="mx-auto max-w-[1180px] px-8 text-center max-sm:px-5">
        <Reveal>
          <Button
            type="button"
            variant="gold"
            className="px-10 py-3.5 text-[15px]"
            onClick={() => setFormOpen(true)}
          >
            Find Your Designer
          </Button>
        </Reveal>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} label="Homeowner enquiry form">
        <LeadForm key={formOpen ? "open" : "closed"} config={INQUIRY_FORM} embedded />
      </Modal>
    </section>
  );
}
