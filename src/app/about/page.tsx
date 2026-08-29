import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Leadloom — Interior Designer Matching in Pune",
  description:
    "Learn how Leadloom reviews interior designers in Pune and matches homeowners by budget, style, location and project requirements.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <About />
    </SiteShell>
  );
}
