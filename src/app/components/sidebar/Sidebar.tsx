"use client"

import { useSiteData } from "@/app/components/SiteDataContext";
import SidebarHeader from "@/app/components/sidebar/SidebarHeader";
import InfoSection from "@/app/components/sidebar/InfoSection";
import ButtonCollection from "@/app/components/sidebar/ButtonCollection";

export default function Sidebar() {
  const data = useSiteData();
  return (
    <div className="p-6 space-y-6">
      <SidebarHeader className="mb-[2rem]" />
      <InfoSection className="mb-[2rem]" />
      <p className="mb-[2rem] leading-relaxed">
        {data.aboutMe}
      </p>
      <ButtonCollection className="space-y-4" />
    </div>
  );
}
