// page.tsx
import HeaderTabs from "./components/HeaderTabs";
import ItemCard from "./components/ItemCard";
import ProjectsCarousel from "./components/ProjectsCarousel";

export default function Home() {
  return (
    <div className="min-h-screen  flex flex-col items-center px-4 sm:px-8 font-sans text-cream">
      <HeaderTabs className="py-6 justify-center" />
      <ItemCard className="mt-12" />
      <ProjectsCarousel className="w-full max-w-[860px] mx-auto" />
    </div>
  );
}