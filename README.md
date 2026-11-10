# Jorbe Samuel — Private Property Journal

Premium real-estate advisory platform: public editorial site + a practical admin CMS.
Next.js 16 · TypeScript · Tailwind 4 · Motion · Prisma 7 (libSQL/SQLite) · Zod · jose + bcrypt.

## Run it

```bash
npm install
cp .env.example .env        # then set AUTH_SECRET (openssl rand -base64 32), SITE_URL, ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars)
npm run db:push             # create tables
npm run db:seed             # admin user, categories, starter articles, FAQs
npm run dev                 # http://localhost:3000   · admin: /admin
```

Change the admin password immediately (Admin → My password). `npm run db:demo` adds three clearly-labelled SAMPLE properties for design review; `npx tsx prisma/demo.ts --remove` deletes them. Never run it on a live site.

## What the owner manages (no developer needed) — `/admin`

| Area | Does |
|---|---|
| Properties | create/edit, inline price + availability updates, multi-image upload with reorder/alt text, documentation status, draft/publish, feature on homepage |
| Articles | Markdown editor, categories, cover image, draft/publish, featured |
| Downloads | upload PDF guides/checklists (download counts) |
| FAQs | add/edit/hide/reorder (also emitted as FAQ structured data) |
| Enquiries | inbox, status, private notes, one-click email/WhatsApp |
| Profile & contact | hero + portrait photos, WhatsApp/phone/email/socials, story, approach, values |
| Users | Admin and Editor roles (Editors cannot change profile/users or delete enquiries) |

## Honesty rules built into the product

- Properties are **only** from the database; nothing is hard-coded. No properties = a graceful empty state.
- A price is shown only if “price verified” is ticked; otherwise “Price on request”.
- Documentation reads “not yet independently verified” unless an admin sets **Verified** (the verified date is then shown).
- No testimonials, stats, credentials or awards exist anywhere. Placeholder copy is labelled (`[Placeholder …]` in the story).
- Hero/portrait/section art is a clearly-marked illustrated stand-in until real photography is uploaded in **Profile & contact**.

## Security

httpOnly signed session cookie (7d), bcrypt (cost 12), login rate-limit, server-side role checks in every action and layout, same-origin checks on public POST routes, Zod validation, honeypot + time-trap + per-IP rate limits on forms, upload allow-list with magic-byte sniffing and size caps, markdown HTML escaping, JSON-LD escaping, security headers. The in-memory rate limiter is per-instance — use Redis/Upstash if you scale horizontally.

## Integrations (all optional, via `.env`)

`NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` analytics · `RESEND_API_KEY` + `NOTIFY_EMAIL` enquiry emails · `DATABASE_URL` + `DATABASE_AUTH_TOKEN` for Turso (hosted libSQL) · newsletter subscribers are stored in the DB (export from the DB or connect a provider later).

## Deploying

- **VPS / Railway / Fly with a volume (simplest):** `npm run build && npm start`. Keep `dev.db` and `public/uploads/` on persistent storage and back them up.
- **Vercel/serverless:** point `DATABASE_URL` at Turso, and replace the local-disk write in `src/app/api/admin/upload/route.ts` with an object store (Cloudinary/S3/R2); add the host to `images.remotePatterns` in `next.config.ts`.
- Set `SITE_URL` to the real domain (sitemap, canonical URLs, structured data).

## To do before launch

Replace placeholder story/contact details, upload hero + portrait photography, review/replace the starter articles (general education, not legal advice) and the privacy policy with a lawyer, set a strong `AUTH_SECRET`, and change the seeded admin password.
