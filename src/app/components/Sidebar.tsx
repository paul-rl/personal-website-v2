
import SidebarHeader from "./SidebarHeader";
import InfoSection from "./InfoSection";
import ButtonCollection from "./ButtonCollection";

export default function Sidebar() {

  return (
    <div className="p-6 space-y-6">
      <SidebarHeader className="mb-[4rem]"/>
      <InfoSection className="mb-[4rem]"/>
      <p className="leading-relaxed mb-[4rem]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo risus, semper sed nulla eu, interdum suscipit sapien. Proin maximus vel orci ac euismod. Quisque nec lacus ullamcorper, cursus orci a, ullamcorper mauris. In non interdum neque. Phasellus blandit mauris lacus, nec maximus tellus pretium vitae. Praesent urna lacus, interdum non ultrices at, porta scelerisque ligula. Sed eros velit, vulputate non pretium ac, gravida at lorem. In posuere in ex non condimentum.
      </p>
      <ButtonCollection className="space-y-4"/>
    </div>
  )  
}



