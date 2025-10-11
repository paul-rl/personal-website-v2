"use client";

import Image from "next/image";
import Carousel from "@/app/components/carousels/Carousel";

type Props = { className?: string };

const slides = [
  "/images/projects/groundbreak.gif",
  "/images/projects/fakeflix.png",
  "/images/projects/keystone.jpg",
  "/images/projects/header.png",
];

export default function ProjectsCarousel({ className }: Props) {
  return (
    <Carousel
      items={slides}
      className={className ?? "w-full max-w-[min(94vw,1200px)] mx-auto"}
      initialIndex={0}
      render={(src, isActive) => (
        <figure
          className={[
            "relative overflow-hidden bg-[var(--button-inside)] aspect-[16/9]",
            isActive ? "border-[3px] border-[var(--golden)]" : "border-[3px] border-[var(--body-text)]",
          ].join(" ")}
          // width/height are set by the carousel via CSS variables
          style={{
            width: isActive ? "var(--wA)" : "var(--wS)",
            height: "auto",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 60vw, 90vw"
            unoptimized={src.endsWith(".gif")}
            priority
          />
        </figure>
      )}
    />
  );
}
