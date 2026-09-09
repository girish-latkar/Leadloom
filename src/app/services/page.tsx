import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { Services } from "@/components/sections/Services";
import { createPageMetadata, getBreadcrumbStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Interior Designer Matching Services in Pune | Leadloom",
  description:
    "Leadloom helps Pune homeowners find interior designers matched to their budget, style and location — with one or two curated introductions, completely free.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteShell>
      <JsonLd
        data={getBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Services />
    </SiteShell>
  );
}
