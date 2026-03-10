"use client";

type HeaderTabsProps = {
  className?: string;
  active: "projects" | "about" | "albumclub";
  onChange: (tab: "projects" | "about" | "albumclub") => void;
};

export default function HeaderTabs({ className = "", active = "projects", onChange }: HeaderTabsProps) {
  return (
    <div className={`flex gap-8 px-8 py-3 font-serif text-lg ${className}`}>
      <button
        onClick={() => onChange("projects")}
        className={`uppercase tracking-wide transition-colors ${
          active === "projects"
            ? "text-golden border-b border-golden pb-[2px]"
            : "text-cream hover:text-golden cursor-pointer"
        }`}
      >
        Projects
      </button>

      <button
        onClick={() => onChange("albumclub")}
        className={`uppercase tracking-wide transition-colors ${
          active === "albumclub"
            ? "text-golden border-b border-golden pb-[2px]"
            : "text-cream hover:text-golden cursor-pointer"
        }`}
      >
        Album Club
      </button>
      <button
        onClick={() => onChange("about")}
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
