"use client";

import Image from "next/image";
import Tag from "./Tag";

type ItemCardProps = {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Provide the real image dimensions to preserve its native aspect ratio */
  imageWidth?: number;
  imageHeight?: number;
  tags?: string[];
};

const maxContainerWidth = 640; // same as Article max-width clamp upper bound

const aspectRatio = 9 / 16;    // height / width for 16:9


// inside component itemCard render

const containerHeightPx = maxContainerWidth * aspectRatio; // e.g. 360px height

export default function ItemCard({
  className,
  title = "Project Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.",
  imageSrc = "/images/projects/groundbreak.gif",
  imageAlt = "",
  imageWidth,   // <- pass per-image dims here
  imageHeight,  // <-
  tags = [],
}: ItemCardProps) {

return(<article
  className={`mx-auto w-full font-sans text-center ${className}`}
  style={{
    maxWidth: "clamp(280px, 90vw, 900px)", // wider max width for bigger image
    padding: "0 clamp(0.5rem, 2vw, 2rem)",
    boxSizing: "border-box",
  }}
>
  {/* Fixed height container to lock bottom alignment */}
  <div
    style={{
      position: "relative",
      maxWidth: "100%",
      height: "500px",    // increased container height for bigger image
      minHeight: "500px",
      overflow: "visible",
    }}
  >
    {/* Border wrapper exactly hugging the image */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        border: "5px solid #D4AF37",
        display: "inline-block",
        boxSizing: "content-box",
        lineHeight: 0,
      }}
    >
      <Image
        src={imageSrc}
        alt={imageAlt || "Project image"}
        unoptimized
        width={imageWidth ?? 800}
        height={imageHeight ?? 450}
        sizes="(min-width:768px) 880px, 100vw" // increased to match maxWidth higher
        priority
        style={{
          display: "block",
          width: "auto",
          height: "auto",
          maxWidth: "100%",     // image will fill wrapper width fully
          maxHeight: "500px",   // allow image to be bigger vertically
        }}
      />
    </div>
  </div>

  <h3
    className="mt-[clamp(0.5rem,2vw,1.2rem)] italic leading-tight text-cream"
    style={{
      fontSize: "clamp(.5rem,5vw,1.5rem)",
      textAlign: "center",
      maxWidth: "100%",
    }}
  >
    {title}
  </h3>

  <p
    className="mt-[clamp(0.3rem,1vw,0.8rem)] text-body text-left"
    style={{ lineHeight: 1.6, maxWidth: "100%", margin: "0 auto" }}
  >
    {description}
  </p>

  {tags.length > 0 && (
    <div
      className="mt-[.5rem] mb-[.5rem] flex flex-wrap justify-center gap-2"
      aria-label="Project tags"
    >
      {tags.slice(0, 5).map((tag, i) => (
        <Tag key={i} label={tag} bevelPct={20} />
      ))}
    </div>
  )}
</article>
  );
}
