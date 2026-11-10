import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ArticleRow, EmptyState } from "@/components/cards";
import { Photo } from "@/components/plate";
import { Reveal } from "@/components/motion";
import { Arrow } from "@/components/brand";
import { db } from "@/lib/db";
import { cn, formatDate, readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "Plain-language property education: titles, due diligence, investment risk, buying from abroad and more.",
  alternates: { canonical: "/journal" },
};

const kb = (n: number) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export default async function Journal({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q, category } = await searchParams;
  const term = q?.trim();
  const [cats, articles, resources, faqs] = await Promise.all([
    db.category.findMany({ where: { kind: "ARTICLE" }, orderBy: { sortOrder: "asc" } }),
    db.article.findMany({
      where: {
        published: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(term ? { OR: [{ title: { contains: term } }, { excerpt: { contains: term } }, { body: { contains: term } }] } : {}),
      },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
    db.resource.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    db.faq.findMany({ where: { published: true }, orderBy: [{ topic: "asc" }, { sortOrder: "asc" }] }),
  ]);
  const filtered = !!term || !!category;
  const [lead, ...rest] = articles;
  const topics = [...new Set(faqs.map((f) => f.topic))];

  return (
    <>
      <PageHero
        n="05"
        eyebrow="The Journal"
        title={<>Better informed. <em>Better positioned.</em></>}
        lede="An independent publication on buying, holding and understanding property in Nigeria. Written to be read slowly, and used."
      />

      <div className="container-x pb-8">
        <div className="flex flex-col gap-6 border-y border-[var(--line)] py-6 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Article categories" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {[{ slug: "", name: "All" }, ...cats].map((c) => (
              <Link
                key={c.slug || "all"}
                href={c.slug ? `/journal?category=${c.slug}` : "/journal"}
                aria-current={(category ?? "") === c.slug ? "true" : undefined}
                className={cn(
                  "shrink-0 border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                  (category ?? "") === c.slug ? "border-ink bg-ink text-ivory" : "border-[var(--line)] hover:border-ink"
                )}
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <form action="/journal" role="search" className="flex items-end gap-3 lg:w-80">
            {category && <input type="hidden" name="category" value={category} />}
            <div className="field w-full">
              <label htmlFor="jq" className="sr-only">Search the Journal</label>
              <input id="jq" name="q" defaultValue={term} placeholder="Search articles" className="input" />
            </div>
            <button className="pb-3" aria-label="Search"><Arrow /></button>
          </form>
        </div>
      </div>

      <div className="container-x pb-28">
        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No articles found."
              body={filtered ? "Try a different search or category." : "New writing is on the way."}
            >
              {filtered && <Link href="/journal" className="btn btn-line">Clear search</Link>}
            </EmptyState>
          </div>
        ) : (
          <>
            {lead && !filtered && (
              <Reveal>
                <Link href={`/journal/${lead.slug}`} className="group mt-10 grid gap-10 lg:grid-cols-12" aria-label={`Featured: ${lead.title}`}>
                  <div className="lg:col-span-7">
                    <Photo src={lead.coverUrl} alt={lead.coverAlt || lead.title} variant="court" className="aspect-[16/10] w-full" sizes="(min-width:1024px) 58vw, 100vw" />
                  </div>
                  <div className="flex flex-col justify-center lg:col-span-5">
                    <p className="eyebrow">Featured · {lead.category?.name}</p>
                    <h2 className="display h-lg mt-4 transition-colors group-hover:text-gold-ink">{lead.title}</h2>
                    <p className="mt-5 text-slate-ink">{lead.excerpt}</p>
                    <p className="mt-6 text-sm text-slate-ink">
                      {lead.author} · {lead.publishedAt && formatDate(lead.publishedAt)} · {readingTime(lead.body)} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            )}
            <div className="mt-16">
              <p className="label">{filtered ? `${articles.length} result${articles.length === 1 ? "" : "s"}` : "All articles"}</p>
              {(filtered ? articles : rest).map((a, i) => (
                <ArticleRow key={a.id} a={a} n={i + (filtered ? 1 : 2)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Downloadable guides */}
      <section id="guides" className="on-dark scroll-mt-20 bg-ink py-24 text-ivory" aria-labelledby="guides-h">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Downloads</p>
            <h2 id="guides-h" className="display h-lg mt-5">Guides &amp; checklists</h2>
            <p className="lede mt-5">Take-away PDFs for use on site visits and in conversations with your lawyer.</p>
          </div>
          <div className="lg:col-span-8">
            {resources.length === 0 ? (
              <p className="border border-dashed border-[var(--line-light)] p-8 text-ivory/70">
                Guides are being prepared. Check back soon.
              </p>
            ) : (
              <ul>
                {resources.map((r) => (
                  <li key={r.id} className="border-t border-[var(--line-light)] last:border-b">
                    <a href={`/api/resources/${r.id}`} className="group flex items-center justify-between gap-6 py-6">
                      <span>
                        <span className="display h-sm block transition-colors group-hover:text-gold">{r.title}</span>
                        {r.description && <span className="mt-1 block text-sm text-ivory/65">{r.description}</span>}
                      </span>
                      <span className="shrink-0 text-right text-xs uppercase tracking-[0.14em] text-ivory/65">
                        PDF · {kb(r.fileSize)}
                        <br />
                        <span className="text-gold">Download ↓</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x scroll-mt-20 py-28" aria-labelledby="faq-h">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-h" className="display h-lg mt-5">Common questions</h2>
          </div>
          <div className="space-y-12 lg:col-span-8">
            {faqs.length === 0 && <p className="text-slate-ink">FAQs are being prepared.</p>}
            {topics.map((t) => (
              <div key={t}>
                <h3 className="label">{t}</h3>
                {faqs.filter((f) => f.topic === t).map((f) => (
                  <details key={f.id} className="group border-t border-[var(--line)] py-5 last:border-b">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl">
                      {f.question}
                      <span aria-hidden className="text-gold-ink transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-slate-ink">{f.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
