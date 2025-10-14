import React from "react";
import Tag from "@/app/components/icons/Tag";
import hasTags from "@/app/utils/hasTags";



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
      <div className="relative mx-auto h-[clamp(400px,calc(0.9375*100vh-468px),550px)] w-full mb-2">
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
      <h2 className="italic text-cream leading-tight text-center [font-size:clamp(1.5rem,3.5vw,2rem)]">
        <a href={link} className={classString}>{title}</a>
      </h2>

      {/* Body: fixed size, centered, configurable width */}
      <p
        className="mx-auto text-body text-left leading-relaxed text-base"
        style={{ maxWidth: textMaxWidth }}
      >
        {description}
      </p>
      {validTags && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {tags.map((t, i) => (
            <Tag key={`${t}-${i}`} label={t} />
          ))}
        </div>
      )}
    </section>
  );
}
