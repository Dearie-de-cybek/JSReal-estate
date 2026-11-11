import type { Metadata } from "next";
import { PageHero, ClosingCta } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { PhotoBreak } from "@/components/photo-break";
import { ImageReveal, Reveal } from "@/components/motion";
import { ABOUT, IMG } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Jorbe Samuel is a Nigerian real estate consultant helping people make informed property decisions.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A consultant who would rather you <em>wait</em> than regret.</>}
        lede="Jorbe Samuel is a real estate consultant in Nigeria. His work is to help individuals, families, first-time buyers, investors and Nigerians in the diaspora decide well, before any money moves."
      />

      {/* Story */}
      <section className="container-x grid gap-16 pb-32 lg:grid-cols-12 lg:pb-48" aria-labelledby="story">
        <div className="lg:col-span-5">
          <ImageReveal className="aspect-[4/5] lg:sticky lg:top-28">
            <Photo src={IMG.consultant} alt="A calm, considered interior" className="h-full w-full" priority sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
        <div className="space-y-20 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">01</span> My story</p>
            <h2 id="story" className="display h-md mt-5">How I came to this work.</h2>
          </Reveal>
          {ABOUT.story.map((c, i) => (
            <Reveal key={c.title}>
              <p className="label">Chapter {i + 1}</p>
              <h3 className="display h-sm">{c.title}</h3>
              <p className="mt-4 text-lg leading-relaxed">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photo break */}
      <PhotoBreak src={IMG.architect} alt="Hands drafting a plan with pencil and ruler">
        <p className="eyebrow" id="approach">Approach</p>
        <p className="display h-lg mt-4 max-w-3xl">Questions, then documents, <em>then property.</em></p>
      </PhotoBreak>

      {/* Approach */}
      <section className="container-x py-32 lg:py-48" aria-labelledby="approach-h">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow flex gap-4"><span className="num">02</span> How I work</p>
            <h2 id="approach-h" className="display h-md mt-5">An approach built on verification.</h2>
            <p className="lede mt-6">{ABOUT.approach}</p>
          </Reveal>
          <ol className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {ABOUT.steps.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="bg-ivory p-8">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display h-sm mt-3">{t}</h3>
                <p className="mt-3 text-slate-ink">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Background */}
      {ABOUT.background.length > 0 && (
        <section className="border-y border-[var(--line)] bg-stone/45 py-28 lg:py-40" aria-labelledby="bg-h">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow flex gap-4"><span className="num">03</span> Background</p>
              <h2 id="bg-h" className="display h-md mt-5">Experience and training.</h2>
            </Reveal>
            <ol className="lg:col-span-7 lg:col-start-6">
              {ABOUT.background.map((b, i) => (
                <Reveal as="li" key={i} className="grid grid-cols-[6rem_1fr] gap-6 border-t border-[var(--line)] py-6 last:border-b">
                  <span className="num !text-lg">{b.when}</span>
                  <span className="text-lg">{b.what}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="container-x py-32 lg:py-48" aria-labelledby="values-h">
        <Reveal>
          <p className="eyebrow flex gap-4"><span className="num">04</span> Values</p>
          <h2 id="values-h" className="display h-lg mt-6 max-w-3xl">What you can <em>hold me to.</em></h2>
        </Reveal>
        <ul className="mt-16 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {ABOUT.values.map(([t, d], i) => (
            <Reveal as="li" key={t} className="border-t border-[var(--line)] py-8">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display h-sm mt-3">{t}</h3>
              <p className="mt-2 text-slate-ink">{d}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Who I work with */}
      <section className="on-dark bg-ink text-ivory" aria-labelledby="who-h">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[40rem]">
            <Photo src={IMG.family} alt="A family together at home" className="absolute inset-0 h-full w-full" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
          <Reveal className="px-[clamp(1.25rem,5vw,5rem)] py-20 lg:py-32">
            <p className="eyebrow flex gap-4"><span className="num">05</span> Who I work with</p>
            <h2 id="who-h" className="display h-md mt-6">Why informed property decisions matter.</h2>
            <p className="lede mt-6">
              For many families, property is the largest purchase of a lifetime. It can build security for generations, or lock up
              savings in a title that cannot be proved. The difference is rarely luck.
            </p>
            <ul className="mt-10">
              {ABOUT.clients.map((c) => (
                <li key={c} className="flex gap-4 border-t border-[var(--line-light)] py-4 last:border-b"><span className="mt-[0.8em] h-px w-5 shrink-0 bg-gold" />{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ClosingCta title="Your next property decision deserves a conversation." />
    </>
  );
}
