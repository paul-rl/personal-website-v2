import React from "react";
import Tag from "@/app/components/icons/Tag";
import hasTags from "@/app/utils/hasTags";
import Image from "next/image";



type Props = {
  imageSrc: string;
  imageAlt?: string;
  tags?: string[];
  title: string;
  link: string;
  description: string;
  textMaxWidth?: string;
  className?: string;
};



export default function ItemShowcase({
  imageSrc,
  imageAlt = "",
  title,
  link,
  tags,
  description,
  textMaxWidth = "70ch",
  className = "",
}: Props) {
  const validTags = tags && tags.length > 0;
  const classString = validTags ? "hover:text-golden cursor-pointer": ""
  return (
    <section
      className={[
        "mx-auto w-full max-w-[clamp(320px,92vw,1200px)]",
        "px-[clamp(0.75rem,2.5vw,2rem)] font-sans text-center",
        className,
      ].join(" ")}
    >
      {/* Stage: fixed responsive slot (keeps text below from shifting) */}
      <div className="relative mx-auto h-[clamp(400px,calc(0.9375*100vh-468px),520px)] w-full mb-[.5rem]">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={imageSrc}
            alt={imageAlt || "Project image"}
            className="block
                       h-auto w-auto
                       max-h-[calc(100%-10px)] max-w-[calc(100%-10px)]
                       border-[5px] border-golden"
          />
        </div>
      </div>

      {/* Title: sans, italic, responsive, centered, cream */}
      <h2 className="italic text-cream leading-tight text-center [font-size:clamp(1.5rem,3.5vw,2rem)] mb-[.5rem]">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${title} (opens in a new tab)`}
          className={`inline-flex items-baseline gap-1 align-middle group ${classString}`}
        >
          <span>{title}</span>
            {validTags && 
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-[.5em] h-[.5em] translate-y-[1px] opacity-70 transition
                           group-hover:opacity-100 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* external-link icon */}
                <path d="M14 3h7v7" />
                <path d="M21 3l-8.5 8.5" />
                <path d="M21 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
              </svg>
            }
        </a>
      </h2>

      {/* Body: fixed size, centered, configurable width */}
      <p
        className="mx-auto text-body text-left leading-relaxed text-base mb-[1rem]"
        style={{ maxWidth: textMaxWidth }}
      >
        {description}
      </p>
      {validTags && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-[1rem]">
          {tags.map((t, i) => (
            <Tag key={`${t}-${i}`} label={t} />
          ))}
        </div>
      )}
    </section>
  );
}
