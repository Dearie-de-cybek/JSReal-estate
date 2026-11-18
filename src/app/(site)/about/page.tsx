import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { PhotoBreak } from "@/components/photo-break";
import { ImageReveal, Reveal, FadeIn } from "@/components/motion";
import { Icon, type IconName } from "@/components/icons";
import { Arrow } from "@/components/brand";
import { ABOUT, IMG } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Jorbe Samuel is a Nigerian real estate consultant helping people make informed property decisions.",
  alternates: { canonical: "/about" },
};

const ic = (n: string) => n as IconName;

export default function About() {
  return (
    <>
      {/* Hero */}
      <header className="container-x grid items-center gap-12 pb-24 pt-32 lg:grid-cols-12 lg:gap-16 lg:pb-36 lg:pt-44">
        <div className="lg:col-span-7">
          <FadeIn><p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-gold" /> About</p></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="display mt-8 text-[clamp(2.6rem,6vw,5.4rem)]">
              Real estate is more than property. <em>It&apos;s about the decisions, dreams and futures people attach to it.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}><p className="lede mt-8">{ABOUT.intro}</p></FadeIn>
          <FadeIn delay={0.4}>
            <ul className="mt-12 grid gap-px bg-[var(--line)] sm:grid-cols-3">
              {ABOUT.pillars.map((p) => (
                <li key={p.label} className="bg-ivory py-5 pr-4 sm:px-5 sm:first:pl-0">
                  <Icon name={ic(p.icon)} className="text-gold-ink" />
                  <p className="mt-4 font-serif text-2xl">{p.label}</p>
                  <p className="mt-1 text-sm text-slate-ink">{p.text}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
        <div className="lg:col-span-5">
          <ImageReveal className="aspect-[4/5]">
            <Photo src={IMG.consultant} alt="Portrait of Jorbe Samuel" className="h-full w-full" imgClassName="object-top" priority sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
          <p className="mt-4 flex items-center justify-between text-sm">
            <span className="font-semibold tracking-[0.3em]">JORBE SAMUEL</span>
            <span className="eyebrow">Real Estate Consultant</span>
          </p>
        </div>
      </header>

      {/* Brand */}
      <section aria-label="JORBE SAMUEL brand" className="bg-[#091535]">
        <div className="relative mx-auto aspect-[16/9] max-h-[85svh] w-full max-w-[1600px]">
          <Photo src={IMG.logo} alt="JORBE SAMUEL — Real Estate Consultant. Inform, guide, build wealth." className="absolute inset-0 h-full w-full !bg-transparent" imgClassName="object-contain" sizes="100vw" />
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-28 lg:py-44" aria-labelledby="story">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex gap-4"><span className="num">01</span> My story</p>
          <h2 id="story" className="display h-lg mt-6">Three things I want you <em>to know.</em></h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-[var(--line)] lg:grid-cols-3">
          {ABOUT.story.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="bg-ivory p-8 sm:p-10">
              <Icon name={ic(c.icon)} size={34} className="text-gold-ink" />
              <p className="eyebrow mt-8">{c.title}</p>
              <p className="display h-sm mt-4 !leading-snug">&ldquo;{c.quote}&rdquo;</p>
              <details className="group mt-8">
                <summary className="link-arrow cursor-pointer list-none">
                  <span className="group-open:hidden">Read more</span>
                  <span className="hidden group-open:inline">Show less</span>
                </summary>
                <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-slate-ink">
                  {c.body.map((t) => <p key={t}>{t}</p>)}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Photo break */}
      <PhotoBreak src={IMG.architect} alt="Hands drafting a plan with pencil and ruler">
        <p className="eyebrow">How I work</p>
        <p className="display h-lg mt-4 max-w-3xl">Listening before recommending. <em>Understanding before presenting.</em></p>
      </PhotoBreak>

      {/* Process */}
      <section className="container-x py-28 lg:py-44" aria-labelledby="process">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex gap-4"><span className="num">02</span> The process</p>
          <h2 id="process" className="display h-lg mt-6">Four steps, <em>no pressure.</em></h2>
        </Reveal>
        <ol className="relative mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute left-[1.35rem] top-[1.35rem] hidden h-px w-[calc(100%-3rem)] bg-[var(--line)] lg:block" />
          {ABOUT.steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 0.08} className="relative">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold-ink)] bg-ivory text-gold-ink">
                <Icon name={ic(s.icon)} size={22} />
              </span>
              <p className="num mt-6">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display h-sm mt-1">{s.t}</h3>
              <p className="mt-2 max-w-[16rem] text-slate-ink">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Values */}
      <section className="border-y border-[var(--line)] bg-stone/45 py-28 lg:py-40" aria-labelledby="values">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex gap-4"><span className="num">03</span> Values</p>
            <h2 id="values" className="display h-lg mt-6">What I <em>hold myself to.</em></h2>
          </Reveal>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.values.map((v, i) => (
              <Reveal as="li" key={v.t} delay={i * 0.07} className="border border-[var(--line)] bg-ivory p-8 transition-colors hover:border-ink">
                <Icon name={ic(v.icon)} size={32} className="text-gold-ink" />
                <h3 className="display h-sm mt-8">{v.t}</h3>
                <p className="mt-2 text-slate-ink">{v.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Who I work with */}
      <section className="on-dark bg-ink text-ivory" aria-labelledby="who">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[44rem]">
            <Photo src={IMG.family} alt="A family together at home" className="absolute inset-0 h-full w-full" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
          <Reveal className="px-[clamp(1.25rem,5vw,5rem)] py-20 lg:py-32">
            <p className="eyebrow flex gap-4"><span className="num">04</span> Who I work with</p>
            <h2 id="who" className="display h-md mt-6">Real concerns deserve <em>more than a sales pitch.</em></h2>
            <ul className="mt-10">
              {ABOUT.clients.map((c) => (
                <li key={c.t} className="flex items-center gap-5 border-t border-[var(--line-light)] py-5 last:border-b">
                  <Icon name={ic(c.icon)} size={30} className="text-gold" />
                  <span><span className="block font-serif text-2xl">{c.t}</span><span className="text-sm text-ivory/65">{c.d}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="container-x py-28 text-center lg:py-44" aria-labelledby="vision">
        <Reveal>
          <p className="eyebrow flex items-center justify-center gap-4"><span className="num">05</span> The vision</p>
          <h2 id="vision" className="display mx-auto mt-8 max-w-4xl text-[clamp(2.4rem,5.5vw,5rem)]">{ABOUT.vision.quote}</h2>
        </Reveal>
        <ul className="mx-auto mt-16 grid max-w-4xl gap-10 text-left sm:grid-cols-3">
          {ABOUT.vision.points.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.08} className="border-t border-[var(--line)] pt-6">
              <Icon name={ic(p.icon)} size={30} className="text-gold-ink" />
              <h3 className="display h-sm mt-5">{p.t}</h3>
              <p className="mt-2 text-slate-ink">{p.d}</p>
            </Reveal>
          ))}
        </ul>
        <details className="group mx-auto mt-14 max-w-2xl text-left">
          <summary className="link-arrow mx-auto w-fit cursor-pointer list-none">
            <span className="group-open:hidden">Read the full vision</span>
            <span className="hidden group-open:inline">Show less</span>
          </summary>
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            {ABOUT.vision.body.map((t) => <p key={t}>{t}</p>)}
          </div>
        </details>
        <p className="mx-auto mt-16 max-w-2xl font-serif text-2xl italic">{ABOUT.closing}</p>
        <p className="mt-10">
          <span className="block text-[0.95rem] font-semibold tracking-[0.34em]">JORBE SAMUEL</span>
          <span className="eyebrow mt-3 block">Property • Wealth • Smart Decisions</span>
        </p>
        <Link href="/contact?type=consultation" className="btn btn-solid mt-12">Start a conversation <Arrow /></Link>
      </section>

      <ClosingCta title="Your next property decision deserves a conversation." />
    </>
  );
}
