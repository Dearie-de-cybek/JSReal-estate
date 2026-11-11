import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { Photo } from "@/components/photo";
import { priceLabel } from "@/components/cards";
import { EnquiryForm } from "@/components/forms";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { Arrow } from "@/components/brand";
import { PROPERTIES, waLink } from "@/lib/content";
import { formatDate, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

const AVAIL: Record<string, string> = { available: "Available", reserved: "Reserved", sold: "Sold", "coming-soon": "Coming soon" };
const DOC: Record<string, string> = {
  unverified: "Documentation not yet independently verified",
  "in-review": "Documentation under review",
  verified: "Documentation verified",
};

export const dynamicParams = false;
export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROPERTIES.find((x) => x.slug === slug);
  if (!p) return { title: "Property not found" };
  return {
    title: p.released ? p.name : "Coming soon",
    description: p.released ? p.summary : "This opportunity is being verified.",
    alternates: { canonical: `/properties/${p.slug}` },
    robots: p.released ? undefined : { index: false },
    openGraph: p.released ? { title: p.name, description: p.summary, images: [p.images[0].src] } : undefined,
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const p = PROPERTIES.find((x) => x.slug === slug);
  if (!p) notFound();

  const url = `${siteUrl()}/properties/${p.slug}`;
  const wa = waLink(`Hello Jorbe, I'm interested in "${p.name}"${p.city ? ` (${p.city})` : ""}. ${url}\nCould we talk through the details and documentation?`);

  /* ── Teaser (not yet released) ── */
  if (!p.released) {
    return (
      <section className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-ivory">
        <Photo src={p.images[0].src} alt="" className="absolute inset-0 -z-10 h-full w-full" imgClassName="scale-110 blur-2xl brightness-75" priority sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-ink/50" aria-hidden />
        <div className="container-x py-40">
          <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-gold" /> {p.n} · {p.type}</p>
          <h1 className="display h-xl mt-8">Coming <em>soon.</em></h1>
          <p className="lede mt-8">This opportunity is being verified. Photography, pricing and documentation status will appear here once they have been confirmed.</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-solid">Notify me on WhatsApp <Arrow /></a>
            <Link href="/properties" className="btn btn-line">All properties</Link>
          </div>
        </div>
      </section>
    );
  }

  /* ── Released: full detail page ── */
  const loc = [p.city, p.state].filter(Boolean).join(", ");
  const facts: [string, string][] = ([
    ["Type", p.type],
    ["Category", p.category],
    ["Purpose", p.purpose],
    ["Bedrooms", p.specs.bedrooms ? String(p.specs.bedrooms) : ""],
    ["Bathrooms", p.specs.bathrooms ? String(p.specs.bathrooms) : ""],
    ["Size", p.specs.sizeSqm ? `${p.specs.sizeSqm.toLocaleString()} m²` : ""],
  ] as [string, string][]).filter(([, v]) => v);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: p.name,
          url,
          description: p.summary,
          image: p.images.map((i) => `${siteUrl()}${i.src}`),
          about: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: p.state, addressCountry: "NG" } },
          ...(p.price != null && p.priceVerified
            ? { offers: { "@type": "Offer", price: p.price, priceCurrency: "NGN", availability: p.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut" } }
            : {}),
        }}
      />
      <div className="container-x pt-28 lg:pt-32">
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/properties" className="underline-hover">Properties</Link> <span aria-hidden>/</span> {p.name}
        </nav>
        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-block bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory">{AVAIL[p.availability]}</span>
            <h1 className="display mt-5 text-[clamp(2.4rem,6vw,5rem)]">{p.name}</h1>
            <p className="mt-4 text-lg text-slate-ink">{loc || "Location on request"}</p>
          </div>
          <p className="font-serif text-4xl">{priceLabel(p)}</p>
        </div>
      </div>

      <div className="container-x mt-10 grid gap-14 pb-28 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <Gallery images={p.images} name={p.name} />

          <Reveal className="mt-16">
            <h2 className="label">Overview</h2>
            <p className="display h-sm max-w-2xl">{p.summary}</p>
            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-ivory p-4"><dt className="label !mb-1">{k}</dt><dd className="font-serif text-xl">{v}</dd></div>
                ))}
              </dl>
            )}
            <p className="mt-8 max-w-2xl whitespace-pre-line text-lg">{p.description}</p>
          </Reveal>

          {p.features.length > 0 && (
            <Reveal className="mt-14">
              <h2 className="label">Features</h2>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {p.features.map((f) => <li key={f} className="flex gap-4 border-t border-[var(--line)] py-3"><span className="num !text-sm">—</span>{f}</li>)}
              </ul>
            </Reveal>
          )}

          <Reveal className="mt-14">
            <h2 className="label">Documentation</h2>
            <div className="border border-[var(--line)] p-6">
              <p className="font-serif text-2xl">{DOC[p.documentation.status]}</p>
              {p.documentation.status === "verified" && p.documentation.verifiedOn && (
                <p className="mt-1 text-sm text-slate-ink">Confirmed {formatDate(p.documentation.verifiedOn)}</p>
              )}
              {p.documentation.notes && <p className="mt-4 whitespace-pre-line">{p.documentation.notes}</p>}
              {p.documentation.status !== "verified" && (
                <p className="mt-4 text-sm text-slate-ink">Do not treat any document as verified until your own lawyer has examined the originals.</p>
              )}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="label">Important notes</h2>
            <ul className="space-y-3 text-sm text-slate-ink">
              <li>Information is supplied in good faith and may change. Confirm availability and price before any commitment.</li>
              <li>Nothing here is legal or financial advice. Engage an independent lawyer and surveyor before paying for any property.</li>
              <li>Pay only through traceable channels against written agreements and official receipts.</li>
            </ul>
          </Reveal>
        </div>

        <aside className="lg:col-span-4" aria-label="Enquire about this property">
          <div className="border border-[var(--line)] bg-paper/60 p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="display h-sm">Enquire about this property</h2>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6 w-full justify-center">WhatsApp enquiry</a>
            <p className="eyebrow my-6 text-center">or send a message</p>
            <EnquiryForm compact propertyName={p.name} />
          </div>
        </aside>
      </div>
    </>
  );
}
