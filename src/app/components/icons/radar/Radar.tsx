// components/Radar.tsx
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import Adaptability from "@/app/components/icons/radar/sections/Adaptability";
import Collaboration from "@/app/components/icons/radar/sections/Collaboration";
import Communication from "@/app/components/icons/radar/sections/Communication";
import Initiative from "@/app/components/icons/radar/sections/Initiative";
import Ownership from "@/app/components/icons/radar/sections/Ownership";

/** Each icon is a React component (from SVGR). */
type IconComp = ComponentType<SVGProps<SVGSVGElement>>;
type IconEntry = { Comp: IconComp; label: string };

const ICONS: IconEntry[] = [
  { Comp: Communication, label: "Communication" },
  { Comp: Collaboration, label: "Collaboration" },
  { Comp: Ownership,     label: "Ownership" },
  { Comp: Adaptability,  label: "Adaptability" },
  { Comp: Initiative,    label: "Initiative" },
];

/** Tuning knobs */
const START_ANGLE_DEG = -90; // -90 = top; nudge to center on your slices
const ICON_PCT        = 10;   // icon width as % of the square (scales with box)
const EDGE_GAP_PCT    = 1;   // margin from square edge so nothing touches
const RING_CLEAR_PCT  = 3;   // extra space between icon edge and radar edge

export default function Radar() {
  const COUNT = 5;
  const step = 360 / COUNT;

  // Always render 5 markers (repeat icons if fewer provided)
  const icons = Array.from({ length: COUNT }, (_, i) => ICONS[i % ICONS.length]);

  // Radius for icon centers (in % of square from the center)
  const iconCenterR = 50 - (ICON_PCT / 2 + EDGE_GAP_PCT);

  // Inset the radar so its edge sits inside the icons
  const radarInsetPct = ICON_PCT / 2 + EDGE_GAP_PCT + RING_CLEAR_PCT;

  return (
    // Parent wrapper you already have is: relative w-[clamp(160px,38vw,320px)] aspect-square
    <div className="absolute inset-0 overflow-hidden">
      {/* Inner square the radar will live in */}
      <div
        className="absolute"
        style={{ inset: `${radarInsetPct}%` }}
      >
        <Image
          src="/images/icons/radar.svg"
          alt="Skills radar"
          fill
          className="object-contain object-center"
          sizes="(min-width:768px) 320px, 38vw"
          priority
        />
      </div>

      {/* Icons whose outer edges define the square boundary */}
      {icons.map(({ Comp, label }, i) => {
        const angle = ((START_ANGLE_DEG + i * step) * Math.PI) / 180;
        const x = 50 + Math.cos(angle) * iconCenterR;
        const y = 50 + Math.sin(angle) * iconCenterR;

        return (
          <div
            key={`${label}-${i}`}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-cream"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${ICON_PCT}%`,
              height: `${ICON_PCT}%`,
            }}
            title={label}
            aria-label={label}
          >
            {/* Color via text-* (SVGR icons should use currentColor) */}
            <Comp className="w-full h-full" />

          </div>
        );
      })}
    </div>
  );
}
