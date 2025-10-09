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
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien.",
  imageSrc = "/images/projects/groundbreak.gif",
  imageAlt = "",
}: ItemCardProps) {
  return (
    <article className="mx-auto w-full max-w-[680px] font-sans text-center">
      {/* Framed image */}
      <div className="relative mx-4 border-2 border-golden">
        <div className="relative aspect-video w-full">
          <Image
            src="/images/projects/groundbreak.gif" // keeping as-is per your code
            alt="Groundbreak gameplay"
            unoptimized
            width={800}
            height={450}
            className="block h-auto w-full"
            sizes="(min-width: 768px) 680px, 100vw"
            priority
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[clamp(1.5rem,2.2vw+1rem,2.25rem)] italic leading-tight text-cream">
        {title}
      </h3>

      {/* Paragraph */}
      <p className="mx-4 mt-2 text-left text-body">
        {description}
      </p>
    </article>
  );
}
