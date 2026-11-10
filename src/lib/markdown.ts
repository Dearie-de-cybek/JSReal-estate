import { Marked, type Renderer, type Tokens } from "marked";
import { slugify } from "./utils";

export type TocItem = { id: string; text: string; level: 2 | 3 };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Renders lightweight markdown. Raw HTML is escaped; links are restricted to safe protocols. */
export function renderMarkdown(src: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const m = new Marked({ gfm: true, breaks: false });
  m.use({
    renderer: {
      html: ({ text }: Tokens.HTML | Tokens.Tag) => esc(text),
      heading(this: Renderer, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        if (depth === 2 || depth === 3) {
          let id = slugify(text) || "section";
          const n = seen.get(id) ?? 0;
          seen.set(id, n + 1);
          if (n) id += `-${n}`;
          toc.push({ id, text, level: depth as 2 | 3 });
          return `<h${depth} id="${id}">${inner}</h${depth}>`;
        }
        return `<h${depth}>${inner}</h${depth}>`;
      },
      link(this: Renderer, { href, title, tokens }: Tokens.Link) {
        const ok = /^(https?:|mailto:|tel:|\/|#)/i.test(href);
        const inner = this.parser.parseInline(tokens);
        if (!ok) return inner;
        const ext = /^https?:/i.test(href);
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ""}${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${inner}</a>`;
      },
      image: ({ href, text }: Tokens.Image) =>
        /^(https?:|\/)/i.test(href) ? `<img src="${esc(href)}" alt="${esc(text)}" loading="lazy" />` : "",
    },
  });
  const html = m.parse(src, { async: false }) as string;
  return { html, toc };
}
