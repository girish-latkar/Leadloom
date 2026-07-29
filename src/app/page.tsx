import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LeadQualification } from "@/components/sections/LeadQualification";
import { Testimonials } from "@/components/sections/Testimonials";
import { PuneNetwork } from "@/components/sections/PuneNetwork";
import { WhatWeDeliver } from "@/components/sections/WhatWeDeliver";
import { StartYourSearch } from "@/components/sections/StartYourSearch";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LeadQualification />
        <Testimonials />
        <PuneNetwork />
        <WhatWeDeliver />
        <StartYourSearch />
      </main>
      <Footer />
    </>
  );
}
