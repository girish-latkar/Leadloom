import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { SiteShell } from "@/components/layout/SiteShell";
import { CONTACT_INFO, SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use | Leadloom",
  description: "Terms governing use of the Leadloom website and project matching service in Pune.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalPage
        title="Terms of Use"
        intro={`These terms govern your use of the ${SITE.name} website and matching service.`}
      >
        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Service description</h2>
          <p className="mt-3">
            {SITE.name} helps homeowners in Pune find interior designers by reviewing project
            requirements and introducing one or two matched designers. {SITE.name} is free for
            homeowners and does not guarantee that a designer will be available for every request.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">No obligation to hire</h2>
          <p className="mt-3">
            Submitting a project request does not create a contract to hire a designer. Any agreement
            for design services is made directly between you and the designer you choose.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Accurate information</h2>
          <p className="mt-3">
            You agree to provide accurate contact and project information so we can review your request
            and make suitable introductions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Designer applications</h2>
          <p className="mt-3">
            Designers who apply to join the network agree that submitted portfolio and business
            information may be reviewed as part of the application process. Approval is not
            guaranteed.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Limitation of liability</h2>
          <p className="mt-3">
            {SITE.name} facilitates introductions between homeowners and designers. We are not a party
            to agreements between homeowners and designers and are not responsible for the quality,
            pricing or delivery of design services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Contact</h2>
          <p className="mt-3">
            Questions about these terms may be sent to{" "}
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-paper no-underline hover:text-gold">
              {CONTACT_INFO.email}
            </a>
            .
          </p>
        </section>

        <p className="text-sm text-grey">Last updated: August 2026</p>
      </LegalPage>
    </SiteShell>
  );
}
