import ComputerIcon from "@/app/components/icons/ComputerIcon"
import PaletteIcon from "@/app/components/icons/PaletteIcon"
import Radar from "@/app/components/icons/Radar";

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
    labels: ["Communication", "Collaboration", "Ownership", "Adaptability", "Initiative"],
    values: [0.7, 0.5, 0.3, 0.6, 0.8],
  },
  className = "",
}: InfoSectionProps) {
  return (
    <section className={`flex flex-col md:flex-row md:items-center gap-6 md:gap-16 ${className}`}>
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

      {/* Right: Radar */}
      <div className="relative w-[clamp(160px,38vw,320px)] aspect-square">
        <Radar />
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
                rounded-full bg-light-blue
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
