import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "LeadLoom connects homeowners with verified interior designers in Pune — matched by budget, style, and location. No guesswork. No hidden costs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <About />
    </SiteShell>
  );
}
