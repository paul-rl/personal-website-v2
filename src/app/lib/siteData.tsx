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
};

/** Read and normalize the raw JSON with the “_string_ / _path_” placeholders */
export async function loadSiteData(
  jsonRelativePath: string = "app/content/site.json"
): Promise<SiteData> {
  const abs = path.join(process.cwd(), jsonRelativePath);
  const raw = await readFile(abs, "utf8");
  const data = JSON.parse(raw) as any;

  // Helpers
  const ensureStr = (v: unknown, field: string) => {
    if (typeof v !== "string") throw new Error(`Expected string for "${field}"`);
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

  const projects: SiteProject[] = Array.isArray(data.Projects)
    ? data.Projects.map((p: any) => ({
        title: ensureStr(p.Title, "Projects[].Title"),
        image: ensureStr(p.Image, "Projects[].Image"),
        description: ensureStr(p.Description, "Projects[].Description"),
        tags: normalizeTags(p.Tags),
        link: ensureStr(p.Link, "Projects[].Link"),
      }))
    : [];

  const hobbies: SiteHobby[] = Array.isArray(data.Hobbies)
    ? data.Hobbies.map((h: any) => ({
        title: ensureStr(h.Title, "Hobbies[].Title"),
        image: ensureStr(h.Image, "Hobbies[].Image"),
        description: ensureStr(h.Description, "Hobbies[].Description"),
      }))
    : [];

  const normalized: SiteData = {
    title: ensureStr(data.Title, "Title"),
    subtitle: ensureStr(data.Subtitle, "Subtitle"),
    avatar: ensureStr(data.Avatar, "Avatar"),
    resume: ensureStr(data.Resume, "Resume"),
    github: ensureStr(data.GitHub, "GitHub"),
    contactMe: ensureStr(data["Contact Me"], "Contact Me"),
    projects,
    hobbies,
  };

  return normalized;
}
