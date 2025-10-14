"use client";

import { useState } from "react";
import { useSiteData } from "@/app/components/SiteDataContext";
import HeaderTabs from "@/app/components/main_page/HeaderTabs";
import ProjectsCarousel from "@/app/components/main_page/carousels/ProjectsCarousel";
import HobbiesCarousel from "@/app/components/main_page/carousels/HobbiesCarousel";
import ItemShowcase from "@/app/components/main_page/ItemShowcase";
import { SiteProject } from "./lib/siteData";
import hasTags from "@/app/utils/hasTags";

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
          link={(activeItem as SiteProject).link}
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
