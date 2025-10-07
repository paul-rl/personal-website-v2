// components/Sidebar.tsx
import SidebarHeader from "./SidebarHeader";
import InfoSection from "./InfoSection"

export default function Sidebar() {
  return (
    <div className="p-6 space-y-6">
      <SidebarHeader/>
      <InfoSection/>
    </div>
  );
}
