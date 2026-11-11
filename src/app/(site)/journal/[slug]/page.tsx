import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { ArticleCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { ARTICLES, waLink } from "@/lib/content";
import { renderProse } from "@/lib/prose";
import { formatDate, readingTime, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const live = () => ARTICLES.filter((a) => a.published && a.body);

export const dynamicParams = false;
export function generateStaticParams() {
  return live().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = live().find((x) => x.slug === slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.date, authors: [a.author], images: [a.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const pub = live();
  const idx = pub.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const a = pub[idx];
  const { nodes, toc } = renderProse(a.body!);
  const prev = pub[idx + 1];
  const next = pub[idx - 1];
  const related = ARTICLES.filter((x) => x.slug !== a.slug).sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category)).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          author: { "@type": "Person", name: a.author },
          datePublished: a.date,
          image: `${siteUrl()}${a.image}`,
          mainEntityOfPage: `${siteUrl()}/journal/${a.slug}`,
        }}
      />
      <article>
        <header className="container-x pb-12 pt-32 lg:pt-44">
          <nav aria-label="Breadcrumb" className="eyebrow">
            <Link href="/journal" className="underline-hover">Knowledge Room</Link> <span aria-hidden>/</span> {a.category}
          </nav>
          <h1 className="display mt-8 max-w-5xl text-[clamp(2.4rem,6vw,5.4rem)]">{a.title}</h1>
          <p className="lede mt-8">{a.excerpt}</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-ink">
            <span>By <strong className="text-ink">{a.author}</strong></span>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
            <span>{readingTime(a.body!)} min read</span>
          </p>
        </header>

        <div className="container-x mb-16">
          <Photo src={a.image} alt={a.imageAlt} priority className="aspect-[4/3] w-full sm:aspect-[21/9]" sizes="100vw" />
        </div>

        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {toc.length > 1 && (
            <aside className="no-print lg:col-span-3" aria-label="Table of contents">
              <nav className="lg:sticky lg:top-28">
                <p className="label">In this article</p>
                <ol className="space-y-3 border-l border-[var(--line)] text-sm">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-8" : "pl-4"}>
                      <a href={`#${t.id}`} className="text-slate-ink transition-colors hover:text-gold-ink">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
          <div className={toc.length > 1 ? "min-w-0 lg:col-span-7" : "min-w-0 lg:col-span-8 lg:col-start-3"}>
            <div className="prose-journal max-w-[42rem]">{nodes}</div>
          </div>
        </div>
      </article>

      {(prev || next) && (
        <nav aria-label="Article navigation" className="container-x mt-24 grid border-y border-[var(--line)] sm:grid-cols-2">
          {prev ? (
            <Link href={`/journal/${prev.slug}`} className="group border-b border-[var(--line)] py-8 sm:border-b-0 sm:border-r sm:pr-8">
              <span className="eyebrow">← Previous</span>
              <span className="display h-sm mt-2 block transition-colors group-hover:text-gold-ink">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/journal/${next.slug}`} className="group py-8 sm:pl-8 sm:text-right">
              <span className="eyebrow">Next →</span>
              <span className="display h-sm mt-2 block transition-colors group-hover:text-gold-ink">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      <section className="container-x py-24" aria-labelledby="rel">
        <h2 id="rel" className="display h-md">Keep reading</h2>
        <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ArticleCard key={r.slug} a={r} />)}
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-ivory">
        <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display h-md max-w-2xl">Questions about your own situation? <em>Let&apos;s talk it through.</em></h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact?type=consultation" className="btn btn-solid">Schedule a consultation</Link>
            <a href={waLink(`Hello Jorbe, I read "${a.title}" and have a question.`)} target="_blank" rel="noopener noreferrer" className="btn btn-line">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
