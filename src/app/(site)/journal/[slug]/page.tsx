import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { ArticleRow } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { NewsletterForm } from "@/components/forms";
import { Photo } from "@/components/plate";
import { db } from "@/lib/db";
import { articleBySlug, relatedArticles } from "@/lib/queries";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, readingTime, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await articleBySlug(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      publishedTime: a.publishedAt?.toISOString(),
      authors: [a.author],
      images: a.coverUrl ? [a.coverUrl] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = await articleBySlug(slug);
  if (!a) notFound();
  const { html, toc } = renderMarkdown(a.body);
  const [related, prev, next] = await Promise.all([
    relatedArticles(a.id, a.categoryId),
    db.article.findFirst({ where: { published: true, publishedAt: { lt: a.publishedAt ?? new Date() } }, orderBy: { publishedAt: "desc" }, select: { slug: true, title: true } }),
    db.article.findFirst({ where: { published: true, publishedAt: { gt: a.publishedAt ?? new Date() } }, orderBy: { publishedAt: "asc" }, select: { slug: true, title: true } }),
  ]);
  const mins = readingTime(a.body);

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
          datePublished: a.publishedAt?.toISOString(),
          dateModified: a.updatedAt.toISOString(),
          mainEntityOfPage: `${siteUrl()}/journal/${a.slug}`,
          ...(a.coverUrl ? { image: `${siteUrl()}${a.coverUrl}` } : {}),
          publisher: { "@type": "Person", name: "Jorbe Samuel" },
        }}
      />
      <article>
        <header className="container-x pb-14 pt-36 lg:pt-44">
          <nav aria-label="Breadcrumb" className="eyebrow">
            <Link href="/journal" className="underline-hover">Journal</Link>
            {a.category && (<> <span aria-hidden>/</span> <Link href={`/journal?category=${a.category.slug}`} className="underline-hover">{a.category.name}</Link></>)}
          </nav>
          <h1 className="display h-xl mt-8 max-w-5xl !text-[clamp(2.6rem,6vw,5.4rem)]">{a.title}</h1>
          <p className="lede mt-8">{a.excerpt}</p>
          <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-ink">
            <span>By <strong className="text-ink">{a.author}</strong></span>
            {a.publishedAt && <time dateTime={a.publishedAt.toISOString()}>{formatDate(a.publishedAt)}</time>}
            <span>{mins} min read</span>
          </p>
        </header>

        {a.coverUrl && (
          <div className="container-x mb-16">
            <Photo src={a.coverUrl} alt={a.coverAlt || a.title} className="aspect-[21/9] w-full" priority sizes="100vw" />
          </div>
        )}

        <div className="container-x grid gap-16 lg:grid-cols-12">
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
          <div className={toc.length > 1 ? "lg:col-span-7" : "lg:col-span-8 lg:col-start-3"}>
            <div className="prose-journal max-w-[42rem]" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </article>

      <nav aria-label="Article navigation" className="container-x mt-24 grid border-y border-[var(--line)] sm:grid-cols-2">
        {prev ? (
          <Link href={`/journal/${prev.slug}`} className="group border-b border-[var(--line)] py-8 sm:border-b-0 sm:border-r sm:pr-8">
            <span className="eyebrow">← Previous</span>
            <span className="display h-sm mt-2 block transition-colors group-hover:text-gold-ink">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/journal/${next.slug}`} className="group py-8 sm:pl-8 sm:text-right">
            <span className="eyebrow">Next →</span>
            <span className="display h-sm mt-2 block transition-colors group-hover:text-gold-ink">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>

      {related.length > 0 && (
        <section className="container-x py-24" aria-labelledby="rel">
          <h2 id="rel" className="display h-md">Related reading</h2>
          <div className="mt-8">
            {related.map((r, i) => <ArticleRow key={r.id} a={r} n={i + 1} />)}
          </div>
        </section>
      )}

      <section className="on-dark bg-ink py-20 text-ivory">
        <div className="container-x grid items-end gap-10 lg:grid-cols-2">
          <h2 className="display h-md">Questions about your own situation? <em>Let&apos;s talk it through.</em></h2>
          <div className="space-y-8">
            <Link href="/contact?type=consultation" className="btn btn-solid">Schedule a consultation</Link>
            <div><p className="eyebrow mb-3">Or get new articles by email</p><NewsletterForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}
