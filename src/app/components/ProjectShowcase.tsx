// components/ProjectSection.tsx
import React from "react";

type Props = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  /** e.g. "70ch" | "720px" (default 70ch) */
  textMaxWidth?: string;
  className?: string;
};

export default function ProjectSection({
  imageSrc,
  imageAlt = "",
  title,
  description,
  textMaxWidth = "70ch",
  className = "",
}: Props) {
  return (
    <section
      className={[
        "mx-auto w-full max-w-[clamp(320px,92vw,1200px)]",
        "px-[clamp(0.75rem,2.5vw,2rem)] font-sans text-center",
        className,
      ].join(" ")}
    >
      {/* STAGE: fixed responsive slot (keeps text below from shifting) */}
      <div className="relative mx-auto h-[clamp(320px,50vh,550px)] w-full mb-2">
        {/* Center the image inside the stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* The border is on the IMG itself and the IMG *shrinks to fit the stage*.
             We subtract the 10px total border thickness so image+border never exceeds the slot. */}
          <img
            src={imageSrc}
            alt={imageAlt || "Project image"}
            className="
              block
              h-auto w-auto
              max-h-[calc(100%-10px)] max-w-[calc(100%-10px)]
              border-[5px] border-golden
            "
          />
        </div>
      </div>

      {/* Title: sans, italic, responsive, centered, cream */}
      <h2 className="italic text-cream leading-tight text-center [font-size:clamp(1.5rem,3.5vw,2rem)]">
        {title}
      </h2>

      {/* Body: fixed size, centered, configurable width */}
      <p
        className="mx-auto text-body text-left leading-relaxed text-base"
        style={{ maxWidth: textMaxWidth }}
      >
        {description}
      </p>
    </section>
  );
}
