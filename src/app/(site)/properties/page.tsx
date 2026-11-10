import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PropertyCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { PROPERTIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Properties",
  description: "A curated collection of verified property opportunities, coming soon.",
  alternates: { canonical: "/properties" },
};

export default function Properties() {
  return (
    <>
      <PageHero
        n="03"
        eyebrow="Properties"
        title={<>A curated collection, <em>not a marketplace.</em></>}
        lede="Each property will be released only once its details and documentation status have been confirmed. The first opportunities are being prepared."
      />
      <div className="container-x pb-32">
        <div className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 0.07} className={i % 3 === 1 ? "lg:mt-16" : ""}>
              <PropertyCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
