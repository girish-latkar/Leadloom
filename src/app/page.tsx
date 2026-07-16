import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AudiencePanels } from "@/components/sections/AudiencePanels";
import { LeadForms } from "@/components/sections/LeadForms";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <AudiencePanels />
        <LeadForms />
      </main>
      <Footer />
    </>
  );
}
