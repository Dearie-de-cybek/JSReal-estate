# Jorbe Samuel — Private Property Journal

Static marketing site. Next.js 16 · TypeScript · Tailwind 4 · Motion. **No backend, database, admin or API routes.**

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Everything editable lives in **`src/lib/content.ts`**.

## Contact (section 4)
Fill `SITE` (WhatsApp digits, email, phone, social URLs, office city, hours). Links, the footer, the contact page and every WhatsApp button light up automatically; blanks show "Coming soon". The consultation/enquiry form opens a pre-filled WhatsApp chat (or email draft). Nothing is stored.

## About (section 1)
Replace the `[Jorbe to add]` placeholders in `ABOUT.story` (chapters), `ABOUT.background` (timeline; delete the array items to hide it), and adjust `approach`, `steps`, `values`, `clients`. Add a real portrait as `public/images/consultant.jpg` (4:5 works best).

## Properties (section 2)
Each entry in `PROPERTIES` gets its own page at `/properties/<slug>` (gallery, overview, price, documentation status, disclaimers, WhatsApp + form enquiry).
1. Put photos in `public/images/properties/` and fill in the verified details.
2. Set `released: true` (the card un-blurs and links to its page; until then it is a blurred "Coming soon" teaser).
3. `priceVerified: true` shows the price; `documentation.status: "verified"` only after an independent lawyer confirms.
Add more entries by copying one; the filters and sitemap pick them up.

## Knowledge Room (section 3)
Add an entry to `ARTICLES` with a `body` (lightweight markdown: `##` headings build the table of contents, `-` lists, `1.` lists, `>` notes, `**bold**`) and `published: true`. Article pages include reading time, progress bar, TOC, prev/next and related reading. The three starter articles are editorial drafts for Jorbe to review. Downloadable guides: drop a PDF in `public/guides/` and set `file` on a `GUIDES` entry; empty = "Coming soon". FAQs live in `FAQS`.

## Images
Photos in `public/images/` are from Unsplash (free licence: https://unsplash.com/license). Swap in Jorbe's own photography using the same filenames.

## Optional env
`SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
