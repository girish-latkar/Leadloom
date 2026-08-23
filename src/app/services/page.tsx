import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Services } from "@/components/sections/Services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "From designer matching to quote comparison — LeadLoom helps Pune homeowners find verified interior designers with full transparency, completely free.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <Services />
    </SiteShell>
  );
}
