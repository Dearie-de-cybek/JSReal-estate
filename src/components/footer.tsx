import Link from "next/link";
import { Monogram } from "./brand";
import { NewsletterForm } from "./forms";
import { SITE, SOCIALS } from "@/lib/content";

const links = [
  ["About", "/about"],
  ["Properties", "/properties"],
  ["Advisory", "/advisory"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

export function Footer() {
  const s = SITE;
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="container-x pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Monogram size={64} className="text-ivory" />
            <p className="display h-sm mt-8 max-w-sm">Trust before transactions. <em>Knowledge before commitment.</em></p>
            <p className="eyebrow mt-6">Property • Wealth • Smart Decisions</p>
          </div>
          <div className="grid grid-cols-2 gap-10 lg:col-span-4">
            <nav aria-label="Footer">
              <p className="eyebrow mb-5">Explore</p>
              <ul className="space-y-3">
                {links.map(([l, h]) => <li key={h}><Link href={h} className="underline-hover text-[0.95rem]">{l}</Link></li>)}
              </ul>
            </nav>
            <div>
              <p className="eyebrow mb-5">Contact</p>
              <ul className="space-y-3 break-words text-[0.95rem]">
                {s.email && <li><a className="underline-hover" href={`mailto:${s.email}`}>{s.email}</a></li>}
                {s.phone && <li><a className="underline-hover" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></li>}
                {s.officeCity && <li className="opacity-75">{s.officeCity}</li>}
                {!s.email && !s.phone && <li className="opacity-60">Details coming soon.</li>}
                {SOCIALS.map(([n, u]) => <li key={n}><a className="underline-hover" href={u} target="_blank" rel="noopener noreferrer">{n}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">The Property Letter</p>
            <p className="mb-5 text-[0.95rem] opacity-75">Coming soon. Join the waiting list for new articles and guides.</p>
            <NewsletterForm />
          </div>
        </div>
        <hr className="rule mt-16 sm:mt-20" />
        <div className="mt-6 flex flex-col gap-3 text-[0.8rem] opacity-65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Jorbe Samuel. All rights reserved.</p>
          <p>Property information is guidance, not legal or financial advice. <Link href="/privacy" className="underline">Privacy policy</Link></p>
        </div>
      </div>
    </footer>
  );
}
