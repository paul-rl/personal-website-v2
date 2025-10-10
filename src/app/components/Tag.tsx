// components/Tag.tsx
import React from "react";

type TagProps = {
  label: string;
  /** Gold border thickness in px */
  borderWidth?: number;
  /** How far the bevel cuts into the tag (percent of width). Smaller = sharper tips */
  bevelPct?: number; // e.g. 4 -> very pointy, 8 -> rounder
  className?: string;
};

const hexPath = (b: number) =>
  `polygon(${b}% 0, ${100 - b}% 0, 100% 50%, ${100 - b}% 100%, ${b}% 100%, 0 50%)`;

export default function Tag({
  label,
  borderWidth = 2,
  bevelPct = 4,
  className = "",
}: TagProps) {
  return (
    <span
      className={`relative inline-flex items-center select-none
                  px-4 py-1.5 leading-none font-sans text-sm text-cream ${className}`}
    >
      {/* Outer gold frame */}
      <span
        className="absolute inset-0 z-0"
        style={{
          clipPath: hexPath(bevelPct),
          background:
            "linear-gradient(180deg,#8e6e2f,#c3a055,#7d5f24)",
        }}
        aria-hidden
      />

      {/* Inner dark fill (inset = border) */}
      <span
        className="absolute z-0"
        style={{
          inset: borderWidth,
          clipPath: hexPath(bevelPct),
          background: "var(--button-inside, #0b1620)",
        }}
        aria-hidden
      />

      {/* Text */}
      <span className="relative z-10">{label}</span>
    </span>
  );
}
