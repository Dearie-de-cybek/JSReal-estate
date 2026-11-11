import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PropertyBrowser } from "@/components/property-browser";
import { PROPERTIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Properties",
  description: "A curated collection of verified property opportunities.",
  alternates: { canonical: "/properties" },
};

export default function Properties() {
  return (
    <>
      <PageHero
        n="03"
        eyebrow="Properties"
        title={<>A curated collection, <em>not a marketplace.</em></>}
        lede="Each property is released only once its details and documentation status have been confirmed. The first opportunities are being prepared."
      />
      <div className="container-x pb-32">
        <PropertyBrowser properties={PROPERTIES} />
      </div>
    </>
  );
}
