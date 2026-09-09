import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { About } from "@/components/sections/About";
import { createPageMetadata, getBreadcrumbStructuredData } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Leadloom | Interior Designer Matching in Pune",
  description:
    "Learn how Leadloom reviews interior designers in Pune and matches homeowners by budget, style, location and project requirements.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <JsonLd
        data={getBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <About />
    </SiteShell>
  );
}
