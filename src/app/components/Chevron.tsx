import React from "react";

type Props = {
  size?: number | string;
  stroke?: number;
  innerStroke?: number;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  direction?: "left" | "right"; 
};

export default function Chevron({
  size = 72,
  stroke = 25,
  innerStroke = 14,
  className = "",
  ariaLabel = "Chevron",
  onClick,
  direction = "left",
}: Props) {
  const d = "M70 18 L40 50 L70 82";

  // Flip horizontally around the 0..100 viewBox for "right"
  const flip =
    direction === "right" ? "scale(-1,1) translate(-100,0)" : undefined;

  const handleKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };



  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={onClick ? "button" : "img"}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={handleKey}
      className={`group inline-block 
                  select-none 
                  outline-none 
                  focus:outline-2 focus:outline-offset-2 focus:outline-[var(--golden)] 
                  cursor-pointer ${className}`}
    >
      <defs>
        <linearGradient id="chev-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#8e6e2f" />
          <stop offset="55%" stopColor="#c3a055" />
          <stop offset="100%" stopColor="#7d5f24" />
        </linearGradient>
        <linearGradient id="chev-gold-hover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#fff3c8" />
          <stop offset="55%" stopColor="#e7c975" />
          <stop offset="100%" stopColor="#d2a84e" />
        </linearGradient>
      </defs>

      {/* Allow for easier clicking */}
      <rect x="0" y="0" width="100" height="100" fill="transparent" />

      <g transform={flip}>
        <path d={d} stroke="url(#chev-gold)" strokeWidth={stroke}
              strokeLinejoin="miter" strokeLinecap="square" fill="none" />
        {/* Hover overlay */}
        <path d={d} stroke="url(#chev-gold-hover)" strokeWidth={stroke}
              strokeLinejoin="miter" strokeLinecap="square" fill="none"
              className="opacity-0 
              transition-opacity duration-150 ease-out
              group-hover:opacity-100 
              group-active:opacity-100"
        />
        {/* Inner dark */}
        <path d={d} stroke="var(--button, #0b1620)" strokeWidth={innerStroke}
              strokeLinejoin="miter" strokeLinecap="square" fill="none" />
      </g>
    </svg>
  );
}
