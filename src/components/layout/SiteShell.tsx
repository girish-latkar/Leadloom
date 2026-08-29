"use client";

import type { ReactNode } from "react";

import { AudienceProvider } from "@/context/AudienceContext";
import { GetStartedProvider } from "@/context/GetStartedContext";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AudienceProvider>
      <GetStartedProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </GetStartedProvider>
    </AudienceProvider>
  );
}
