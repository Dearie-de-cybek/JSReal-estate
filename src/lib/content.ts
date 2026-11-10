/**
 * Static site content. No backend: edit this file to update contact details and copy.
 * Properties and Journal entries below are intentionally dummy teasers that lead to /coming-soon.
 */

export const SITE = {
  // Fill these in when ready. Leave blank and the related links simply stay hidden.
  whatsapp: "", // international digits only, e.g. "2348012345678"
  phone: "",
  email: "",
  instagram: "",
  linkedin: "",
  x: "",
  facebook: "",
  officeCity: "",
  story:
    "[Placeholder — Jorbe, replace this with your own story: how you came into real estate, what you saw that others missed, and why you do this work.]",
  approach:
    "I start with questions, not listings. What is the money for? How long can it stay invested? What would make this decision a bad one? Only then do we look at property.",
  values: [
    "Transparency over persuasion.",
    "Documents before deposits.",
    "Long-term value over quick wins.",
    "Honest answers, including “not this one”.",
  ],
};

export const waLink = (text: string) => {
  const n = SITE.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : "/coming-soon?from=whatsapp";
};

export const IMG = {
  hero: "/images/hero.jpg",
  philosophy: "/images/philosophy.jpg",
  consultant: "/images/consultant.jpg",
  cta: "/images/journal-3.jpg",
};

export const SERVICE_IMG: Record<string, string> = {
  "property-advisory": "/images/svc-advisory.jpg",
  "investment-guidance": "/images/svc-investment.jpg",
  "property-search-assistance": "/images/svc-acquisition.jpg",
  "diaspora-property-guidance": "/images/svc-diaspora.jpg",
};

export type Teaser = { n: string; title: string; place: string; type: string; image: string };

/** Dummy property teasers. Details are withheld until real, verified listings are released. */
export const PROPERTIES: Teaser[] = [
  { n: "01", title: "Opportunity 01", place: "Location revealed on release", type: "Residential", image: "/images/prop-1.jpg" },
  { n: "02", title: "Opportunity 02", place: "Location revealed on release", type: "Residential", image: "/images/prop-2.jpg" },
  { n: "03", title: "Opportunity 03", place: "Location revealed on release", type: "Investment", image: "/images/prop-3.jpg" },
  { n: "04", title: "Opportunity 04", place: "Location revealed on release", type: "Residential", image: "/images/prop-4.jpg" },
  { n: "05", title: "Opportunity 05", place: "Location revealed on release", type: "Investment", image: "/images/prop-5.jpg" },
  { n: "06", title: "Opportunity 06", place: "Location revealed on release", type: "Residential", image: "/images/prop-6.jpg" },
];

export type Article = { title: string; excerpt: string; category: string; image: string };

/** Dummy journal entries. Full articles are coming soon. */
export const ARTICLES: Article[] = [
  { title: "Buying your first property in Nigeria", excerpt: "Before you look at a single listing, five questions decide whether a purchase will serve you or strain you.", category: "First-time buyers", image: "/images/journal-1.jpg" },
  { title: "Understanding land titles and property documentation", excerpt: "A receipt is not a title. How to read the documents you will be shown.", category: "Land & documentation", image: "/images/journal-2.jpg" },
  { title: "Due diligence before purchasing land", excerpt: "The cheapest insurance you will ever buy, and the order in which to do it.", category: "Land & documentation", image: "/images/journal-3.jpg" },
  { title: "Understanding property investment risks", excerpt: "Property is better described as slow, illiquid and sensitive to detail than as safe.", category: "Investment", image: "/images/journal-4.jpg" },
  { title: "Buying property from abroad", excerpt: "Distance changes the risks. Build verification into every step.", category: "Diaspora", image: "/images/journal-5.jpg" },
  { title: "Understanding property location and value", excerpt: "Access, services, neighbours, direction of growth and the ease of selling later.", category: "Location & value", image: "/images/journal-6.jpg" },
  { title: "Common mistakes first-time buyers make", excerpt: "Most costly mistakes are predictable. Seven patterns, and how to avoid each.", category: "First-time buyers", image: "/images/philosophy.jpg" },
];
