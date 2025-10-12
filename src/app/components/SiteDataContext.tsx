"use client";

import React, { createContext, useContext } from "react";
import type { SiteData } from "@/app/lib/siteData";

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({
  data,
  children,
}: {
  data: SiteData;
  children: React.ReactNode;
}) {
  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return ctx;
}
