import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/forms";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion";
import { IMG, SITE, SOCIALS, waLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation or reach Jorbe Samuel by WhatsApp, email or phone.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ type?: string; message?: string }> }) {
  const { type, message } = await searchParams;
  const s = SITE;
  const channels: { k: string; note: string; value: string; href: string | null; external?: boolean }[] = [
    { k: "WhatsApp", note: "Fastest for a first question", value: s.whatsapp ? `+${s.whatsapp.replace(/\D/g, "")}` : "", href: s.whatsapp ? waLink("Hello Jorbe, I'd like to discuss a property decision.") : null, external: true },
    { k: "Email", note: "For detail, documents and follow-up", value: s.email, href: s.email ? `mailto:${s.email}` : null },
    { k: "Telephone", note: s.hours || "Calls by appointment", value: s.phone, href: s.phone ? `tel:${s.phone.replace(/\s/g, "")}` : null },
  ];

  return (
    <>
      <PageHero
        n="06"
        eyebrow="Contact"
        title={<>Let&apos;s start with <em>the right questions.</em></>}
        lede="Tell me where you are in the decision. I read every enquiry personally and reply with next steps, not a sales pitch."
      />

      {/* Channels */}
      <section className="container-x pb-24" aria-label="Contact channels">
        <ul className="grid gap-px bg-[var(--line)] md:grid-cols-3">
          {channels.map((c) => (
            <li key={c.k} className="bg-ivory p-8 sm:p-10">
              <p className="eyebrow">{c.k}</p>
              {c.value && c.href ? (
                <a href={c.href} className="underline-hover mt-4 inline-block break-all font-serif text-2xl sm:text-3xl" {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.value}</a>
              ) : (
                <p className="mt-4 font-serif text-2xl text-slate-ink sm:text-3xl">Coming soon</p>
              )}
              <p className="mt-3 text-sm text-slate-ink">{c.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="label !mb-0">Follow</span>
          {SOCIALS.length > 0 ? (
            SOCIALS.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="underline-hover">{n}</a>)
          ) : (
            <span className="text-slate-ink">Social profiles coming soon.</span>
          )}
          {s.officeCity && <span className="text-slate-ink sm:ml-auto">{s.officeCity}</span>}
        </div>
      </section>

      {/* Consultation */}
      <section id="consultation" className="border-t border-[var(--line)] bg-stone/45 py-24 lg:py-32" aria-labelledby="consult-h">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow flex gap-4"><span className="num">01</span> Consultation</p>
            <h2 id="consult-h" className="display h-lg mt-5">A first conversation, <em>no obligation.</em></h2>
            <ol className="mt-10 space-y-6">
              {[
                ["Tell me where you are", "Buying, investing or buying from abroad. A few lines is plenty."],
                ["We talk it through", "About 30 minutes on WhatsApp, phone or video, at a time that suits you."],
                ["You leave with clarity", "Your options, the risks and the next step, in plain language."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="num !text-lg">{i + 1}</span>
                  <span><strong className="block">{t}</strong><span className="text-slate-ink">{d}</span></span>
                </li>
              ))}
            </ol>
            <Photo src={IMG.breakBridge} alt="Lagos from above" className="mt-12 hidden aspect-[4/3] w-full lg:block" sizes="33vw" />
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm defaultType={type ?? "consultation"} defaultMessage={message} />
            <p className="mt-10 border-l-2 border-gold pl-4 text-sm text-slate-ink">
              No payment is ever requested through this site, and a first conversation is an exchange of information only.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
