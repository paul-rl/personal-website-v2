
import SidebarHeader from "./SidebarHeader";
import InfoSection from "./InfoSection";
import ButtonCollection from "./ButtonCollection";

export default function Sidebar() {

  return (
    <div className="p-6 ">
      {/* Top content */}
      <div className="space-y-6">
        <SidebarHeader />
        <InfoSection />
        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac nisl
          ligula. Pellentesque metus dolor, blandit tempor nunc at, laoreet
          eleifend felis.
        </p>
      </div>
      <ButtonCollection className="mt-7"/>
    </div>
  )  
}



