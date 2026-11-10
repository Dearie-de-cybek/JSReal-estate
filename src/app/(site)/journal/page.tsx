import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ArticleRow } from "@/components/cards";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description: "Plain-language property education: titles, due diligence, investment risk, buying from abroad and more.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  const [lead, ...rest] = ARTICLES;
  const cats = [...new Set(ARTICLES.map((a) => a.category))];
  return (
    <>
      <PageHero
        n="05"
        eyebrow="The Journal"
        title={<>Better informed. <em>Better positioned.</em></>}
        lede="An independent publication on buying, holding and understanding property in Nigeria. The first articles are coming soon."
      />

      <div className="container-x pb-28">
        <nav aria-label="Article categories" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto border-y border-[var(--line)] px-1 py-6">
          {["All", ...cats].map((c, i) => (
            <Link
              key={c}
              href="/coming-soon?from=journal"
              className={`shrink-0 border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${i === 0 ? "border-ink bg-ink text-ivory" : "border-[var(--line)] hover:border-ink"}`}
            >
              {c}
            </Link>
          ))}
        </nav>

        <Reveal>
          <Link href="/coming-soon?from=journal" className="group mt-10 grid gap-10 lg:grid-cols-12" aria-label={`Featured: ${lead.title} — coming soon`}>
            <div className="lg:col-span-7">
              <Photo src={lead.image} alt={lead.title} className="aspect-[16/10] w-full" sizes="(min-width:1024px) 58vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]" priority />
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">Featured · {lead.category}</p>
              <h2 className="display h-lg mt-4 transition-colors group-hover:text-gold-ink">{lead.title}</h2>
              <p className="mt-5 text-slate-ink">{lead.excerpt}</p>
              <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold-ink">Coming soon</p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-16">
          <p className="label">All articles</p>
          {rest.map((a, i) => <ArticleRow key={a.title} a={a} n={i + 2} />)}
        </div>
      </div>
    </>
  );
}
