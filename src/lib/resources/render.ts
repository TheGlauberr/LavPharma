import { Marked, Renderer, type Tokens } from "marked";

// Markdown comes only from content/resources in this repo (reviewed in PRs),
// so raw HTML in it is trusted. Do not feed user input through this renderer.

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z0-9#]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) && !href.startsWith("https://lavpharma.com");
}

function createMarked(): Marked {
  const base = new Renderer();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading(this: Renderer, { tokens, depth, text }: Tokens.Heading): string {
        const inner = this.parser.parseInline(tokens);
        const id = slugifyHeading(text);
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      table(this: Renderer, token: Tokens.Table): string {
        base.parser = this.parser;
        return `<div class="table-scroll">${base.table(token)}</div>\n`;
      },
      link(this: Renderer, token: Tokens.Link): string {
        base.parser = this.parser;
        const html = base.link(token);
        if (!isExternal(token.href)) return html;
        return html.replace("<a ", '<a target="_blank" rel="noopener noreferrer" ');
      },
    },
  });
  return marked;
}

const marked = createMarked();

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
