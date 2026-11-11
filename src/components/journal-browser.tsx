"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArticleCard } from "./cards";
import type { Article } from "@/lib/content";

/** Category filter + search over the Journal. All client-side; no backend. */
export function JournalBrowser({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...new Set(articles.map((a) => a.category))], [articles]);
  const list = articles.filter(
    (a) =>
      (cat === "All" || a.category === cat) &&
      (!q.trim() || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q.trim().toLowerCase()))
  );
  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-[var(--line)] py-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn("shrink-0 border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors", cat === c ? "border-ink bg-ink text-ivory" : "border-[var(--line)] hover:border-ink")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="field lg:w-80">
          <label htmlFor="jq" className="sr-only">Search the Journal</label>
          <input id="jq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="input" />
        </div>
      </div>
      <p className="eyebrow mt-8" aria-live="polite">{list.length} {list.length === 1 ? "article" : "articles"}</p>
      {list.length === 0 ? (
        <p className="mt-10 border border-dashed border-[var(--line)] p-10 text-center text-slate-ink">Nothing matches that search. Try another word or category.</p>
      ) : (
        <div className="mt-10 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      )}
    </div>
  );
}
