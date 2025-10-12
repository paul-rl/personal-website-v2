"use client";

import { useState } from "react";
import { useSiteData } from "@/app/components/SiteDataContext";
import HeaderTabs from "@/app/components/HeaderTabs";
import ProjectsCarousel from "@/app/components/carousels/ProjectsCarousel";
import HobbiesCarousel from "@/app/components/carousels/HobbiesCarousel";
import ItemShowcase from "@/app/components/ItemShowcase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasTags(obj: any): obj is { tags: string[] } {
  return Array.isArray(obj.tags);
}

export default function Home() {
  const data = useSiteData();

  // Which header tab is active
  const [activeTab, setActiveTab] = useState<"projects" | "about">("projects");

  // Current active slide index (used by whichever carousel is visible)
  const [activeIdx, setActiveIdx] = useState(0);

  // Dynamically choose content set (projects or hobbies)
  const items = activeTab === "projects" ? data.projects : data.hobbies;
  const activeItem = items[activeIdx] ?? items[0];

  return (
    <div className="min-h-screen flex flex-col items-center w-full px-[clamp(1rem,2vw,3rem)] mx-auto font-sans text-cream">
      {/* Header Tabs */}
      <HeaderTabs
        className="py-6 justify-center"
        active={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setActiveIdx(0); // reset when switching tabs
        }}
      />

      {/* --- Showcase --- */}
      {activeItem && (
        <ItemShowcase 
          imageSrc={activeItem.image}
          imageAlt={activeItem.title}
          title={activeItem.title}
          description={activeItem.description}
          tags={hasTags(activeItem) ? activeItem.tags : []}
        />
      )}
      {activeTab === "projects" ? (
        <ProjectsCarousel
          className="w-full max-w-[min(94vw,1200px)] mx-auto"
          onActiveChange={(_, i) => setActiveIdx(i)}
        />
      ) : (
        <HobbiesCarousel
          className="w-full max-w-[min(94vw,1200px)] mx-auto"
          onActiveChange={(_, i) => setActiveIdx(i)}
        />
      )}
    </div>
  );
}
