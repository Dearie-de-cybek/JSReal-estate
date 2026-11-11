"use client";

import { useState } from "react";
import { PropertyCard } from "./cards";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/content";

const PURPOSES = ["All", "Residential", "Investment"] as const;

/** Light client-side filter (purpose + category). Works with any number of properties. */
export function PropertyBrowser({ properties }: { properties: Property[] }) {
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number]>("All");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(properties.map((p) => p.category))];
  const list = properties.filter((p) => (purpose === "All" || p.purpose === purpose) && (cat === "All" || p.category === cat));
  const chip = (on: boolean) => cn("shrink-0 border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors", on ? "border-ink bg-ink text-ivory" : "border-[var(--line)] hover:border-ink");
  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-[var(--line)] py-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Purpose" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {PURPOSES.map((p) => <button key={p} type="button" aria-pressed={purpose === p} className={chip(purpose === p)} onClick={() => setPurpose(p)}>{p}</button>)}
        </div>
        <div role="group" aria-label="Category" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} className={chip(cat === c)} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </div>
      <p className="eyebrow mt-8" aria-live="polite">{list.length} {list.length === 1 ? "opportunity" : "opportunities"}</p>
      {list.length === 0 ? (
        <p className="mt-10 border border-dashed border-[var(--line)] p-10 text-center text-slate-ink">Nothing in that selection yet.</p>
      ) : (
        <div className="mt-10 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <div key={p.slug} className={i % 3 === 1 ? "lg:mt-16" : ""}><PropertyCard p={p} /></div>)}
        </div>
      )}
    </div>
  );
}
