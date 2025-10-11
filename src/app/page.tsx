"use client"

import { useSiteData } from "@/app/components/SiteDataContext";
import HeaderTabs from "@/app/components/HeaderTabs";
import ItemShowcase from "@/app/components/ItemShowcase";
import ProjectsCarousel from "@/app/components/carousels/ProjectsCarousel";

const slides = [
  "/images/projects/keystone.jpg",
  "/images/projects/header.png",
  "/images/projects/groundbreak.gif",
  "/images/projects/fakeflix.png",
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full px-[clamp(1rem,2vw,3rem)] mx-auto">
      <HeaderTabs className="py-6 justify-center" />
      <ItemShowcase
        title="Project Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum."
        imageSrc={slides[0]}
        tags={["Unity", "Java"]}
        textMaxWidth="69ch"
        className="mb-3"
      />
      <ProjectsCarousel/>
    </div>
  );
}
