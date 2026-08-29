import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Services } from "@/components/sections/Services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Interior Design Matching Services in Pune | Leadloom",
  description:
    "Leadloom helps Pune homeowners find interior designers matched to their budget, style and location — with one or two curated introductions, completely free.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <Services />
    </SiteShell>
  );
}
