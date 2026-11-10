import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { PropertyFilters } from "@/components/property-filters";
import { EmptyState, PropertyCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { propertyFacets, searchProperties } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Properties",
  description: "A curated collection of property opportunities, each with its documentation status stated plainly.",
  alternates: { canonical: "/properties" },
};

export default async function Properties({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const [facets, list] = await Promise.all([
    propertyFacets(),
    searchProperties({
      q: sp.q?.trim(),
      city: sp.city,
      category: sp.category,
      type: sp.type,
      purpose: sp.purpose,
      availability: sp.availability,
      price: sp.price,
    }),
  ]);
  const filtered = Object.values(sp).some(Boolean);

  return (
    <>
      <PageHero
        n="03"
        eyebrow="Properties"
        title={<>A curated collection, <em>not a marketplace.</em></>}
        lede="Each property shown here has been supplied with details by Jorbe. Prices appear only when verified, and documentation status is always stated plainly."
      />
      <div className="container-x pb-32">
        <Suspense>
          <PropertyFilters facets={facets} />
        </Suspense>

        <p className="eyebrow mt-8" aria-live="polite">
          {list.length} {list.length === 1 ? "property" : "properties"}
        </p>

        <div className="mt-10">
          {list.length === 0 ? (
            <EmptyState
              title={filtered ? "Nothing matches those filters." : "No properties are published yet."}
              body={
                filtered
                  ? "Try widening the search, or tell me what you are looking for and I will search with you."
                  : "Opportunities are listed only after their details have been confirmed. Tell me what you need and I will look with you."
              }
            >
              <Link href="/contact?type=Property%20search%20assistance" className="btn btn-line">Request a property search</Link>
            </EmptyState>
          ) : (
            <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.07} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                  <PropertyCard p={p} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
