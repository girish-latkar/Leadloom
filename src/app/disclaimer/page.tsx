import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { SiteShell } from "@/components/layout/SiteShell";
import { CONTACT_INFO, SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Disclaimer | Leadloom",
  description: "Important disclaimers about the Leadloom interior designer matching service in Pune.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <SiteShell>
      <LegalPage
        title="Disclaimer"
        intro={`Please read this disclaimer before using ${SITE.name}.`}
      >
        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Matching service only</h2>
          <p className="mt-3">
            {SITE.name} provides a matching and introduction service for homeowners and interior
            designers in Pune. We do not provide interior design services directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Designer relationships</h2>
          <p className="mt-3">
            Any contract, quotation, timeline or design work is arranged directly between the homeowner
            and the designer. {SITE.name} is not responsible for disputes, delays, pricing or project
            outcomes between those parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Information on this website</h2>
          <p className="mt-3">
            Content on this website is provided for general information about our matching process. While
            we aim to keep information accurate and current, we do not guarantee that all details are
            complete or up to date at all times.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Testimonials</h2>
          <p className="mt-3">
            Testimonials reflect individual experiences and results may vary. They are not a guarantee of
            future outcomes for other users.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Contact</h2>
          <p className="mt-3">
            For questions about this disclaimer, contact{" "}
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
