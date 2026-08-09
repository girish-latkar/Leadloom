import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: `About — ${SITE.name}`,
  description:
    "Learn about LeadLoom's mission to connect homeowners with verified interior designers across India.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <About />
    </SiteShell>
  );
}
