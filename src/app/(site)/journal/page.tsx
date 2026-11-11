import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { JournalBrowser } from "@/components/journal-browser";
import { JsonLd } from "@/components/json-ld";
import { ARTICLES, FAQS, GUIDES, articleHref } from "@/lib/content";
import { formatDate, readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Knowledge Room",
  description: "Plain-language property education: titles, due diligence, investment risk, buying from abroad and more.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  const lead = ARTICLES.find((a) => a.published && a.featured) ?? ARTICLES.find((a) => a.published) ?? ARTICLES[0];
  const rest = ARTICLES.filter((a) => a.slug !== lead.slug);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero
        n="05"
        eyebrow="The Knowledge Room"
        title={<>Better informed. <em>Better positioned.</em></>}
        lede="An independent publication on buying, holding and understanding property in Nigeria. Written to be read slowly, and used."
      />

      {/* Featured */}
      <div className="container-x pb-24">
        <Reveal>
          <Link href={articleHref(lead)} className="group grid gap-10 lg:grid-cols-12" aria-label={`Featured: ${lead.title}`}>
            <div className="lg:col-span-8">
              <Photo src={lead.image} alt={lead.imageAlt} priority className="aspect-[4/3] w-full sm:aspect-[16/10]" sizes="(min-width:1024px) 66vw, 100vw" imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p className="eyebrow">Featured · {lead.category}</p>
              <h2 className="display h-lg mt-4 transition-colors group-hover:text-gold-ink">{lead.title}</h2>
              <p className="mt-5 text-slate-ink">{lead.excerpt}</p>
              <p className="mt-6 text-sm text-slate-ink">
                {lead.author} · {formatDate(lead.date)}{lead.body ? ` · ${readingTime(lead.body)} min read` : ""}
              </p>
              <span className="link-arrow mt-6 self-start">Read the article</span>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Browse */}
      <section className="container-x pb-32" aria-label="All articles">
        <JournalBrowser articles={rest} />
      </section>

      {/* Guides */}
      <section id="guides" className="on-dark scroll-mt-20 bg-ink py-28 text-ivory lg:py-40" aria-labelledby="guides-h">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Downloads</p>
            <h2 id="guides-h" className="display h-lg mt-5">Guides &amp; checklists</h2>
            <p className="lede mt-5">Take-away PDFs for site visits and conversations with your lawyer. Being prepared; they will be free to download.</p>
          </Reveal>
          <ul className="mt-16 grid gap-px bg-[var(--line-light)] md:grid-cols-3">
            {GUIDES.map((g, i) => (
              <li key={g.title} className="flex flex-col bg-ink p-8">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display h-sm mt-4">{g.title}</h3>
                <p className="mt-3 flex-1 text-ivory/70">{g.description}</p>
                {g.file ? (
                  <a href={g.file} download className="link-arrow mt-8 self-start">Download PDF ↓</a>
                ) : (
                  <span className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold">Coming soon</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x scroll-mt-20 py-28 lg:py-40" aria-labelledby="faq-h">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-h" className="display h-lg mt-5">Common questions</h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-[var(--line)] py-5 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-gold-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-slate-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
