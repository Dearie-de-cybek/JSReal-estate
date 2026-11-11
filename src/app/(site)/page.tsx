import Link from "next/link";
import { Arrow } from "@/components/brand";
import { Photo } from "@/components/photo";
import { FadeIn, HeroBackdrop, ImageReveal, Lines, Reveal } from "@/components/motion";
import { ArticleCard, PropertyCard } from "@/components/cards";
import { PhotoBreak } from "@/components/photo-break";
import { ServiceShowcase } from "@/components/service-showcase";
import { JsonLd } from "@/components/json-ld";
import { ARTICLES, IMG, PROPERTIES, SERVICE_IMG, waLink } from "@/lib/content";
import { SERVICES } from "@/lib/services";
import { siteUrl } from "@/lib/utils";

export default function Home() {
  const articles = [...ARTICLES].sort((a, b) => Number(b.published) - Number(a.published)).slice(0, 3);
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
          <Photo src={IMG.hero} alt="Contemporary residence at dusk with a lit pool" className="h-full w-full" priority sizes="100vw" />
        </HeroBackdrop>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/5" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent" aria-hidden />
        <div className="container-x relative z-10 pb-14 pt-40 sm:pb-24">
          <FadeIn delay={0.3}>
            <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-gold" /> Property • Wealth • Smart Decisions</p>
          </FadeIn>
          <h1 className="display h-xl mt-8 max-w-5xl">
            <Lines lines={["Property decisions", "deserve more than", <em key="g">guesswork.</em>]} />
          </h1>
          <FadeIn delay={1.3} className="mt-10 max-w-xl">
            <p className="lede">
              Real estate is one of life&apos;s most significant financial decisions. I help you understand the opportunities,
              navigate the complexities and make informed moves with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/properties" className="btn btn-solid">Explore Property Opportunities <Arrow /></Link>
              <Link href="/about#approach" className="btn btn-line">Discover My Approach</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 02 — PHILOSOPHY */}
      <section className="container-x grid items-center gap-16 py-32 lg:grid-cols-12 lg:py-52" aria-labelledby="philosophy">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow flex gap-4"><span className="num">01</span> Philosophy</p></Reveal>
          <Reveal delay={0.1}>
            <h2 id="philosophy" className="display h-lg mt-8">
              More than a transaction. <em>A decision that shapes your financial future.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="lede">
              I&apos;m Jorbe Samuel, a real estate consultant working with individuals, families, first-time buyers, investors and
              Nigerians abroad. My work is to slow the process down at the right moments.
            </p>
            <Link href="/about" className="link-arrow mt-10">The full story <Arrow /></Link>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ImageReveal className="aspect-[4/5]">
            <Photo src={IMG.philosophy} alt="Modern white house at dusk" className="h-full w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      {/* Photo break — Lagos */}
      <PhotoBreak src={IMG.breakLagos} alt="Lekki and Civic Towers, Lagos, on a bright day">
        <p className="eyebrow">Nigeria · Diaspora</p>
        <p className="display h-lg mt-4 max-w-3xl">Informed decisions, <em>from Lagos to wherever you call home.</em></p>
      </PhotoBreak>

      {/* 03 — ADVISORY */}
      <section className="on-dark bg-ink py-32 text-ivory lg:py-48" aria-labelledby="advisory">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex gap-4"><span className="num">02</span> Advisory</p>
            <h2 id="advisory" className="display h-lg mt-8">Four ways to <em>decide well.</em></h2>
          </Reveal>
          <Reveal className="mt-16 lg:mt-24">
            <ServiceShowcase items={SERVICES.map((s) => ({ slug: s.slug, n: s.n, title: s.title, short: s.short, image: SERVICE_IMG[s.slug] }))} />
          </Reveal>
        </div>
      </section>

      {/* Photo break — verified first */}
      <PhotoBreak src="/images/dusk-white.jpg" alt="Modern home with an illuminated entrance path" align="right">
        <p className="eyebrow">Curated · Verified</p>
        <p className="display h-lg ml-auto mt-4 max-w-3xl">Nothing is featured <em>until it has been checked.</em></p>
      </PhotoBreak>

      {/* 04 — PROPERTIES */}
      <section className="container-x py-32 lg:py-48" aria-labelledby="featured">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">03</span> Curated opportunities</p>
            <h2 id="featured" className="display h-lg mt-8">Selected, <em>not scattered.</em></h2>
          </Reveal>
          <Reveal delay={0.1}><Link href="/properties" className="link-arrow">All properties <Arrow /></Link></Reveal>
        </div>
        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className={i === 1 ? "lg:mt-16" : ""}><PropertyCard p={p} /></Reveal>
          ))}
        </div>
      </section>

      {/* 05 — KNOWLEDGE ROOM */}
      <section className="border-y border-[var(--line)] bg-stone/45 py-32 lg:py-48" aria-labelledby="knowledge">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal className="max-w-2xl">
              <p className="eyebrow flex gap-4"><span className="num">04</span> The Knowledge Room</p>
              <h2 id="knowledge" className="display h-lg mt-8">Better informed. <em>Better positioned.</em></h2>
            </Reveal>
            <Reveal delay={0.1}><Link href="/journal" className="link-arrow">Enter the Journal <Arrow /></Link></Reveal>
          </div>
          <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08} className={i === 1 ? "lg:mt-16" : ""}><ArticleCard a={a} tall={i === 1} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — CONSULTANT */}
      <section className="container-x grid items-center gap-16 py-32 lg:grid-cols-12 lg:py-52" aria-labelledby="consultant">
        <div className="lg:col-span-5">
          <ImageReveal className="aspect-[4/5]">
            <Photo src={IMG.consultant} alt="A calm, considered interior" className="h-full w-full" sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow flex gap-4"><span className="num">05</span> The consultant</p>
          <h2 id="consultant" className="display h-lg mt-8">Jorbe Samuel. <em>Questions first.</em></h2>
          <p className="lede mt-8">
            I start with questions, not listings: what the money is for, what the documents actually prove, and what could go
            wrong, before anything is paid.
          </p>
          <p className="mt-8 max-w-xl border-l-2 border-gold pl-5 font-serif text-2xl italic">
            You will know what you are buying, what it can and cannot prove, and what it costs, before you commit.
          </p>
          <Link href="/about" className="link-arrow mt-10">Read the full story <Arrow /></Link>
        </Reveal>
      </section>

      {/* 07 — CTA */}
      <section className="on-dark grain relative isolate overflow-hidden bg-ink py-36 text-ivory lg:py-56" aria-labelledby="cta">
        <Photo src={IMG.cta} alt="" className="absolute inset-0 -z-10 h-full w-full" imgClassName="opacity-45" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-ink/55" aria-hidden />
        <div className="container-x text-center">
          <Reveal>
            <p className="eyebrow">06 — Begin</p>
            <h2 id="cta" className="display h-xl mx-auto mt-8 max-w-5xl">Your next property decision deserves <em>a conversation.</em></h2>
            <p className="lede mx-auto mt-8">
              Whether you&apos;re buying your first home, exploring an investment or purchasing from abroad, let&apos;s start with the right questions.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=consultation" className="btn btn-solid">Schedule a consultation <Arrow /></Link>
              <a href={waLink("Hello Jorbe, I'd like to discuss a property decision.")} target="_blank" rel="noopener noreferrer" className="btn btn-line">Chat on WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
