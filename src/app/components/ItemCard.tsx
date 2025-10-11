"use client";

import Image from "next/image";
import Tag from "./Tag";

type ItemCardProps = {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: string[];
};

export default function ItemCard({
  className,
  title = "Project Title",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.",
  imageSrc = "/images/projects/groundbreak.gif",
  imageAlt = "",
  tags = [], // default empty array
}: ItemCardProps) {
  return (
    <article
      className={`mx-auto w-full font-sans text-center ${className}`}
      style={{
        maxWidth: "clamp(280px, 90vw, 680px)",
        padding: "0 clamp(0.5rem, 2vw, 2rem)",
        boxSizing: "border-box",
      }}
    >
      <div>
        <div
          className="relative mx-auto border-5 border-golden"
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
            className="flex flex-wrap justify-center gap-2 mt-[.5rem] mb-[.5rem]"
            aria-label="Project tags"
          >
            {tags.slice(0, 5).map((tag, i) => (
              <Tag key={i} label={tag} bevelPct={20}/>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}