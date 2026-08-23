import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: `Services — ${SITE.name}`,
  description:
    "From designer matching to quote comparison — LeadLoom helps Pune homeowners find verified interior designers with full transparency, completely free.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <Services />
    </SiteShell>
  );
}
