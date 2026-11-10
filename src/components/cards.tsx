import Link from "next/link";
import { Photo } from "./photo";
import { Arrow } from "./brand";
import { cn } from "@/lib/utils";
import type { Article, Teaser } from "@/lib/content";

/** Dummy property card: image blurred, "Coming soon" overlay, links to /coming-soon. */
export function PropertyCard({ p, large }: { p: Teaser; large?: boolean }) {
  return (
    <article className="group">
      <Link href="/coming-soon?from=properties" className="block" aria-label={`${p.title} — coming soon`}>
        <div className={cn("relative overflow-hidden", large ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]" : "aspect-[4/5]")}>
          <Photo
            src={p.image}
            alt=""
            className="h-full w-full"
            imgClassName="scale-110 blur-xl brightness-90 transition-[filter] duration-700 group-hover:blur-lg"
            sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          />
          <div className="absolute inset-0 bg-ink/25" aria-hidden />
          <div className="on-dark absolute inset-0 flex flex-col items-center justify-center text-center text-ivory">
            <span className="h-px w-10 bg-gold" aria-hidden />
            <span className="display h-md mt-5">Coming soon</span>
            <span className="eyebrow mt-3">Verified listing in preparation</span>
          </div>
          <span className="absolute left-4 top-4 bg-ivory px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
            {p.n}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">{p.place}</p>
            <h3 className="display h-sm mt-2 transition-colors group-hover:text-gold-ink">{p.title}</h3>
          </div>
          <p className="shrink-0 pt-1 text-right text-sm font-semibold">Price on release</p>
        </div>
        <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-slate-ink">{p.type}</p>
        <span className="link-arrow mt-5">
          Notify me <Arrow />
        </span>
      </Link>
    </article>
  );
}

/** Editorial listing row with thumbnail. Dummy: links to /coming-soon. */
export function ArticleRow({ a, n }: { a: Article; n: number }) {
  return (
    <article className="group border-t border-[var(--line)] first:border-t-0">
      <Link
        href="/coming-soon?from=journal"
        className="grid items-center gap-x-10 gap-y-5 py-8 md:grid-cols-[3rem_1fr_13rem]"
      >
        <span className="num hidden md:block">{String(n).padStart(2, "0")}</span>
        <div>
          <p className="eyebrow mb-3">{a.category}</p>
          <h3 className="display h-md transition-colors group-hover:text-gold-ink">{a.title}</h3>
          <p className="mt-3 max-w-2xl text-slate-ink">{a.excerpt}</p>
          <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">Coming soon</p>
        </div>
        <Photo src={a.image} alt={a.title} className="order-first aspect-[16/10] w-full md:order-none md:aspect-[4/3]" sizes="(min-width: 768px) 13rem, 100vw" imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-105" />
      </Link>
    </article>
  );
}
