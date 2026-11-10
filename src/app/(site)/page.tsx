import Link from "next/link";
import { Arrow } from "@/components/brand";
import { Photo } from "@/components/photo";
import { FadeIn, HeroBackdrop, ImageReveal, Lines, Reveal } from "@/components/motion";
import { ArticleRow, PropertyCard } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { ARTICLES, IMG, PROPERTIES, SERVICE_IMG, SITE, waLink } from "@/lib/content";
import { SERVICES, TOPICS } from "@/lib/services";
import { siteUrl } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Jorbe Samuel — Real Estate Consultant",
          url: siteUrl(),
          description: "Property advisory, investment guidance and education in Nigeria.",
          areaServed: "NG",
          founder: { "@type": "Person", name: "Jorbe Samuel", jobTitle: "Real Estate Consultant" },
        }}
      />

      {/* 01 — HERO */}
      <section className="on-dark grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-ivory">
        <HeroBackdrop>
          <Photo src={IMG.hero} alt="Contemporary residence at dusk" className="h-full w-full" priority sizes="100vw" />
        </HeroBackdrop>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" aria-hidden />

        <div className="container-x relative z-10 pb-16 pt-40 sm:pb-24">
          <FadeIn delay={0.3}>
            <p className="eyebrow flex items-center gap-4">
              <span className="h-px w-10 bg-gold" /> Property • Wealth • Smart Decisions
            </p>
          </FadeIn>
          <h1 className="display h-xl mt-8 max-w-5xl">
            <Lines lines={["Property decisions", "deserve more than", <em key="g">guesswork.</em>]} />
          </h1>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <FadeIn delay={1.3} className="lg:col-span-6">
              <p className="lede">
                Real estate is one of life&apos;s most significant financial decisions. I help you understand the
                opportunities, navigate the complexities and make informed moves with confidence.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/properties" className="btn btn-solid">
                  Explore Property Opportunities <Arrow />
                </Link>
                <Link href="/about#approach" className="btn btn-line">Discover My Approach</Link>
              </div>
            </FadeIn>
            <FadeIn delay={1.6} className="hidden justify-self-end lg:col-span-3 lg:col-start-10 lg:block">
              <p className="eyebrow text-right leading-loose">
                Jorbe Samuel
                <br />
                Real Estate Consultant
                <br />
                <span className="text-gold">Nigeria · Worldwide diaspora</span>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 02 — PHILOSOPHY */}
      <section className="container-x grid gap-16 py-28 lg:grid-cols-12 lg:py-40" aria-labelledby="philosophy">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">01</span> Philosophy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="philosophy" className="display h-lg mt-8 max-w-3xl">
              A property purchase is more than a transaction. <em>It is a decision that can shape your financial future.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-12 grid gap-8 sm:grid-cols-2">
            <p className="lede !text-ink">
              I&apos;m Jorbe Samuel, a real estate consultant working with individuals, families, first-time buyers,
              investors and Nigerians abroad.
            </p>
            <p className="text-slate-ink">
              My work is to slow the process down at the right moments: to ask what the money is for, what the documents
              actually prove, and what could go wrong, before anything is paid.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Link href="/about" className="link-arrow">The full story <Arrow /></Link>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <ImageReveal className="aspect-[4/5]">
            <Photo src={IMG.philosophy} alt="Contemporary timber-clad home" className="h-full w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      {/* 03 — ADVISORY PILLARS */}
      <section className="on-dark bg-ink py-28 text-ivory lg:py-40" aria-labelledby="advisory">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow flex gap-4"><span className="num">02</span> Advisory</p>
              <h2 id="advisory" className="display h-lg mt-8">Four ways to <em>decide well.</em></h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="lede">Each begins the same way: with your purpose, your numbers and the questions worth asking first.</p>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-x-10 gap-y-20 lg:grid-cols-12">
            {SERVICES.map((sv, i) => {
              const layout = ["lg:col-span-7", "lg:col-span-5 lg:mt-32", "lg:col-span-5 lg:-mt-16", "lg:col-span-7 lg:mt-16"][i];
              const ratio = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/10]"][i];
              return (
                <Reveal key={sv.slug} className={layout}>
                  <Link href={`/advisory#${sv.slug}`} className="group block">
                    <div className={`relative overflow-hidden ${ratio}`}>
                      <Photo
                        src={SERVICE_IMG[sv.slug]}
                        alt={sv.title}
                        className="h-full w-full"
                        imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                        sizes="(min-width:1024px) 55vw, 100vw"
                      />
                      <span className="num absolute left-5 top-4 !text-lg !text-ivory drop-shadow">{sv.n}</span>
                    </div>
                    <h3 className="display h-md mt-6 transition-colors group-hover:text-gold">{sv.title}</h3>
                    <p className="mt-3 max-w-lg text-ivory/70">{sv.short}</p>
                    <span className="link-arrow mt-6">Learn more <Arrow /></span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 — FEATURED PROPERTIES (coming soon) */}
      <section className="container-x py-28 lg:py-40" aria-labelledby="featured">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">03</span> Curated opportunities</p>
            <h2 id="featured" className="display h-lg mt-8">Selected, <em>not scattered.</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/properties" className="link-arrow">All properties <Arrow /></Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          {PROPERTIES.slice(0, 3).map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className={i === 0 ? "lg:col-span-12" : "lg:col-span-6"}>
              <PropertyCard p={p} large={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 — KNOWLEDGE ROOM (dummy) */}
      <section className="border-y border-[var(--line)] bg-stone/45 py-28 lg:py-40" aria-labelledby="knowledge">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow flex gap-4"><span className="num">04</span> The Knowledge Room</p>
                <h2 id="knowledge" className="display h-lg mt-8">Better informed. <em>Better positioned.</em></h2>
                <p className="lede mt-6">Plain-language education on the decisions that matter most before you buy.</p>
                <ul className="mt-8 space-y-2 text-[0.92rem] text-slate-ink">
                  {TOPICS.map((t) => (
                    <li key={t} className="flex gap-3"><span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold-ink" />{t}</li>
                  ))}
                </ul>
                <Link href="/journal" className="link-arrow mt-10">Enter the Journal <Arrow /></Link>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-8">
            {ARTICLES.slice(0, 5).map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <ArticleRow a={a} n={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — THE CONSULTANT */}
      <section className="container-x grid gap-16 py-28 lg:grid-cols-12 lg:py-40" aria-labelledby="consultant">
        <div className="lg:order-2 lg:col-span-5">
          <ImageReveal className="aspect-[4/5]">
            <Photo src={IMG.consultant} alt="A considered interior" className="h-full w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">05</span> The consultant</p>
            <h2 id="consultant" className="display h-lg mt-8">Jorbe Samuel. <em>Questions first.</em></h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 space-y-8">
            <div>
              <h3 className="label">Story</h3>
              <p className="max-w-2xl text-lg">{SITE.story}</p>
            </div>
            <div>
              <h3 className="label">Approach</h3>
              <p className="max-w-2xl text-slate-ink">{SITE.approach}</p>
            </div>
            <div>
              <h3 className="label">Values</h3>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {SITE.values.map((v) => (
                  <li key={v} className="border-t border-[var(--line)] py-4 font-serif text-xl">{v}</li>
                ))}
              </ul>
            </div>
            <p className="max-w-2xl border-l-2 border-gold pl-5 font-serif text-2xl italic">
              My commitment: you will know what you are buying, what it can and cannot prove, and what it costs, before you commit.
            </p>
            <Link href="/about" className="link-arrow">Read the full About page <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* 07 — CONSULTATION CTA */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink py-32 text-ivory lg:py-48" aria-labelledby="cta">
        <Photo src={IMG.cta} alt="" className="absolute inset-0 -z-10 h-full w-full" imgClassName="opacity-30" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden />
        <div className="container-x text-center">
          <Reveal>
            <p className="eyebrow">06 — Begin</p>
            <h2 id="cta" className="display h-xl mx-auto mt-8 max-w-5xl">
              Your next property decision deserves <em>a conversation.</em>
            </h2>
            <p className="lede mx-auto mt-8">
              Whether you&apos;re buying your first home, exploring an investment or purchasing from abroad, let&apos;s start
              with the right questions.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=consultation" className="btn btn-solid">Schedule a consultation <Arrow /></Link>
              <a href={waLink("Hello Jorbe, I'd like to discuss a property decision.")} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
