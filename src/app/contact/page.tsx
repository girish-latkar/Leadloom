import type { Metadata } from "next";

import { ContactDetails } from "@/components/layout/ContactDetails";
import { SiteShell } from "@/components/layout/SiteShell";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { GetMatchedButton } from "@/components/ui/GetMatchedButton";
import { Reveal } from "@/components/ui/Reveal";
import { CTA, SITE } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Leadloom | Interior Designer Matching in Pune",
  description:
    "Get in touch with Leadloom by email, phone or WhatsApp. We help homeowners in Pune find interior designers matched to their project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <section id="contact" className="scroll-mt-[72px] border-b border-line bg-ink-soft py-24 max-sm:py-20">
        <div className="mx-auto max-w-[760px] px-8 max-sm:px-5">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.14em] text-grey uppercase">Contact</p>
            <h1 className="mt-3 font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.02em]">
              Get in touch with {SITE.name}
            </h1>
            <p className="mt-4 text-[15px] leading-[1.75] text-paper-dim">
              Questions about your project, designer applications, or how matching works? Reach us
              directly — we respond within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 rounded-md border border-line bg-ink-card px-7 py-8 max-sm:px-5">
            <ContactDetails />
            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-xs tracking-[0.14em] text-grey uppercase">Social</p>
              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 flex flex-col items-start gap-3">
            <GetMatchedButton variant="teal" className="px-8 py-3.5 text-[15px]" forceHomeowner />
            <p className="text-xs leading-relaxed text-grey">{CTA.reassurance}</p>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
