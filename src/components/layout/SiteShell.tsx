"use client";

import type { ReactNode } from "react";

import { AudienceProvider } from "@/context/AudienceContext";
import { FooterContactProvider } from "@/context/FooterContactContext";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AudienceProvider>
      <FooterContactProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </FooterContactProvider>
    </AudienceProvider>
  );
}
