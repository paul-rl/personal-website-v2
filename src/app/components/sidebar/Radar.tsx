"use client";

import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef, useState, memo } from "react";
import { createPortal } from "react-dom";

import Adaptability from "@/app/components/icons/radar/Adaptability";
import Collaboration from "@/app/components/icons/radar/Collaboration";
import Communication from "@/app/components/icons/radar/Communication";
import Initiative from "@/app/components/icons/radar/Initiative";
import Ownership from "@/app/components/icons/radar/Ownership";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;
type IconEntry = { Comp: IconComp; label: string; description: string };

const ICONS: IconEntry[] = [
{ Comp: Communication, label: "COMMUNICATION", description: "The developer's ability to fire clear pings and write crisp docs so the team rotates together." },

{ Comp: Collaboration, label: "COLLABORATION", description: "The developer's ability to queue as a party and set teammates up for the play." },

{ Comp: Ownership, label: "OWNERSHIP", description: "The developer's ability to take a feature from draft to live, read the metrics, and fix misplays fast." },

{ Comp: Adaptability, label: "ADAPTABILITY", description: "The developer's ability to role-flex without tilt, learning new tech and shifting plans as the meta changes."  },

{ Comp: Initiative, label: "INITIATIVE", description: "The developer's ability to spot the next objective and kick it off before the timer hits zero." },

];

const START_ANGLE_DEG = -90;
const ICON_PCT        = 12;
const EDGE_GAP_PCT    = 1;
const RING_CLEAR_PCT  = 4;

/* ---------- Tooltip in a portal ---------- */
function PortalTooltip({
  anchorRect,
  label,
  description,
  visible,
  containerRect,
}: {
  anchorRect: DOMRect | null;
  label: string;
  description: string;
  visible: boolean;
  containerRect: DOMRect | null;
}) {
  const [pos, setPos] = useState<{ cx: number; y: number; below: boolean } | null>(null);

  useEffect(() => {
    if (!visible || !anchorRect) return;

    const gap = 12;
    const cx = anchorRect.left + anchorRect.width / 2;

    // Compare icon center vs. radar container center (fallback: viewport center)
    const containerMidY = containerRect
      ? containerRect.top + containerRect.height / 2
      : window.innerHeight / 2;

    const iconMidY = anchorRect.top + anchorRect.height / 2;
    const preferBelow = iconMidY >= containerMidY;

    const y = preferBelow ? anchorRect.bottom + gap : anchorRect.top - gap;
    setPos({ cx, y, below: preferBelow });
  }, [visible, anchorRect, containerRect]);

  if (!visible || !pos || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="tooltip"
      style={{
        position: "fixed",
        left: pos.cx,
        top: pos.y,
        transform: pos.below ? "translate(-50%, 5%)" : "translate(-50%, -100%)",
        zIndex: 60,
        pointerEvents: "none",
      }}
      className={[
        "w-max max-w-[min(90vw,28rem)]",
        "border-golden border-[1.6px]",
        "bg-button",
        "px-4 py-3 shadow-lg opacity-100",
      ].join(" ")}
    >
      <div className="text-center">
        <div className="font-semibold tracking-wide text-[var(--cream,#e6e6e6)] uppercase">
          {label}
        </div>
        <div className="mt-1 text-sm text-[color:var(--muted,#cfcfcf)]">{description}</div>
      </div>
    </div>,
    document.body
  );
}


/* ------------ Child component so hooks aren't inside .map() ------------- */
const IconHotspot = memo(function IconHotspot({
  Comp,
  label,
  description,
  leftPct,
  topPct,
  sizePct,
  containerRect,
}: {
  Comp: IconComp;
  label: string;
  description: string;
  leftPct: number;
  topPct: number;
  sizePct: number;
  containerRect: DOMRect | null;
}) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!hover || !buttonRef.current) return;
    setRect(buttonRef.current.getBoundingClientRect());
  }, [hover]);

  return (
    <div
      ref={buttonRef}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, width: `${sizePct}%`, height: `${sizePct}%` }}
      role="button"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Comp className="w-full h-full text-[color:var(--golden)] transition-colors duration-150 group-hover:text-[color:var(--golden-bright,#f3d36a)]" />
      <PortalTooltip
        anchorRect={rect}
        label={label}
        description={description}
        visible={hover}
        containerRect={containerRect}
      />
    </div>
  );
});


/* ------------------------------- Main Radar ------------------------------ */
export default function Radar({ className = "" }: { className?: string }) {
  const COUNT = 5;
  const step = 360 / COUNT;
  const icons = Array.from({ length: COUNT }, (_, i) => ICONS[i % ICONS.length]);

  const iconCenterR = 50 - (ICON_PCT / 2 + EDGE_GAP_PCT);
  const radarInsetPct = ICON_PCT / 2 + EDGE_GAP_PCT + RING_CLEAR_PCT;

  // NEW: measure the radar container
  const radarRef = useRef<HTMLDivElement | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!radarRef.current) return;
    const update = () => setContainerRect(radarRef.current!.getBoundingClientRect());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div ref={radarRef} className={`relative aspect-square mx-auto overflow-visible ${className}`}>
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

        return (
          <IconHotspot
            key={`${label}-${i}`}
            Comp={Comp}
            label={label}
            description={description}
            leftPct={x}
            topPct={y}
            sizePct={ICON_PCT}
            containerRect={containerRect}
          />
        );
      })}
    </div>
  );
}
