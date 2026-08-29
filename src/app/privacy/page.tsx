import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/LegalPage";
import { SiteShell } from "@/components/layout/SiteShell";
import { CONTACT_INFO, SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy | Leadloom",
  description: "How Leadloom collects, uses and protects information submitted through the website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <SiteShell>
      <LegalPage
        title="Privacy Policy"
        intro={`This policy explains how ${SITE.name} handles information you share when you use our website or submit a project request.`}
      >
        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Information we collect</h2>
          <p className="mt-3">
            When you submit a form, we collect the details you provide — such as your name, contact
            information, project location, property type, budget range, timeline and design preferences.
            Designer applications may also include studio details and portfolio links.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">How we use information</h2>
          <p className="mt-3">
            We use submitted information to review project requests, match homeowners with suitable
            interior designers in Pune, respond to enquiries and communicate about your request. We do
            not sell personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Sharing with designers</h2>
          <p className="mt-3">
            To make a meaningful introduction, we share relevant project details with matched designers.
            This typically includes your name, contact information, location, property type, budget
            range, timeline and style preferences.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Data retention</h2>
          <p className="mt-3">
            We retain submitted information for as long as needed to respond to your request, improve our
            matching process and maintain business records, unless a longer period is required by law.
          </p>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-medium text-paper">Contact</h2>
          <p className="mt-3">
            For privacy-related questions, contact us at{" "}
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
