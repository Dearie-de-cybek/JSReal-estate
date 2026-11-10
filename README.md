# Jorbe Samuel — Private Property Journal

Static marketing site. Next.js 16 · TypeScript · Tailwind 4 · Motion. **No backend, database, admin or API routes.**

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy that was previously CMS-driven now lives in `src/lib/content.ts`:

- `SITE` — WhatsApp, phone, email, socials, story, approach, values. Blank values stay hidden / show "coming soon". The contact form opens a pre-filled WhatsApp chat (or an email draft if only email is set). Nothing is stored.
- `PROPERTIES` — dummy teasers. Cards show the photo blurred with a "Coming soon" overlay and link to `/coming-soon`.
- `ARTICLES` — dummy Journal entries; every one links to `/coming-soon`.
- Services live in `src/lib/services.ts`.

## Images

Real photography is in `public/images/` (sourced from Unsplash; review the licence terms at https://unsplash.com/license before commercial use, and swap in Jorbe's own photography when available — keep the same filenames and nothing else changes). The "consultant" slot currently shows an interior, not a person: drop Jorbe's real portrait in as `public/images/consultant.jpg`.

## Optional env

`SITE_URL` (canonical URLs/sitemap), `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Before launch

Fill `SITE`, replace the placeholder story, add a real portrait, and have the privacy policy reviewed.
