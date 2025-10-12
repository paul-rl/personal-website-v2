import SidebarHeader from "@/app/components/SidebarHeader";
import InfoSection from "@/app/components/InfoSection";
import ButtonCollection from "@/app/components/ButtonCollection";

export default function Sidebar() {
  return (
    <div className="p-6 space-y-6">
      <SidebarHeader className="mb-[4rem]" />
      <InfoSection className="mb-[4rem]" />
      <p className="mb-[4rem] leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.
      </p>
      <ButtonCollection className="space-y-4" />
    </div>
  );
}
