export interface TocEntry {
  id: string;
  text: string;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

function toPlainText(html: string): string {
  return html
    .replace(/<sup>[\s\S]*?<\/sup>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39);/g, (entity) => ENTITIES[entity] ?? entity)
    .trim();
}

/** Second-level headings of rendered article HTML, in order, for the "On this page" list. */
export function extractHeadings(html: string): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const match of html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)) {
    const text = toPlainText(match[2]);
    if (match[1] && text) entries.push({ id: match[1], text });
  }
  return entries;
}
