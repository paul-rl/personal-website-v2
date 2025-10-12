"use client";

import Image from "next/image";
import Carousel from "@/app/components/main_page/carousels/Carousel";
import { useSiteData } from "@/app/components/SiteDataContext";
import type { SiteHobby } from "@/app/lib/siteData";

type Props = {
  className?: string;
  /** Optional override. If omitted, uses siteData.hobbies from JSON */
  hobbies?: SiteHobby[];
  /** Notified whenever the active slide changes */
  onActiveChange?: (hobby: SiteHobby, index: number) => void;
};

export default function HobbiesCarousel({ className, hobbies, onActiveChange }: Props) {
  const data = useSiteData();
  const items: SiteHobby[] = hobbies ?? data.hobbies;

  if (!items?.length) return null;

  return (
    <Carousel<SiteHobby>
      items={items}
      className={className ?? "w-full max-w-[min(94vw,1200px)] mx-auto"}
      initialIndex={0}
      onIndexChange={(i) => onActiveChange?.(items[i], i)}
      render={(hobby, isActive) => (
        <figure
          className={[
            "relative overflow-hidden bg-[var(--button-inside)] aspect-[16/9]",
            isActive ? "border-[3px] border-[var(--golden)]" : "border-[3px] border-[var(--body-text)]",
          ].join(" ")}
          style={{ width: isActive ? "var(--wA)" : "var(--wS)", height: "auto" }}
        >
          <Image
            src={hobby.image}
            alt={hobby.title ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 40vw, (min-width: 768px) 60vw, 90vw"
            unoptimized={/\.(gif)$/i.test(hobby.image)}
            priority
          />
          {/* Optional caption: 
          <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2 text-sm">
            {hobby.title}
          </figcaption> */}
        </figure>
      )}
    />
  );
}
