"use client";

import { useState } from "react";

export default function HeaderTabs({className} : {className: string}) {
  const [active, setActive] = useState<"projects" | "about">("projects");

  return (
    <div className={`flex gap-8 px-8 py-3 font-serif text-lg ${className}`}>
      <button
        onClick={() => setActive("projects")}
        className={`uppercase tracking-wide transition-colors ${
          active === "projects"
            ? "text-golden border-b border-golden pb-[2px]"
            : "text-cream hover:text-golden cursor-pointer"
        }`}
      >
        Projects
      </button>

      <button
        onClick={() => setActive("about")}
        className={`uppercase tracking-wide transition-colors ${
          active === "about"
            ? "text-golden border-b border-golden pb-[2px]"
            : "text-cream hover:text-golden cursor-pointer"
        }`}
      >
        About Me
      </button>
    </div>
  );
}
