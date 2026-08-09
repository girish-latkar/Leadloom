import type { Metadata } from "next";

import { SITE } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: `Services — ${SITE.name}`,
  description:
    "Lead qualification for designers and verified designer matching for homeowners in Pune.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <Services />
    </SiteShell>
  );
}
