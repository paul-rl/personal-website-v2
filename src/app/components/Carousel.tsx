"use client";

import Chevron from "./Chevron";
import * as React from "react";

/** className joiner */
function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type CarouselProps<T> = {
  items: T[];
  /** Renders a thumbnail, 2nd arg gives activity state */
  render: (item: T, isActive: boolean) => React.ReactNode;
  initialIndex?: number;
  onIndexChange?: (i: number) => void;
  className?: string;
  ariaLabel?: string;
};

export default function Carousel<T>({
  items,
  render,
  initialIndex = 0,
  onIndexChange,
  className,
  ariaLabel = "Carousel",
}: CarouselProps<T>) {
  const [idx, setIdx] = React.useState(
    Math.min(Math.max(initialIndex, 0), Math.max(items.length - 1, 0))
  );

  const go = React.useCallback(
    (n: number) => {
      const next = (n + items.length) % items.length;
      setIdx(next);
      onIndexChange?.(next);
    },
    [items.length, onIndexChange]
  );

  const prev = React.useCallback(() => go(idx - 1), [idx, go]);
  const next = React.useCallback(() => go(idx + 1), [idx, go]);

  const wrapRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (!items.length) return null;

  const left = (idx - 1 + items.length) % items.length;
  const right = (idx + 1) % items.length;

  return (
    <div className="relative w-full">
      {/* Full-width (relative) dividers spanning 90% of the parent width */}
        <div className="pointer-events-none 
                        absolute left-[10%] right-[10%] top-0 
                        translate-y-[1.2rem]"
        >
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[4rem]">
                <div className="h-[.5px] bg-golden" />
                <div className="h-px w-px opacity-0" /> {/* spacer for symmetry */}
                <div className="h-[.5px] bg-golden" />
            </div>
      </div>

      {/* Inner content */}
      <div
        ref={wrapRef}
        tabIndex={0}
        aria-label={ariaLabel}
        className={cn("mx-auto select-none outline-none", className)}
      >
        {/* Dots, centered; the lines above sit underneath */}
        <div className="relative grid grid-cols-[1fr_auto_1fr]  items-center gap-6 mt-2">
          <div />
          <div className="flex items-center justify-center gap-3">
            {items.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={
                    active
                      ? "inline-grid place-items-center size-5 rounded-full border border-golden bg-golden transition"
                      : "inline-grid place-items-center size-3 rounded-full border-3 border-golden transition"
                  }
                />
              );
            })}
          </div>
          <div />
        </div>

        {/* Thumbnails + arrows */}
        <div className="relative mx-auto mt-10 grid grid-cols-[auto_1fr_auto] items-center gap-6">
<Chevron onClick={prev} direction="left"/>


          {/* 3-up rail */}
          <div className="mx-auto flex items-end justify-center gap-8 min-h-[7.5rem]">
            {/* Left (small) */}
            <button aria-label="Go to previous slide" onClick={prev} className="relative shrink-0">
              <div className="scale-100 opacity-90 transition">
                {render(items[left], false)}
              </div>
            </button>

            {/* Active (bigger) */}
            <div className="relative -mb-2 shrink-0">
              <div className="scale-110 drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition">
                {render(items[idx], true)}
              </div>
            </div>

            {/* Right (small) */}
            <button aria-label="Go to next slide" onClick={next} className="relative shrink-0">
              <div className="scale-100 opacity-90 transition">
                {render(items[right], false)}
              </div>
            </button>
          </div>

<Chevron onClick={next} direction="right"/>

        </div>
      </div>
    </div>
  );
}
