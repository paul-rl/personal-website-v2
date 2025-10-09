"use client";

import Image from "next/image";
import Carousel from "./Carousel";

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
      className={className ?? "w-full max-w-[860px]"}
      initialIndex={0}
      render={(src, isActive) => (
        <figure
  className={
    isActive
      ? "relative overflow-hidden border-[3px] border-[var(--golden)] bg-[var(--button-inside)]"
      : "relative overflow-hidden border-2 bg-[var(--button-inside)]"
  }
  style={{
    borderColor: isActive ? "var(--golden)" : "var(--body-text)",
    width: isActive ? 240 : 200,
    height: isActive ? 150 : 120,
  }}
>
  {/* optional: a little inner padding helps with odd aspect ratios */}
  <div className="absolute inset-0 p-2">
    <Image
      src={src}
      alt=""
      fill
     className="object-cover"
      sizes="(min-width: 1024px) 240px, 50vw"
      unoptimized={src.endsWith(".gif")}
      priority
    />
  </div>
</figure>
      )}
    />
  );
}
