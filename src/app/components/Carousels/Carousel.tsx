"use client";

import Chevron from "../Chevron";
import * as React from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type CarouselProps<T> = {
  items: T[];
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
    <div className="relative w-full" data-carousel>
      {/* Scoped knobs */}
      <style jsx>{`
        [data-carousel] {
          --railW: min(96vw, 800px);

          /* proportions (active is ~25% wider than side) */
          --colS: 1fr;
          --colA: 1.25fr;
          --gap: clamp(12px, 2vw, 28px);

          /* reserved space so chevrons never overlap thumbnails */
          --chev: clamp(28px, 5.5vw, 64px);
          --chev-gap: clamp(4px, 0.8vw, 12px);
          --lane: calc(var(--chev) + 2 * var(--chev-gap));

          /* aspect ratio for all cards */
          --aspect: 16/9;

          /* dots */
          --dot: clamp(6px, 1.25vw, 14px);
          --dotActive: clamp(12px, 1.8vw, 18px);
        }
      `}</style>

      {/* Top dividers */}
      <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 translate-y-[1rem]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[4rem]">
          <div className="h-[.5px] bg-golden" />
          <div className="h-px w-px opacity-0" />
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
        {/* Dots */}
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 mt-2">
          <div />
          <div className="flex items-center justify-center gap-[clamp(6px,1vw,12px)]">
            {items.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  style={{
                    width: active ? "var(--dotActive)" : "var(--dot)",
                    height: active ? "var(--dotActive)" : "var(--dot)",
                    borderWidth: active ? "1px" : "2px",
                  }}
                  className={
                    active
                      ? "inline-grid place-items-center rounded-full border border-golden bg-golden transition"
                      : "inline-grid place-items-center rounded-full border-golden transition"
                  }
                />
              );
            })}
          </div>
          <div />
        </div>

        {/* Rail + chevrons */}
        <div
          className="relative mx-auto mt-4"
          style={{
            width: "min(100%, var(--railW))",
            paddingInline: "var(--lane)", // reserve gutter for chevrons
          }}
        >
          {/* 3-up grid — centers aligned */}
          <div
            className="grid items-center"
            style={{
              gridTemplateColumns: "var(--colS) var(--colA) var(--colS)",
              columnGap: "var(--gap)",
            }}
          >
            {/* Left (small) */}
            <button aria-label="Go to previous slide" onClick={prev} className="relative w-full">
              <div className="relative w-full" style={{ aspectRatio: "var(--aspect)" }}>
                <div className="absolute inset-0 opacity-90 transition">
                  {render(items[left], false)}
                </div>
              </div>
            </button>

            {/* Active (slightly bigger) */}
            <div className="relative w-full drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
              <div className="relative w-full" style={{ aspectRatio: "var(--aspect)" }}>
                <div className="absolute inset-0 transition">
                  {render(items[idx], true)}
                </div>
              </div>
            </div>

            {/* Right (small) */}
            <button aria-label="Go to next slide" onClick={next} className="relative w-full">
              <div className="relative w-full" style={{ aspectRatio: "var(--aspect)" }}>
                <div className="absolute inset-0 opacity-90 transition">
                  {render(items[right], false)}
                </div>
              </div>
            </button>
          </div>

          {/* Chevrons (sit in the reserved gutters) */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-auto"
            style={{ paddingLeft: "var(--chev-gap)" }}
          >
            <Chevron size={"var(--chev)"} onClick={prev} direction="left" />
          </div>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-auto"
            style={{ paddingRight: "var(--chev-gap)" }}
          >
            <Chevron size={"var(--chev)"} onClick={next} direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
}
