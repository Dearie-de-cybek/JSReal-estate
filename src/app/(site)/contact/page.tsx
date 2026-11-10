import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/forms";
import { SITE, waLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a consultation or send an enquiry by WhatsApp, phone or email.",
  alternates: { canonical: "/contact" },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ type?: string; message?: string }> }) {
  const { type, message } = await searchParams;
  const s = SITE;
  const rows: [string, string, string | null][] = [
    ["WhatsApp", s.whatsapp ? `+${s.whatsapp.replace(/\D/g, "")}` : "", s.whatsapp ? waLink("Hello Jorbe, I'd like to discuss a property decision.") : null],
    ["Telephone", s.phone, s.phone ? `tel:${s.phone.replace(/\s/g, "")}` : null],
    ["Email", s.email, s.email ? `mailto:${s.email}` : null],
  ];
  const socials = [["Instagram", s.instagram], ["LinkedIn", s.linkedin], ["X", s.x], ["Facebook", s.facebook]].filter(([, u]) => u);

  return (
    <>
      <PageHero
        n="06"
        eyebrow="Contact"
        title={<>Let&apos;s start with <em>the right questions.</em></>}
        lede="Tell me where you are in the decision. I read every enquiry personally and reply with next steps, not a sales pitch."
      />
      <div className="container-x grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EnquiryForm defaultType={type} defaultMessage={message} />
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="label">Direct</h2>
          <ul className="border-t border-[var(--line)]">
            {rows.map(([k, v, h]) => (
              <li key={k} className="border-b border-[var(--line)] py-5">
                <p className="eyebrow">{k}</p>
                {v && h ? (
                  <a href={h} className="underline-hover mt-1 inline-block font-serif text-2xl" {...(k === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{v}</a>
                ) : (
                  <p className="mt-1 text-slate-ink">Coming soon.</p>
                )}
              </li>
            ))}
          </ul>
          {socials.length > 0 && (
            <>
              <h2 className="label mt-10">Elsewhere</h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socials.map(([n, u]) => (
                  <li key={n}><a href={u} target="_blank" rel="noopener noreferrer" className="underline-hover">{n}</a></li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-12 border-l-2 border-gold pl-4 text-sm text-slate-ink">
            A first conversation is an exchange of information. There is no obligation to proceed, and no payment is ever requested through this site.
          </p>
        </aside>
      </div>
    </>
  );
}
