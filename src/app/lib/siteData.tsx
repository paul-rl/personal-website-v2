import { readFile } from "node:fs/promises";
import path from "node:path";

export type SiteProject = {
  title: string;
  image: string;      // path
  description: string;
  tags: string[];     // flattened array in order tag-1..tag-x
  link: string;       // path or url
};

export type SiteHobby = {
  title: string;
  image: string;      // path
  description: string;
};

export type SiteData = {
  title: string;
  subtitle: string;
  avatar: string;     // path
  resume: string;     // path
  github: string;     // url
  contactMe: string;  // mailto
  projects: SiteProject[];
  hobbies: SiteHobby[];
  tags: string[];
};

/** Read and normalize the raw JSON with the “_string_ / _path_” placeholders */
export async function loadSiteData(
  jsonRelativePath: string = "src/app/content/site.json"
): Promise<SiteData> {
  const abs = path.join(process.cwd(), jsonRelativePath);
  const raw = await readFile(abs, "utf8");
  const data = JSON.parse(raw) as SiteData;

  // Helpers
  const ensureStr = (v: unknown, field: string) => {
    if (typeof v !== "string") throw new Error(`Expected string for "${field}", type is: ${typeof v}`);
    return v;
  };

  const normalizeTags = (obj: unknown): string[] => {
    if (!obj || typeof obj !== "object") return [];
    const entries = Object.entries(obj as Record<string, string>)
      .filter(([k, v]) => k.startsWith("tag-") && typeof v === "string");
    // Sort by tag-<number> so tag-10 doesn't come before tag-2
    entries.sort((a, b) => {
      const na = parseInt(a[0].split("tag-")[1] || "0", 10);
      const nb = parseInt(b[0].split("tag-")[1] || "0", 10);
      return na - nb;
    });
    return entries.map(([, v]) => v);
  };

  const projects: SiteProject[] = Array.isArray(data.projects)
    ? data.projects.map((p: SiteProject) => ({
        title: ensureStr(p.title, "Projects[].Title"),
        image: ensureStr(p.image, "Projects[].Image"),
        description: ensureStr(p.description, "Projects[].Description"),
        tags: normalizeTags(p.tags),
        link: ensureStr(p.link, "Projects[].Link"),
      }))
    : [];

  const hobbies: SiteHobby[] = Array.isArray(data.hobbies)
    ? data.hobbies.map((h: SiteHobby) => ({
        title: ensureStr(h.title, "Hobbies[].Title"),
        image: ensureStr(h.image, "Hobbies[].Image"),
        description: ensureStr(h.description, "Hobbies[].Description"),
      }))
    : [];

  const normalized: SiteData = {
    title: ensureStr(data.title, "Title"),
    subtitle: ensureStr(data.subtitle, "Subtitle"),
    avatar: ensureStr(data.avatar, "Avatar"),
    resume: ensureStr(data.resume, "Resume"),
    github: ensureStr(data.github, "GitHub"),
    contactMe: ensureStr(data.contactMe, "Contact Me"),
    projects,
    hobbies,
  };

  return normalized;
}
