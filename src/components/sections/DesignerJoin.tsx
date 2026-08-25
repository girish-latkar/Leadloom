"use client";

import { GetMatchedButton } from "@/components/ui/GetMatchedButton";
import { Reveal } from "@/components/ui/Reveal";

export function DesignerJoin() {

  return (
    <section className="border-b border-line py-20 max-sm:py-16">
      <div className="mx-auto max-w-[1180px] px-8 text-center max-sm:px-5">
        <Reveal>
          <GetMatchedButton variant="gold" className="px-10 py-3.5 text-[15px]" />
        </Reveal>
      </div>
    </section>
  );
}
