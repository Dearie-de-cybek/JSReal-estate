import type { ReactNode } from "react";
import { slugify } from "./utils";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Inline **bold** and *italic*. Output is React nodes, so nothing is ever injected as raw HTML. */
function inline(s: string): ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean).map((p, i) => {
    if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("*")) return <em key={i}>{p.slice(1, -1)}</em>;
    return p;
  });
}

/** Tiny markdown subset → React. Headings feed a table of contents. */
export function renderProse(src: string): { nodes: ReactNode[]; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const nodes: ReactNode[] = [];
  const blocks = src.trim().split(/\n{2,}/);
  blocks.forEach((raw, i) => {
    const b = raw.trim();
    const h = b.match(/^(#{2,3}) (.+)$/);
    if (h) {
      const level = h[1].length as 2 | 3;
      let id = slugify(h[2]) || "section";
      const n = seen.get(id) ?? 0;
      seen.set(id, n + 1);
      if (n) id += `-${n}`;
      toc.push({ id, text: h[2], level });
      nodes.push(level === 2 ? <h2 key={i} id={id}>{inline(h[2])}</h2> : <h3 key={i} id={id}>{inline(h[2])}</h3>);
    } else if (/^- /m.test(b) && b.split("\n").every((l) => l.startsWith("- "))) {
      nodes.push(<ul key={i}>{b.split("\n").map((l, k) => <li key={k}>{inline(l.slice(2))}</li>)}</ul>);
    } else if (/^\d+\. /.test(b) && b.split("\n").every((l) => /^\d+\. /.test(l))) {
      nodes.push(<ol key={i}>{b.split("\n").map((l, k) => <li key={k}>{inline(l.replace(/^\d+\. /, ""))}</li>)}</ol>);
    } else if (b.startsWith("> ")) {
      nodes.push(<blockquote key={i}>{inline(b.replace(/^> ?/gm, ""))}</blockquote>);
    } else {
      nodes.push(<p key={i}>{inline(b.replace(/\n/g, " "))}</p>);
    }
  });
  return { nodes, toc };
}
