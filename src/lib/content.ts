/**
 * Static site content — NO backend. Edit this file to update the site.
 * Anything marked [Jorbe to add] is a placeholder waiting for real information.
 */

/* ───────────────────────── Contact & identity ───────────────────────── */

export const SITE = {
  // Fill these in and every WhatsApp / email / phone / social link appears automatically.
  whatsapp: "", // international digits only, e.g. "2348012345678"
  phone: "", // e.g. "+234 801 234 5678"
  email: "", // professional email, e.g. "hello@yourdomain.com"
  instagram: "", // full https:// profile URLs
  linkedin: "",
  x: "",
  facebook: "",
  youtube: "",
  officeCity: "", // e.g. "Lagos, Nigeria"
  hours: "", // e.g. "Mon–Sat, 9am–6pm WAT"
};

export const waLink = (text: string) => {
  const n = SITE.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : "/coming-soon?from=whatsapp";
};

export const SOCIALS: [string, string][] = (
  [
    ["Instagram", SITE.instagram],
    ["LinkedIn", SITE.linkedin],
    ["X", SITE.x],
    ["Facebook", SITE.facebook],
    ["YouTube", SITE.youtube],
  ] as [string, string][]
).filter(([, u]) => u);

/* ───────────────────────── About / consultant ───────────────────────── */

export const ABOUT = {
  // Your story, told in chapters. Replace each body with your own words.
  story: [
    {
      title: "How it began",
      body: "[Jorbe to add — the moment or experience that first drew you to real estate. Keep it specific and true: where you were, what you saw, what you decided.]",
    },
    {
      title: "What I kept noticing",
      body: "[Jorbe to add — the problem you saw buyers facing (documents, trust, information gaps) that made you want to do this differently.]",
    },
    {
      title: "Where I am now",
      body: "[Jorbe to add — who you work with today and what a good outcome looks like for them.]",
    },
  ],
  // Background timeline. Only add what you can stand behind (roles, years, training). Leave empty to hide.
  background: [
    { when: "[Year]", what: "[Jorbe to add — a role, training or milestone]" },
    { when: "[Year]", what: "[Jorbe to add — a role, training or milestone]" },
    { when: "[Year]", what: "[Jorbe to add — a role, training or milestone]" },
  ] as { when: string; what: string }[],
  approach:
    "I start with questions, not listings. What is the money for? How long can it stay invested? What would make this decision a bad one? Only then do we look at property.",
  steps: [
    ["Listen", "What is the money for, and what would a good outcome look like?"],
    ["Test", "Do the numbers, the timeline and your appetite for risk actually hold up?"],
    ["Verify", "Independent lawyer, independent surveyor, traceable payments."],
    ["Decide", "Proceed, renegotiate or walk away, with your eyes open."],
  ] as [string, string][],
  values: [
    ["Transparency over persuasion", "If I can't show it, I won't claim it."],
    ["Documents before deposits", "Nothing is paid until the paperwork has been independently checked."],
    ["Long-term value over quick wins", "Property is held for years. Decisions should be made for years."],
    ["Honest answers", "Including “not this one” and “not yet”."],
  ] as [string, string][],
  clients: [
    "First-time buyers who want to avoid costly mistakes",
    "Families making the largest purchase of their lives",
    "Investors weighing yield against risk and liquidity",
    "Nigerians abroad buying at a distance",
  ],
};

/* ───────────────────────── Imagery ───────────────────────── */

export const IMG = {
  hero: "/images/dusk-villa.jpg",
  philosophy: "/images/dusk-white.jpg",
  breakLagos: "/images/lagos-towers.jpg",
  breakBridge: "/images/lagos-bridge.jpg",
  breakNight: "/images/night-glass.jpg",
  skyline: "/images/lagos-skyline.jpg",
  consultant: "/images/interior-a.jpg",
  architect: "/images/architect.jpg",
  family: "/images/family.jpg",
  cta: "/images/night-glass.jpg",
};

export const SERVICE_IMG: Record<string, string> = {
  "property-advisory": "/images/svc-advisory.jpg",
  "investment-guidance": "/images/svc-investment.jpg",
  "property-search-assistance": "/images/svc-acquisition.jpg",
  "diaspora-property-guidance": "/images/lagos-bridge.jpg",
};

/* ───────────────────────── Properties ───────────────────────── */

export type Availability = "available" | "reserved" | "sold" | "coming-soon";
export type DocStatus = "unverified" | "in-review" | "verified";

export type Property = {
  slug: string;
  n: string;
  name: string;
  /** false = dummy teaser (card blurred, links to /coming-soon). true = full detail page goes live. */
  released: boolean;
  city: string;
  state: string;
  type: string; // Detached duplex, Apartment, Residential land …
  category: "Residential" | "Land" | "Commercial" | "Off-plan";
  purpose: "Residential" | "Investment";
  price?: number; // Naira
  priceVerified: boolean; // price shows only when true
  priceNote?: string; // e.g. "per plot", "negotiable"
  availability: Availability;
  summary: string;
  description: string;
  features: string[];
  specs: { bedrooms?: number; bathrooms?: number; sizeSqm?: number };
  documentation: { status: DocStatus; notes: string; verifiedOn?: string };
  images: { src: string; alt: string }[];
};

const PENDING = {
  summary: "Details to be confirmed on release.",
  description: "This opportunity is being verified. Full details, documentation status and pricing will appear here once confirmed.",
  features: [] as string[],
  specs: {},
  documentation: { status: "unverified" as DocStatus, notes: "Documentation has not yet been independently verified." },
  priceVerified: false,
  availability: "coming-soon" as Availability,
  released: false,
  city: "",
  state: "",
};

/**
 * HOW TO PUBLISH A PROPERTY
 * 1. Fill in the real, verified details below and add photos to /public/images/properties/.
 * 2. Set `released: true`, `availability`, and `priceVerified: true` only when the price is confirmed.
 * 3. Set `documentation.status` to "verified" ONLY after an independent lawyer has confirmed the documents.
 * The card un-blurs and its own detail page (with gallery and enquiry options) goes live automatically.
 */
export const PROPERTIES: Property[] = [
  { ...PENDING, slug: "opportunity-01", n: "01", name: "Opportunity 01", type: "Residential", category: "Residential", purpose: "Residential", images: [{ src: "/images/dusk-white.jpg", alt: "Property preview" }] },
  { ...PENDING, slug: "opportunity-02", n: "02", name: "Opportunity 02", type: "Residential", category: "Residential", purpose: "Residential", images: [{ src: "/images/prop-2.jpg", alt: "Property preview" }] },
  { ...PENDING, slug: "opportunity-03", n: "03", name: "Opportunity 03", type: "Investment", category: "Off-plan", purpose: "Investment", images: [{ src: "/images/prop-3.jpg", alt: "Property preview" }] },
  { ...PENDING, slug: "opportunity-04", n: "04", name: "Opportunity 04", type: "Residential", category: "Residential", purpose: "Residential", images: [{ src: "/images/prop-4.jpg", alt: "Property preview" }] },
  { ...PENDING, slug: "opportunity-05", n: "05", name: "Opportunity 05", type: "Investment", category: "Commercial", purpose: "Investment", images: [{ src: "/images/prop-5.jpg", alt: "Property preview" }] },
  { ...PENDING, slug: "opportunity-06", n: "06", name: "Opportunity 06", type: "Residential", category: "Residential", purpose: "Residential", images: [{ src: "/images/prop-6.jpg", alt: "Property preview" }] },
];

export const propertyHref = (p: Property) => (p.released ? `/properties/${p.slug}` : "/coming-soon?from=properties");

/* ───────────────────────── Knowledge Room ───────────────────────── */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  author: string;
  /** ISO date. Shown on published articles. */
  date: string;
  /** false = listed as "coming soon" and links to /coming-soon. */
  published: boolean;
  featured?: boolean;
  /** Lightweight markdown: ## heading, ### sub, - list, 1. list, > note, **bold**, *italic*, blank line = paragraph */
  body?: string;
};

const NOTE = `\n\n> General education, not legal or financial advice. Requirements differ between states and change over time, so confirm specifics with a qualified Nigerian property lawyer before you pay for anything.`;

/**
 * HOW TO PUBLISH AN ARTICLE
 * Add an entry (or fill in `body` and set `published: true` on an existing one). That's it.
 * Starter articles below are editorial drafts for Jorbe to review and edit in his own voice.
 */
export const ARTICLES: Article[] = [
  {
    slug: "buying-your-first-property-in-nigeria",
    title: "Buying your first property in Nigeria: a calm, step-by-step guide",
    excerpt: "Before you look at a single listing, five questions decide whether a purchase will serve you or strain you.",
    category: "First-time buyers",
    image: "/images/dusk-white.jpg",
    imageAlt: "Modern home at dusk with an illuminated pathway",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: true,
    featured: true,
    body: `Most first-time buyers begin with listings. The better place to begin is with a conversation about your own finances.

## Start with the purpose, not the property

Are you buying to live in, to rent out, or to hold for appreciation? Each purpose points to a different location, a different type of property and a different tolerance for risk. A home you will live in can afford to be less liquid. An investment must be easy to rent or resell.

## Know your real budget

The listed price is never the full cost. Plan for legal fees, survey and documentation costs, agency fees where they apply, stamp duties and registration charges, and the cost of making the property liveable. Keep a buffer; surprises are normal.

## The five questions

1. What is the money for, and when will I need it back?
2. Can I afford this without borrowing at a rate that makes the numbers fail?
3. Who is the seller, and can they prove they own what they are selling?
4. What documents exist, and has an independent lawyer examined them?
5. What happens if I need to sell in five years?

## Work in this order

First settle your budget and purpose. Then shortlist areas. Then inspect in person, at different times of day, and speak to neighbours about water, power, flooding and access roads. Only after that should you negotiate, and only after verification should you pay.

## Pay only through traceable channels

Pay into a verifiable company or lawyer's account against a written agreement and an official receipt. Be cautious about any request to pay cash to an individual, or any pressure to “pay today before someone else does”.${NOTE}`,
  },
  {
    slug: "understanding-land-titles-and-property-documentation",
    title: "Understanding land titles and property documentation",
    excerpt: "A receipt is not a title. Here is how to read the documents you will be shown, and what each one can and cannot prove.",
    category: "Land & documentation",
    image: "/images/lagos-skyline.jpg",
    imageAlt: "Lagos rooftops stretching to the skyline",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: true,
    body: `In Nigeria, land is governed principally by the Land Use Act. Under it, land in each state is vested in the Governor, who holds it for the benefit of the people. What you buy, in most cases, is a right to occupy, and the paper that evidences that right matters enormously.

## Documents you will hear about

**Certificate of Occupancy (C of O).** A statutory right of occupancy granted by the state government. It is widely regarded as one of the strongest forms of evidence of title, but it still needs to be checked at the relevant land registry.

**Governor's Consent.** When a statutory right of occupancy is transferred, the Governor's consent is generally required. A transfer without it can be open to challenge.

**Deed of Assignment.** The agreement by which the seller transfers their interest to you. It is only as good as the seller's title behind it.

**Survey plan.** A drawing prepared by a licensed surveyor showing the exact boundaries and coordinates. It should be verified, not just collected.

**Receipts and agreements.** A payment receipt proves a payment. It does not prove that the seller owned the land.

**Power of Attorney.** An authority to act for someone. It is not itself a title.

## Why the chain matters

A good title has an unbroken chain from the original grant to the person selling to you. Gaps in that chain are where disputes begin.

## Registration

After purchase, documents are typically registered at the state land registry so your interest is on record. Costs, timelines and procedures vary by state.${NOTE}`,
  },
  {
    slug: "due-diligence-before-purchasing-land",
    title: "Due diligence before purchasing land: what to check and in what order",
    excerpt: "Due diligence is not paperwork for its own sake. It is the cheapest insurance you will ever buy.",
    category: "Land & documentation",
    image: "/images/architect.jpg",
    imageAlt: "Hands drafting a plan with a pencil and ruler",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: true,
    body: `Land is the most commonly mis-sold form of property because it is easy to show and hard to verify. A disciplined process protects you.

## 1. Identify the seller

Is the seller an individual, a family, a company or an estate developer? Ask for identification and proof of authority to sell. For family land, ask who the principal members are and whether they have all agreed.

## 2. Search the title

Have your lawyer conduct a search at the appropriate land registry to confirm who the registered holder is and whether there are any encumbrances such as mortgages or caveats.

## 3. Verify the survey

Ask a licensed surveyor to confirm the survey plan and check that the plot on paper is the plot on the ground.

## 4. Check for government acquisition

Some land falls within areas the government has acquired or reserved. Ask your lawyer to make the relevant enquiries so you do not buy land that is subject to acquisition or setback restrictions.

## 5. Check for litigation

A search at the relevant courts can reveal pending cases over the land.

## 6. Inspect the land in person

Visit, walk the boundaries, and speak to neighbours and nearby residents. Note drainage, flooding signs, access roads and any current occupants.

## 7. Agree terms in writing

Ensure the agreement states the price, payment schedule, what is being delivered and when. Pay through traceable channels and keep every receipt.

## Warning signs

A seller who resists independent verification, insists on cash, hurries you, or offers a price far below the area's norm deserves extra scrutiny.${NOTE}`,
  },
  {
    slug: "understanding-property-investment-risks",
    title: "Understanding property investment risks before you commit capital",
    excerpt: "Property is often described as safe. It is better described as slow, illiquid and sensitive to detail.",
    category: "Investment",
    image: "/images/svc-investment.jpg",
    imageAlt: "Glass towers rising against the sky",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: false,
  },
  {
    slug: "buying-property-in-nigeria-from-abroad",
    title: "Buying property in Nigeria from abroad: protecting yourself at a distance",
    excerpt: "Distance changes the risks. The answer is not to avoid buying, but to build verification into every step.",
    category: "Diaspora",
    image: "/images/lagos-bridge.jpg",
    imageAlt: "Aerial view of the Lekki–Ikoyi link bridge in Lagos",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: false,
  },
  {
    slug: "understanding-property-location-and-value",
    title: "Understanding property location and value",
    excerpt: "Access, services, neighbours, direction of growth and the ease of selling later.",
    category: "Location & value",
    image: "/images/lagos-towers.jpg",
    imageAlt: "Civic Towers and Lekki, Lagos",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: false,
  },
  {
    slug: "common-mistakes-first-time-property-buyers-make",
    title: "Common mistakes first-time property buyers make",
    excerpt: "Most costly mistakes are predictable. Seven patterns, and how to avoid each.",
    category: "First-time buyers",
    image: "/images/interior-b.jpg",
    imageAlt: "A quiet, minimal living room",
    author: "Jorbe Samuel",
    date: "2026-11-11",
    published: false,
  },
];

export const articleHref = (a: Article) => (a.published ? `/journal/${a.slug}` : "/coming-soon?from=journal");

/* ───────────────────────── Guides (downloads) ───────────────────────── */

export type Guide = {
  title: string;
  description: string;
  /** Put the PDF in /public/guides/ and set e.g. "/guides/first-home-checklist.pdf". Leave empty = coming soon. */
  file: string;
  pages?: string;
};

export const GUIDES: Guide[] = [
  { title: "The First-Time Buyer's Checklist", description: "Every question to answer before you pay a deposit, in the order to ask them.", file: "" },
  { title: "Land Documentation Explained", description: "A plain-language guide to C of O, Governor's Consent, Deed of Assignment and survey plans.", file: "" },
  { title: "The Diaspora Buyer's Playbook", description: "How to verify, inspect and pay safely when you are buying from abroad.", file: "" },
];

/* ───────────────────────── FAQ ───────────────────────── */

export const FAQS: { q: string; a: string }[] = [
  { q: "What does a first consultation involve?", a: "A conversation about your goals, budget, timeline and concerns. There is no obligation to proceed, and you leave with a clearer view of your options." },
  { q: "Do you only work with large budgets?", a: "No. First-time buyers and smaller budgets are welcome. The aim is to make the right decision at whatever scale you are working." },
  { q: "Can you guarantee a property's title is clean?", a: "No consultant can guarantee that. What I can do is guide you through the checks and recommend that an independent lawyer and surveyor verify the documents before you pay." },
  { q: "Is a payment receipt enough proof of ownership?", a: "No. A receipt evidences a payment, not the seller's title. Always ask for the underlying title documents and have them verified." },
  { q: "Can I buy without travelling to Nigeria?", a: "It is possible, but it raises risk. The process relies on independent verification, a trusted representative, traceable payments and careful legal documentation." },
  { q: "How do I avoid sending money to the wrong person?", a: "Pay only after verification, into verifiable company or law-firm accounts, against a written agreement, and keep all records." },
];
