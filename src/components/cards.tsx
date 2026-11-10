import Link from "next/link";
import { Photo } from "./plate";
import { Arrow } from "./brand";
import { AVAILABILITY, PURPOSE, cn, formatDate, formatNaira, readingTime } from "@/lib/utils";
import type { PropertyFull } from "@/lib/queries";
import { featuresOf } from "@/lib/queries";

const VARIANTS = ["dusk", "court", "lines"] as const;

export function AvailabilityBadge({ value, className }: { value: string; className?: string }) {
  const tone =
    value === "AVAILABLE" ? "bg-ivory text-ink" : value === "SOLD" ? "bg-ink text-ivory" : "bg-gold text-ink";
  return (
    <span className={cn("inline-block px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]", tone, className)}>
      {AVAILABILITY[value] ?? value}
    </span>
  );
}

export function priceLabel(p: { price: number | null; priceVerified: boolean; priceNote: string }) {
  if (p.price == null || !p.priceVerified) return p.priceNote || "Price on request";
  return formatNaira(p.price) + (p.priceNote ? ` · ${p.priceNote}` : "");
}

export function PropertyCard({
  p,
  index = 0,
  large,
}: {
  p: PropertyFull;
  index?: number;
  large?: boolean;
}) {
  const img = p.images[0];
  const feats = featuresOf(p).slice(0, 3);
  const facts = [
    p.bedrooms ? `${p.bedrooms} bed` : null,
    p.bathrooms ? `${p.bathrooms} bath` : null,
    p.sizeSqm ? `${p.sizeSqm.toLocaleString()} m²` : null,
    ...feats,
  ].filter(Boolean) as string[];
  return (
    <article className="group">
      <Link href={`/properties/${p.slug}`} className="block" aria-label={`${p.name} — view property`}>
        <div className={cn("relative", large ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]" : "aspect-[4/5]")}>
          <Photo
            src={img?.url}
            alt={img?.alt || p.name}
            variant={VARIANTS[index % 3]}
            className="h-full w-full [&_img]:transition-transform [&_img]:duration-[1400ms] [&_img]:ease-[var(--ease-editorial)] group-hover:[&_img]:scale-[1.04] [&_svg]:transition-transform [&_svg]:duration-[1400ms] group-hover:[&_svg]:scale-[1.04]"
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          />
          <AvailabilityBadge value={p.availability} className="absolute left-4 top-4" />
          {!img && (
            <span className="absolute bottom-3 right-3 text-[0.6rem] uppercase tracking-[0.2em] text-ivory/70">
              Photography pending
            </span>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">
              {[p.city, p.state].filter(Boolean).join(", ") || "Location on request"}
            </p>
            <h3 className="display h-sm mt-2 transition-colors group-hover:text-gold-ink">{p.name}</h3>
          </div>
          <p className="shrink-0 pt-1 text-right text-sm font-semibold">{priceLabel(p)}</p>
        </div>
        <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-slate-ink">
          {[p.propertyType, PURPOSE[p.purpose]].filter(Boolean).join(" · ")}
        </p>
        {facts.length > 0 && (
          <p className="mt-3 text-[0.92rem] text-slate-ink">{facts.join("  ·  ")}</p>
        )}
        <span className="link-arrow mt-5">
          View property <Arrow />
        </span>
      </Link>
    </article>
  );
}

type ArticleLite = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  body: string;
  publishedAt: Date | null;
  category: { name: string } | null;
};

/** Editorial listing: a publication contents row, not a blog card. */
export function ArticleRow({ a, n }: { a: ArticleLite; n: number }) {
  return (
    <article className="group border-t border-[var(--line)] first:border-t-0">
      <Link
        href={`/journal/${a.slug}`}
        className="grid gap-x-10 gap-y-3 py-8 md:grid-cols-[4rem_1fr_16rem] md:items-baseline"
      >
        <span className="num hidden md:block">{String(n).padStart(2, "0")}</span>
        <div>
          <p className="eyebrow mb-3">{a.category?.name ?? "Journal"}</p>
          <h3 className="display h-md transition-colors group-hover:text-gold-ink">{a.title}</h3>
          <p className="mt-3 max-w-2xl text-slate-ink">{a.excerpt}</p>
        </div>
        <p className="text-[0.82rem] text-slate-ink md:text-right">
          {a.publishedAt ? formatDate(a.publishedAt) : "Draft"}
          <br />
          {readingTime(a.body)} min read · {a.author}
        </p>
      </Link>
    </article>
  );
}

export function EmptyState({ title, body, children }: { title: string; body: string; children?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-[var(--line)] px-8 py-16 text-center">
      <p className="num">—</p>
      <h3 className="display h-sm mt-3">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-slate-ink">{body}</p>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
