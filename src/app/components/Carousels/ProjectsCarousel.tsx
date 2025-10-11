"use client";

import Image from "next/image";
import Carousel from "@/app/components/carousels/Carousel";
import { useSiteData } from "@/app/components/SiteDataContext";
import type { SiteProject } from "@/app/lib/siteData";

type Props = {
  className?: string;
  /** Optional override. If omitted, uses siteData.projects from JSON */
  projects?: SiteProject[];
};

export default function ProjectsCarousel({ className, projects }: Props) {
  const data = useSiteData();
  const items: SiteProject[] = projects ?? data.projects;

  if (!items?.length) return null;

  return (
    <Carousel
      items={items}
      className={className ?? "w-full max-w-[min(94vw,1200px)] mx-auto"}
      initialIndex={0}
      render={(proj, isActive) => (
        <figure
          className={[
            "relative overflow-hidden bg-[var(--button-inside)] aspect-[16/9]",
            isActive ? "border-[3px] border-[var(--golden)]" : "border-[3px] border-[var(--body-text)]",
          ].join(" ")}
          // width/height are set by the carousel via CSS variables
          style={{ width: isActive ? "var(--wA)" : "var(--wS)", height: "auto" }}
        >
          <Image
            src={proj.image}
            alt={proj.title ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 60vw, 90vw"
            unoptimized={proj.image.endsWith(".gif")}
            priority
          />
        </figure>
      )}
    />
  );
}
