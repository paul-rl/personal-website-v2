// page.tsx
import HeaderTabs from "./components/HeaderTabs";
import ItemCard from "./components/ItemCard";
import ProjectsCarousel from "./components/ProjectsCarousel";

export default function Home() {
  return (
    <div 
  className="min-h-screen flex flex-col items-center w-full max-w-[100vw] px-[clamp(1rem,2vw,3rem)] mx-auto"
  style={{ boxSizing: "border-box" }}
>
      <HeaderTabs className="py-6 justify-center" />
      <ItemCard className="mt-[0rem]" />
      {/** <ProjectsCarousel/> **/}
    </div>
  );
}