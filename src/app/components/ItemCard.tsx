"use client";

import Image from "next/image";

type ItemCardProps = {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ItemCard({
  className,
  title = "Project Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.",
  imageSrc = "/images/projects/groundbreak.gif",
  imageAlt = "",
}: ItemCardProps) {
  return (
    <article
      className={`mx-auto w-full font-sans text-center ${className}`}
      style={{ maxWidth: "clamp(280px, 90vw, 680px)", padding: "0 clamp(0.5rem, 2vw, 2rem)" }}
    >
      {/* Container to bound image + text */}
      <div>
        {/* Image with responsive width */}
        <div className="relative mx-auto border-5 border-golden" 
          style={{ width: "100%", maxWidth: "100%" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt || "Project image"}
            unoptimized
            width={800}
            height={450}
            className="block w-full h-auto"
            sizes="(min-width:768px) 680px, 100vw"
            priority
          />
        </div>

        {/* Title */}
        <h3
          className="mt-[clamp(0.5rem,2vw,1.2rem)] italic leading-tight text-cream"
          style={{ fontSize: "clamp(1.5rem,2.2vw + 1rem,2.25rem)", textAlign: "center", maxWidth: "100%" }}
        >
          {title}
        </h3>

        {/* Paragraph */}
        <p
          className="mt-[clamp(0.3rem,1vw,0.8rem)] text-body text-left"
          style={{lineHeight: 1.6, maxWidth: "100%", margin: "0 auto" }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}