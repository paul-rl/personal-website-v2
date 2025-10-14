// components/Radar.tsx
"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Adaptability from "@/app/components/icons/radar/Adaptability";
import Collaboration from "@/app/components/icons/radar/Collaboration";
import Communication from "@/app/components/icons/radar/Communication";
import Initiative from "@/app/components/icons/radar/Initiative";
import Ownership from "@/app/components/icons/radar/Ownership";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;
type IconEntry = { Comp: IconComp; label: string; description: string };

const ICONS: IconEntry[] = [
  { Comp: Communication, label: "COMMUNICATION", description: "Clear, timely, audience-aware; keeps teams aligned." },
  { Comp: Collaboration, label: "COLLABORATION", description: "Builds together, unblocks others, shares context." },
  { Comp: Ownership,     label: "OWNERSHIP",     description: "Takes responsibility from start to finish." },
  { Comp: Adaptability,  label: "ADAPTABILITY",  description: "Adjusts quickly to new info and constraints." },
  { Comp: Initiative,    label: "INITIATIVE",    description: "Spots opportunities and kickstarts progress." },
];

const START_ANGLE_DEG = -90;
const ICON_PCT        = 12;
const EDGE_GAP_PCT    = 1;
const RING_CLEAR_PCT  = 4;

/* ---------- Tooltip shown in a portal so it never gets clipped ---------- */
function PortalTooltip({
  anchorRect,
  label,
  description,
  visible,
}: {
  anchorRect: DOMRect | null;
  label: string;
  description: string;
  visible: boolean;
}) {
  const [pos, setPos] = useState<{ cx: number; y: number; below: boolean } | null>(null);

  useEffect(() => {
    if (!visible || !anchorRect) return;
    const gap = 12;
    const cx = anchorRect.left + anchorRect.width / 2;
    // flip if there isn't ~120px above; otherwise stay above by default
    const preferBelow = anchorRect.top < 120;
    const y = preferBelow ? anchorRect.bottom + gap : anchorRect.top - gap;
    setPos({ cx, y, below: preferBelow });
  }, [visible, anchorRect]);

  if (!visible || !pos || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="tooltip"
      style={{
        position: "fixed",
        left: pos.cx,                // center on icon
        top: pos.y,
        transform: pos.below ? "translateX(-50%)" : "translate(-50%, -100%)",
        zIndex: 60,
        pointerEvents: "none",
      }}
      className={[
        "w-max max-w-[min(90vw,28rem)]", // may overflow if text is super long; still centered
        "border-[color:var(--golden)] border-[1.6px]",
        "bg-[color:var(--tooltip-bg,#1f2128)]",
        "px-4 py-3 shadow-lg opacity-100",
      ].join(" ")}
    >
      <div className="text-center">
        <div className="font-semibold tracking-wide text-[var(--cream,#e6e6e6)] uppercase">
          {label}
        </div>
        <div className="mt-1 text-sm text-[color:var(--muted,#cfcfcf)]">
          {description}
        </div>
      </div>

      {/* pointer perfectly centered under/over box, attached, gold sides only */}
      <span
        aria-hidden
        className="absolute left-1/2"
        style={{
          position: "absolute",
          transform: "translateX(-50%)",
          top: pos.below ? -1 : undefined,
          bottom: pos.below ? undefined : -1,
          height: 0, width: 0,
        }}
      >
        {/* outer gold */}
        <span
          className="absolute block"
          style={{
            width: 0, height: 0,
            ...(pos.below
              ? {
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "12px solid var(--golden)",
                  transform: "translateY(-1px)", // hide top edge under box
                }
              : {
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: "12px solid var(--golden)",
                  transform: "translateY(1px)",  // hide top edge under box
                }),
          }}
        />
        {/* inner fill */}
        <span
          className="absolute block"
          style={{
            width: 0, height: 0,
            ...(pos.below
              ? {
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderBottom: "11px solid var(--tooltip-bg, #1f2128)",
                }
              : {
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderTop: "11px solid var(--tooltip-bg, #1f2128)",
                }),
          }}
        />
      </span>
    </div>,
    document.body
  );
}



/* ------------------------------- Main Radar ------------------------------ */
export default function Radar({ className = "" }: { className?: string }) {
  const COUNT = 5;
  const step = 360 / COUNT;

  const icons = Array.from({ length: COUNT }, (_, i) => ICONS[i % ICONS.length]);

  const iconCenterR = 50 - (ICON_PCT / 2 + EDGE_GAP_PCT);
  const radarInsetPct = ICON_PCT / 2 + EDGE_GAP_PCT + RING_CLEAR_PCT;

  return (
    <div className={`relative aspect-square mx-auto overflow-visible ${className}`}>
      {/* Radar image */}
      <div className="absolute" style={{ inset: `${radarInsetPct}%` }}>
        <Image
          src="/images/icons/radar.svg"
          alt="Skills radar"
          fill
          className="object-contain object-center"
          sizes="(min-width:768px) 320px, 38vw"
          priority
        />
      </div>

      {/* Icons */}
      {icons.map(({ Comp, label, description }, i) => {
        const angle = ((START_ANGLE_DEG + i * step) * Math.PI) / 180;
        const x = 50 + Math.cos(angle) * iconCenterR;
        const y = 50 + Math.sin(angle) * iconCenterR;

        // local hover state for portal tooltip
        const buttonRef = useRef<HTMLDivElement | null>(null);
        const [hover, setHover] = useState(false);
        const [rect, setRect] = useState<DOMRect | null>(null);

        useEffect(() => {
          if (!hover || !buttonRef.current) return;
          const r = buttonRef.current.getBoundingClientRect();
          setRect(r);
        }, [hover]);

        return (
          <div
            key={`${label}-${i}`}
            ref={buttonRef}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${ICON_PCT}%`,
              height: `${ICON_PCT}%`,
            }}
            role="button"
            aria-label={label}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
          >
            {/* ICON — brighter on hover (with fallback color) */}
            <Comp
              className="w-full h-full text-[color:var(--golden)] transition-colors duration-150 group-hover:text-[color:var(--golden-bright,#f3d36a)]"
            />

            {/* Portal tooltip (never clipped) */}
            <PortalTooltip
              anchorRect={rect}
              label={label}
              description={description}
              visible={hover}
            />
          </div>
        );
      })}
    </div>
  );
}
