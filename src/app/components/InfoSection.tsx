type InfoSectionProps = {
  focus?: string;
  percent?: number; // 0..1
  mastery?: number; // 0..total
  radar?: {
    labels?: [string, string, string, string, string];
    values: [number, number, number, number, number];
  };
  className?: string;
};

export default function InfoSection({
  focus = "Full-Stack",
  percent = 0.4,
  mastery = 2,
  radar = {
    labels: ["Damage", "Toughness", "Control", "Mobility", "Utility"],
    values: [0.7, 0.5, 0.3, 0.6, 0.8],
  },
  className = "",
}: InfoSectionProps) {
  return (
    <section className={`flex items-center gap-[5rem] select-none ${className}`}>
      {/* Left: Info Stack */}
      <div className="min-w-[10rem] flex-1 space-y-4">
        {/* FOCUS */}
        <div>
          <div className="font-serif font-bold text-subhead text-[clamp(1rem,1vw+0.5rem,1.38rem)]">
            FOCUS:
          </div>
          <div className="font-sans text-cream text-[clamp(1rem,1vw+0.5rem,1.38rem)]">
            {focus}
          </div>
        </div>

        {/* APPROACH */}
        <div>
          <div className="font-serif font-bold text-subhead text-[clamp(1rem,1vw+0.5rem,1.38rem)]">
            APPROACH:
          </div>
          <StyleSlider position={percent} />
        </div>

        {/* MASTERY */}
        <div>
          <div className="font-serif font-bold text-subhead text-[clamp(1rem,1vw+0.5rem,1.38rem)]">
            MASTERY:
          </div>
          <MasteryBar value={mastery} />
        </div>
      </div>

      {/* Right: Circle placeholder */}
      <div className="relative w-[clamp(160px,38vw,320px)] aspect-square">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            className="stroke-white"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}

function StyleSlider({ position }: { position: number }) {
  const p = Math.max(0, Math.min(1, position));
  return (
    <div className="flex items-center gap-[.5rem] pointer-events-none select-none">
      <ComputerIcon className="w-[2rem] h-[2rem] text-cream" />

      {/* Flexible track fills remaining space */}
      <div className="relative flex-1">
        <div className="relative w-full h-[3px] bg-cream">
          {/* side padding equals knob radius (8px) */}
          <div className="absolute inset-0 px-2">
            <div
              className="
                absolute top-1/2 size-4
                -translate-y-1/2 -translate-x-1/2
                rounded-full bg-blue-500
                ring-1 ring-[var(--color-dark-blue)] ring-offset-0
              "
              style={{ left: `${p * 100}%` }}
            />
          </div>
        </div>
      </div>

      <PaletteIcon className="w-[2rem] h-[2rem] text-cream" />
    </div>
  );
}

type MasteryProps = {
  value: number;              // 0..total
  total?: number;             // default 3
  segmentWidthRem?: number;   // width of each pill (rem), default 4
};

function MasteryBar({
  value,
  total = 3,
  segmentWidthRem = 4,
}: MasteryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2" aria-label={`Mastery: ${value} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => {
          const on = i < value;
          return (
            <div
              key={i}
              className={[
                "h-[5px]",
                on ? "bg-[var(--color-light-blue)]" : "bg-[var(--color-dark-blue)]",
                "ring-1 ring-[var(--color-dark-blue)]",
              ].join(" ")}
              style={{ width: `${segmentWidthRem}rem` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* Icons */
function ComputerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z"
      />
    </svg>
  );
}

function PaletteIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 8.5H15.51M10.5 7.5H10.51M7.5 11.5H7.51M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.6569 19.6569 15 18 15H17.4C17.0284 15 16.8426 15 16.6871 15.0246C15.8313 15.1602 15.1602 15.8313 15.0246 16.6871C15 16.8426 15 17.0284 15 17.4V18C15 19.6569 13.6569 21 12 21ZM16 8.5C16 8.77614 15.7761 9 15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8ZM11 7.5C11 7.77614 10.7761 8 10.5 8C10.2239 8 10 7.77614 10 7.5C10 7.22386 10.2239 7 10.5 7C10.7761 7 11 7.22386 11 7.5ZM8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5Z" />
    </svg>
  );
}
