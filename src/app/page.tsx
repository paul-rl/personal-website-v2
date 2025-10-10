import HeaderTabs from "./components/HeaderTabs";
import ItemCard from "./components/ItemCard";
import ProjectsCarousel from "./components/ProjectsCarousel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full px-[clamp(1rem,2vw,3rem)] mx-auto">
      <HeaderTabs className="py-6 justify-center" />
      <ItemCard tags={["Java", "Unity"]} className="mt-0" />
      <ProjectsCarousel />
    </div>
  );
}
