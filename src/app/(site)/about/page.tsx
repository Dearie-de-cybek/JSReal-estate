import type { Metadata } from "next";
import { PageHero, ClosingCta } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ImageReveal, Reveal } from "@/components/motion";
import { IMG, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Jorbe Samuel is a Nigerian real estate consultant helping people make informed property decisions.",
  alternates: { canonical: "/about" },
};

export default function About() {
  const s = SITE;
  const values = s.values;
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A consultant who would rather you <em>wait</em> than regret.</>}
        lede="Jorbe Samuel is a real estate consultant in Nigeria. His work is to help individuals, families, first-time buyers, investors and Nigerians in the diaspora decide well, before any money moves."
      />

      <section className="container-x grid gap-16 pb-28 lg:grid-cols-12" aria-labelledby="intro">
        <div className="lg:col-span-5">
          <ImageReveal className="aspect-[4/5] lg:sticky lg:top-28">
            <Photo src={IMG.consultant} alt="A considered interior" className="h-full w-full" priority sizes="(min-width:1024px) 40vw, 100vw" />
          </ImageReveal>
        </div>
        <div className="space-y-24 lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">01</span> Introduction</p>
            <h2 id="intro" className="display h-md mt-5">Property, wealth, and the decisions between them.</h2>
            <p className="mt-6 text-lg">
              Most people meet real estate at the moment they are asked to pay for it. By then the pressure is high and
              the information is thin. I work earlier in the process: clarifying purpose, testing assumptions and
              building a checklist that fits the property in front of you.
            </p>
          </Reveal>

          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">02</span> Personal story</p>
            <h2 className="display h-md mt-5">How I came to this work.</h2>
            <p className="mt-6 whitespace-pre-line text-lg">{s.story}</p>
          </Reveal>

          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">03</span> Professional philosophy</p>
            <h2 className="display h-md mt-5">Trust before transactions.</h2>
            <p className="mt-6 text-lg">
              Knowledge before commitment. Smart decisions before property acquisition. A good adviser earns the right
              to sell something by first making you better informed, even when being better informed means you walk away.
            </p>
          </Reveal>

          <Reveal>
            <p className="eyebrow flex gap-4"><span className="num">04</span> Values</p>
            <ul className="mt-6">
              {values.map((v, i) => (
                <li key={v} className="flex items-baseline gap-6 border-t border-[var(--line)] py-5 font-serif text-2xl last:border-b">
                  <span className="num !text-base">{String(i + 1).padStart(2, "0")}</span>{v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p id="approach" className="eyebrow flex scroll-mt-28 gap-4"><span className="num">05</span> Approach to consulting</p>
            <h2 className="display h-md mt-5">Questions, then documents, then property.</h2>
            <p className="mt-6 text-lg">{s.approach}</p>
            <ol className="mt-8 space-y-4 text-slate-ink">
              <li><strong className="text-ink">Listen.</strong> What is the money for, and what would a good outcome look like?</li>
              <li><strong className="text-ink">Test.</strong> Do the numbers, the timeline and the risk tolerance hold up?</li>
              <li><strong className="text-ink">Verify.</strong> Independent lawyer, independent surveyor, traceable payments.</li>
              <li><strong className="text-ink">Decide.</strong> Proceed, renegotiate or walk away, with eyes open.</li>
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-ink py-28 text-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow flex gap-4"><span className="num">06</span> Why it matters</p>
            <h2 className="display h-lg mt-6">Why informed property decisions matter.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg text-ivory/75 lg:col-span-6 lg:col-start-7">
            <p>
              For many families, property is the largest purchase of a lifetime. It can build security for generations,
              or lock up savings in a title that cannot be proved.
            </p>
            <p>
              The difference is rarely luck. It is usually whether the right questions were asked, in the right order,
              by someone with nothing to gain from you skipping them.
            </p>
          </Reveal>
        </div>
      </section>
      <ClosingCta title="Your next property decision deserves a conversation." />
    </>
  );
}
