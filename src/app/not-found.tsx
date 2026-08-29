import Link from "next/link";

import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex min-h-[60vh] items-center border-b border-line py-24">
        <div className="mx-auto max-w-[640px] px-8 text-center max-sm:px-5">
          <p className="font-mono text-xs tracking-[0.14em] text-grey uppercase">404</p>
          <h1 className="mt-4 font-display text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.02em]">
            This page isn&apos;t on the loom
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-paper-dim">
            The link may be broken or the page may have moved. Head back home or find an interior
            designer in Pune through Leadloom.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="teal">
              Back to home
            </Button>
            <Link
              href="/services"
              className="text-sm font-medium text-paper-dim no-underline transition-colors hover:text-paper"
            >
              View services →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
