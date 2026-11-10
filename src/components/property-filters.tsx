"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

type Facets = { cities: string[]; types: string[]; categories: { slug: string; name: string }[] };

const PRICES = [
  ["", "Any price"],
  ["-20", "Under ₦20m"],
  ["20-50", "₦20m – ₦50m"],
  ["50-100", "₦50m – ₦100m"],
  ["100-250", "₦100m – ₦250m"],
  ["250-", "₦250m+"],
];

export function PropertyFilters({ facets }: { facets: Facets }) {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const [pending, start] = useTransition();

  function set(k: string, v: string) {
    const n = new URLSearchParams(sp.toString());
    if (v) n.set(k, v);
    else n.delete(k);
    start(() => router.replace(`${path}?${n.toString()}`, { scroll: false }));
  }
  const has = [...sp.keys()].length > 0;
  const sel = (name: string, label: string, opts: [string, string][]) => (
    <div className="field">
      <label htmlFor={`f-${name}`}>{label}</label>
      <select id={`f-${name}`} className="input" value={sp.get(name) ?? ""} onChange={(e) => set(name, e.target.value)}>
        <option value="">All</option>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <form
      role="search"
      aria-label="Filter properties"
      onSubmit={(e) => {
        e.preventDefault();
        set("q", String(new FormData(e.currentTarget).get("q") ?? ""));
      }}
      className="border-y border-[var(--line)] py-8"
      aria-busy={pending}
    >
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="field sm:col-span-2 lg:col-span-4">
          <label htmlFor="f-q">Search</label>
          <input id="f-q" name="q" defaultValue={sp.get("q") ?? ""} className="input" placeholder="Name, area, type…  (press Enter)" />
        </div>
        {sel("city", "Location", facets.cities.map((c) => [c, c]))}
        {sel("category", "Category", facets.categories.map((c) => [c.slug, c.name]))}
        {sel("type", "Property type", facets.types.map((c) => [c, c]))}
        <div className="field">
          <label htmlFor="f-price">Price range</label>
          <select id="f-price" className="input" value={sp.get("price") ?? ""} onChange={(e) => set("price", e.target.value)}>
            {PRICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        {sel("availability", "Availability", [["AVAILABLE", "Available"], ["RESERVED", "Reserved"], ["COMING_SOON", "Coming soon"], ["SOLD", "Sold"]])}
        {sel("purpose", "Purpose", [["RESIDENTIAL", "Residential"], ["INVESTMENT", "Investment"]])}
        <div className="flex items-end">
          {has && (
            <button type="button" className="link-arrow" onClick={() => start(() => router.replace(path, { scroll: false }))}>
              Clear filters
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
