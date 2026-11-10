import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { AvailabilityBadge, priceLabel } from "@/components/cards";
import { EnquiryForm } from "@/components/forms";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { featuresOf, propertyBySlug } from "@/lib/queries";
import { getSession } from "@/lib/auth";
import { getSettings, waLink } from "@/lib/settings";
import { DOC_STATUS, PURPOSE, formatDate, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await propertyBySlug(slug);
  if (!p) return { title: "Property not found" };
  const desc = p.summary || `${p.propertyType} in ${p.city}, ${p.state}.`;
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: { title: p.name, description: desc, images: p.images[0] ? [p.images[0].url] : undefined },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const session = await getSession();
  const p = await propertyBySlug(slug, !!session);
  if (!p) notFound();
  const s = await getSettings();
  const feats = featuresOf(p);
  const loc = [p.address, p.city, p.state].filter(Boolean).join(", ");
  const url = `${siteUrl()}/properties/${p.slug}`;
  const wa = waLink(s, `Hello Jorbe, I'm interested in "${p.name}"${p.city ? ` (${p.city})` : ""}. ${url}\nCould we talk through the details and documentation?`);

  const facts: [string, string][] = [
    ["Type", p.propertyType],
    ["Category", p.category?.name ?? ""],
    ["Purpose", PURPOSE[p.purpose] ?? ""],
    ["Bedrooms", p.bedrooms ? String(p.bedrooms) : ""],
    ["Bathrooms", p.bathrooms ? String(p.bathrooms) : ""],
    ["Size", p.sizeSqm ? `${p.sizeSqm.toLocaleString()} m²` : ""],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: p.name,
          url,
          description: p.summary || p.description.slice(0, 300),
          image: p.images.map((i) => `${siteUrl()}${i.url}`),
          datePosted: p.createdAt.toISOString(),
          about: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: p.state, addressCountry: "NG" } },
          ...(p.price != null && p.priceVerified
            ? { offers: { "@type": "Offer", price: p.price, priceCurrency: "NGN", availability: p.availability === "AVAILABLE" ? "https://schema.org/InStock" : "https://schema.org/SoldOut" } }
            : {}),
        }}
      />
      <div className="container-x pt-28 lg:pt-32">
        {!p.published && (
          <p className="mb-6 border border-gold bg-gold/15 px-4 py-3 text-sm">Draft preview — visible only to signed-in editors.</p>
        )}
        <nav aria-label="Breadcrumb" className="eyebrow">
          <Link href="/properties" className="underline-hover">Properties</Link> <span aria-hidden>/</span> {p.name}
        </nav>

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <AvailabilityBadge value={p.availability} className="!bg-ink !text-ivory" />
            <h1 className="display h-xl mt-5 !text-[clamp(2.4rem,5.5vw,5rem)]">{p.name}</h1>
            <p className="mt-4 text-lg text-slate-ink">{loc || "Location on request"}</p>
          </div>
          <p className="font-serif text-4xl">{priceLabel(p)}</p>
        </div>
      </div>

      <div className="container-x mt-10 grid gap-14 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Gallery images={p.images.map((i) => ({ url: i.url, alt: i.alt }))} name={p.name} />

          <Reveal className="mt-16">
            <h2 className="label">Overview</h2>
            {p.summary && <p className="display h-sm max-w-2xl !font-normal">{p.summary}</p>}
            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-3">
                {facts.map(([k, v]) => (
                  <div key={k} className="bg-ivory p-4">
                    <dt className="label !mb-1">{k}</dt>
                    <dd className="font-serif text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {p.description && <p className="mt-8 max-w-2xl whitespace-pre-line text-lg">{p.description}</p>}
          </Reveal>

          {feats.length > 0 && (
            <Reveal className="mt-14">
              <h2 className="label">Features</h2>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {feats.map((f) => (
                  <li key={f} className="flex gap-4 border-t border-[var(--line)] py-3"><span className="num !text-sm">—</span>{f}</li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal className="mt-14">
            <h2 className="label">Documentation</h2>
            <div className="border border-[var(--line)] p-6">
              <p className="font-serif text-2xl">{DOC_STATUS[p.documentationStatus] ?? DOC_STATUS.UNVERIFIED}</p>
              {p.documentationStatus === "VERIFIED" && p.documentationVerifiedOn && (
                <p className="mt-1 text-sm text-slate-ink">Confirmed {formatDate(p.documentationVerifiedOn)}</p>
              )}
              {p.documentationNotes && <p className="mt-4 whitespace-pre-line">{p.documentationNotes}</p>}
              {p.documentationStatus !== "VERIFIED" && (
                <p className="mt-4 text-sm text-slate-ink">
                  Do not treat any document described here as verified until your own lawyer has examined the originals.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="label">Important notes</h2>
            <ul className="space-y-3 text-sm text-slate-ink">
              <li>Information is supplied in good faith and may change. Availability and price should be confirmed before any commitment.</li>
              <li>Nothing here is legal or financial advice. Engage an independent lawyer and surveyor before paying for any property.</li>
              <li>Pay only through traceable channels against written agreements and official receipts.</li>
            </ul>
          </Reveal>
        </div>

        <aside className="lg:col-span-4" aria-label="Enquire about this property">
          <div className="border border-[var(--line)] bg-paper/60 p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="display h-sm">Enquire about this property</h2>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6 w-full justify-center">
              WhatsApp enquiry
            </a>
            <p className="eyebrow my-6 text-center">or send a message</p>
            <EnquiryForm
              compact
              propertyId={p.id}
              propertyName={p.name}
              defaultType="A specific property"
              defaultMessage={`I'd like to know more about ${p.name}. `}
              whatsapp={s.whatsapp}
            />
          </div>
        </aside>
      </div>
    </>
  );
}
