import { SiteShell } from "@/components/layout/SiteShell";
import { MainContent } from "@/components/sections/MainContent";
import { createPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <SiteShell>
      <MainContent />
    </SiteShell>
  );
}
