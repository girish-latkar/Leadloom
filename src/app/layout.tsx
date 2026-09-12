import type { Metadata } from "next";
import { headers } from "next/headers";

import { JsonLd } from "@/components/seo/JsonLd";
import { getRootMetadata, getStructuredData } from "@/lib/seo";
import { isIndexableHost } from "@/lib/siteUrl";

import "./globals.css";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400..900;1,400..900&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host");
  return getRootMetadata(isIndexableHost(host));
}

/**
 * Applies a saved manual theme before first paint (prevents a
 * flash of the wrong theme). "auto" mode sets no attribute, so
 * CSS falls back to the system preference.
 */
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var t = localStorage.getItem("leadloom-theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <JsonLd data={getStructuredData()} />
        {children}
      </body>
    </html>
  );
}
