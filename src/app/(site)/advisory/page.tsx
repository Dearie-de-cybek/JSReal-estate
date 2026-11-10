import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, ClosingCta } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { SERVICE_IMG } from "@/lib/content";
import { Reveal, ImageReveal } from "@/components/motion";
import { Arrow } from "@/components/brand";
import { SERVICES } from "@/lib/services";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Advisory",
  description: "Property advisory, investment guidance, acquisition assistance and diaspora property guidance.",
  alternates: { canonical: "/advisory" },
};

export default function Advisory() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.long },
          })),
        }}
      />
      <PageHero
        n="02"
        eyebrow="Advisory"
        title={<>Four services. <em>One discipline.</em></>}
        lede="Each engagement begins with your purpose and ends with a decision you can defend. Here is how each works, what to expect, and how to begin."
      />
      <div className="container-x space-y-32 pb-32">
        {SERVICES.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-28 grid gap-12 border-t border-[var(--line)] pt-16 lg:grid-cols-12" aria-labelledby={`${s.slug}-h`}>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
              <ImageReveal className="aspect-[4/5]">
                <Photo src={SERVICE_IMG[s.slug]} alt={s.title} className="h-full w-full" sizes="(min-width:1024px) 40vw, 100vw" />
              </ImageReveal>
            </div>
            <Reveal className={`lg:col-span-6 ${i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7"}`}>
              <p className="num">{s.n}</p>
              <h2 id={`${s.slug}-h`} className="display h-lg mt-3">{s.title}</h2>
              <p className="lede mt-6">{s.long}</p>

              <h3 className="label mt-10">What you can expect</h3>
              <ul className="space-y-3">
                {s.expect.map((e) => (
                  <li key={e} className="flex gap-4"><span className="mt-[0.85em] h-px w-5 shrink-0 bg-gold-ink" />{e}</li>
                ))}
              </ul>

              <h3 className="label mt-10">The process</h3>
              <ol className="grid gap-px bg-[var(--line)] sm:grid-cols-2">
                {s.steps.map((st, k) => (
                  <li key={st} className="bg-ivory p-4 text-sm">
                    <span className="num mr-2">{k + 1}</span>{st}
                  </li>
                ))}
              </ol>

              <Link href={`/contact?type=${encodeURIComponent(s.enquiry)}`} className="btn btn-solid mt-10">
                Begin with {s.title.toLowerCase()} <Arrow />
              </Link>
            </Reveal>
          </section>
        ))}
      </div>
      <ClosingCta title="Not sure which fits? Start with a conversation." />
    </>
  );
}
