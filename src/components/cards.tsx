import Link from "next/link";
import { Photo } from "./photo";
import { Arrow } from "./brand";
import { cn, formatDate, formatNaira, readingTime } from "@/lib/utils";
import { articleHref, propertyHref, type Article, type Property } from "@/lib/content";

const AVAIL: Record<string, string> = { available: "Available", reserved: "Reserved", sold: "Sold", "coming-soon": "Coming soon" };

export function priceLabel(p: Property) {
  if (p.price == null || !p.priceVerified) return "Price on request";
  return formatNaira(p.price) + (p.priceNote ? ` · ${p.priceNote}` : "");
}

/** Property card. Unreleased = blurred teaser with "Coming soon"; released = clear, with facts. */
export function PropertyCard({ p, large }: { p: Property; large?: boolean }) {
  const img = p.images[0];
  const teaser = !p.released;
  const facts = [
    p.specs.bedrooms ? `${p.specs.bedrooms} bed` : null,
    p.specs.bathrooms ? `${p.specs.bathrooms} bath` : null,
    p.specs.sizeSqm ? `${p.specs.sizeSqm.toLocaleString()} m²` : null,
  ].filter(Boolean) as string[];
  return (
    <article className="group">
      <Link href={propertyHref(p)} className="block" aria-label={teaser ? `${p.name} — coming soon` : `${p.name} — view property`}>
        <div className={cn("relative overflow-hidden", large ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]" : "aspect-[4/5]")}>
          <Photo
            src={img.src}
            alt={teaser ? "" : img.alt}
            className="h-full w-full"
            imgClassName={teaser ? "scale-110 blur-xl brightness-90 transition-[filter] duration-700 group-hover:blur-lg" : "transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"}
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          />
          {teaser ? (
            <>
              <div className="absolute inset-0 bg-ink/25" aria-hidden />
              <div className="on-dark absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-ivory">
                <span className="h-px w-10 bg-gold" aria-hidden />
                <span className="display h-md mt-5">Coming soon</span>
                <span className="eyebrow mt-3">Verified listing in preparation</span>
              </div>
            </>
          ) : (
            <span className="absolute left-4 top-4 bg-ivory px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">{AVAIL[p.availability]}</span>
          )}
          <span className="absolute right-4 top-4 bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory">{p.n}</span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">{teaser ? "Location revealed on release" : [p.city, p.state].filter(Boolean).join(", ")}</p>
            <h3 className="display h-sm mt-2 transition-colors group-hover:text-gold-ink">{p.name}</h3>
          </div>
          <p className="shrink-0 pt-1 text-right text-sm font-semibold">{teaser ? "Price on release" : priceLabel(p)}</p>
        </div>
        <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-slate-ink">{[p.type, p.purpose].filter((v, i, a) => v && a.indexOf(v) === i).join(" · ")}</p>
        {facts.length > 0 && !teaser && <p className="mt-3 text-[0.92rem] text-slate-ink">{facts.join("  ·  ")}</p>}
        <span className="link-arrow mt-5">{teaser ? "Notify me" : "View property"} <Arrow /></span>
      </Link>
    </article>
  );
}

/** Image-led article card. Unpublished articles read "Coming soon". */
export function ArticleCard({ a, tall, priority }: { a: Article; tall?: boolean; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={articleHref(a)} className="block" aria-label={a.published ? a.title : `${a.title} — coming soon`}>
        <Photo
          src={a.image}
          alt={a.imageAlt}
          priority={priority}
          className={cn("w-full", tall ? "aspect-[4/5]" : "aspect-[4/3]")}
          imgClassName={cn("transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]", !a.published && "brightness-90")}
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <p className="eyebrow mt-6">{a.category}</p>
        <h3 className="display h-md mt-3 transition-colors group-hover:text-gold-ink">{a.title}</h3>
        <p className="mt-3 text-slate-ink">{a.excerpt}</p>
        <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">
          {a.published ? `${formatDate(a.date)} · ${a.body ? readingTime(a.body) : 5} min read` : "Coming soon"}
        </p>
      </Link>
    </article>
  );
}

/** Compact editorial row, used for related reading and lists. */
export function ArticleRow({ a, n }: { a: Article; n: number }) {
  return (
    <article className="group border-t border-[var(--line)] first:border-t-0">
      <Link href={articleHref(a)} className="grid items-center gap-x-10 gap-y-5 py-8 md:grid-cols-[3rem_1fr_13rem]">
        <span className="num hidden md:block">{String(n).padStart(2, "0")}</span>
        <div>
          <p className="eyebrow mb-3">{a.category}</p>
          <h3 className="display h-md transition-colors group-hover:text-gold-ink">{a.title}</h3>
          <p className="mt-3 max-w-2xl text-slate-ink">{a.excerpt}</p>
          {!a.published && <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">Coming soon</p>}
        </div>
        <Photo src={a.image} alt={a.imageAlt} className="order-first aspect-[16/10] w-full md:order-none md:aspect-[4/3]" sizes="(min-width: 768px) 13rem, 100vw" imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-105" />
      </Link>
    </article>
  );
}
