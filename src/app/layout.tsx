import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { getRootMetadata, getStructuredData } from "@/lib/seo";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = getRootMetadata();

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <JsonLd data={getStructuredData()} />
        {children}
      </body>
    </html>
  );
}
