const DESIGNER_THREADS = [
  { d: "M20 40 C 140 90, 260 130, 380 60", delay: "0.2s" },
  { d: "M10 130 C 150 160, 250 190, 390 150", delay: "0.4s" },
  { d: "M20 220 C 150 250, 250 260, 380 230", delay: "0.6s" },
] as const;

const HOMEOWNER_THREADS = [
  { d: "M20 380 C 140 330, 260 290, 380 360", delay: "0.3s" },
  { d: "M10 290 C 150 260, 250 230, 390 270", delay: "0.5s" },
  { d: "M20 200 C 150 170, 250 160, 380 190", delay: "0.7s" },
] as const;

const DRAW_CLASSES = "animate-draw-line [stroke-dasharray:900] [stroke-dashoffset:900]";

/**
 * Gold (designer) and teal (homeowner) threads drawing in and
 * converging on a single pulsing node — the match.
 */
export function LoomVisual() {
  return (
    <div className="relative h-[420px]">
      <svg viewBox="0 0 400 420" fill="none" className="h-full w-full" aria-hidden="true">
        {DESIGNER_THREADS.map((thread) => (
          <path
            key={thread.d}
            d={thread.d}
            stroke="var(--gold)"
            strokeWidth="1.6"
            className={DRAW_CLASSES}
            style={{ animationDelay: thread.delay }}
          />
        ))}
        {HOMEOWNER_THREADS.map((thread) => (
          <path
            key={thread.d}
            d={thread.d}
            stroke="var(--teal)"
            strokeWidth="1.6"
            className={DRAW_CLASSES}
            style={{ animationDelay: thread.delay }}
          />
        ))}

        {/* convergence node */}
        <circle
          cx="200"
          cy="210"
          r="5"
          fill="var(--paper)"
          opacity="0"
          className="animate-fade-up [animation-delay:1.6s] [animation-duration:1s]"
        />
        <circle
          cx="200"
          cy="210"
          r="14"
          stroke="var(--paper)"
          strokeWidth="1"
          opacity="0"
          className="origin-center animate-node-pulse [transform-box:fill-box]"
        />
      </svg>
    </div>
  );
}
