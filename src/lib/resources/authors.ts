import fs from "node:fs";
import path from "node:path";

export interface Author {
  name: string;
  initials: string;
  /** Public path of the photo; only used when the file exists in /public. */
  photo: string;
  /** Leave empty until the profile URL is confirmed. */
  linkedin: string;
}

export const AUTHORS: Record<string, Author> = {
  "Laura Vidal": {
    name: "Laura Vidal",
    initials: "LV",
    photo: "/team/laura-vidal.webp",
    linkedin: "",
  },
};

export function findAuthor(name: string | undefined): Author | undefined {
  return name ? AUTHORS[name] : undefined;
}

export function hasPublicFile(publicPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}
