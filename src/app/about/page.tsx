import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description:
    "LeadLoom connects homeowners with verified interior designers in Pune — matched by budget, style, and location. No guesswork. No hidden costs.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <About />
    </SiteShell>
  );
}
