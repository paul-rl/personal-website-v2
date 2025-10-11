"use client";

import { useState } from "react";
import { useSiteData } from "@/app/components/SiteDataContext";
import HeaderTabs from "./components/HeaderTabs";
import ProjectsCarousel from "@/app/components/carousels/ProjectsCarousel";
import ItemShowcase from "@/app/components/ItemShowcase";

export default function Home() {
  const data = useSiteData();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = data.projects[activeIdx] ?? data.projects[0];
  return (
    <div className="min-h-screen flex flex-col items-center w-full px-[clamp(1rem,2vw,3rem)] mx-auto">
      <HeaderTabs className="py-6 justify-center" />
      {/* Showcase synced with current slide */}
      {active && (
        <ItemShowcase
          imageSrc={active.image}
          imageAlt={active.title}
          title={active.title}
          description={active.description}
          tags={active.tags ?? []}
          className="mt-6"
        />
      )}
      <ProjectsCarousel
        className="w-full max-w-[min(94vw,1200px)] mx-auto"
        onActiveChange={(_, i) => setActiveIdx(i)}
      />
    </div>
  );
}
