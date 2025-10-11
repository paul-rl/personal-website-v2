"use client";

import { useState } from "react";
import { useSiteData } from "@/app/components/SiteDataContext";
import ProjectsCarousel from "@/app/components/carousels/ProjectsCarousel";
import ItemShowcase from "@/app/components/ItemShowcase";
import type { SiteProject, SiteHobby } from "@/app/lib/siteData";

/**
 * Reusable wrapper for displaying either projects or hobbies
 */
export default function ShowcaseSection({
  mode,
  className = "",
}: {
  mode: "projects" | "hobbies";
  className?: string;
}) {
  const data = useSiteData();
  const [activeIdx, setActiveIdx] = useState(0);

  const items = mode === "projects" ? data.projects : data.hobbies;
  const active = items[activeIdx] ?? items[0];

  if (!items.length) return null;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {active && (
        <ItemShowcase
          imageSrc={active.image}
          imageAlt={active.title}
          title={active.title}
          description={active.description}
          tags={"tags" in active ? active.tags ?? [] : []}
          className="mt-6"
        />
      )}
      <ProjectsCarousel
        projects={mode === "projects" ? data.projects : (data.hobbies as SiteProject[])}
        onActiveChange={(_, i) => setActiveIdx(i)}
      />
    </div>
  );
}
