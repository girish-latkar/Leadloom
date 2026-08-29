import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { MainContent } from "@/components/sections/MainContent";
import { createPageMetadata, getFaqStructuredData } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <SiteShell>
      <JsonLd data={getFaqStructuredData()} />
      <MainContent />
    </SiteShell>
  );
}
