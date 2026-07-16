import { FOOTER_COLUMNS, SITE } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="pt-14 pb-[42px]">
      <Reveal className="mx-auto flex max-w-[1180px] flex-wrap items-start justify-between gap-6 px-8 max-sm:px-5">
        <div>
          <div className="font-display text-[19px] font-semibold">{SITE.name}</div>
          <p className="mt-2 max-w-[280px] text-[13.5px] leading-normal text-grey">
            Weaving homeowners and interior designers into matches worth making.
          </p>
        </div>

        <div className="flex flex-wrap gap-9">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h5 className="mb-3 font-mono text-[11.5px] font-normal tracking-[0.1em] text-grey uppercase">
                {column.heading}
              </h5>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="mb-[9px] block text-[13.5px] text-paper-dim no-underline transition-[color,padding-left] duration-250 ease-out-loom hover:pl-1 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-[1180px] flex-wrap justify-between gap-2.5 border-t border-line px-8 pt-6 text-[12.5px] text-grey-soft max-sm:px-5">
        <span>© 2026 {SITE.name}. All rights reserved.</span>
        <span>Quality over quantity, always.</span>
      </div>
    </footer>
  );
}
