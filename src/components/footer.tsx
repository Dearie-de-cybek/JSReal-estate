import Link from "next/link";
import { Monogram } from "./brand";
import { NewsletterForm } from "./forms";
import { SITE } from "@/lib/content";

const links = [
  ["About", "/about"],
  ["Properties", "/properties"],
  ["Advisory", "/advisory"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

export function Footer() {
  const s = SITE;
  const socials = [
    ["Instagram", s.instagram],
    ["LinkedIn", s.linkedin],
    ["X", s.x],
    ["Facebook", s.facebook],
  ].filter(([, u]) => u);

  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-ivory">
      <div className="container-x pt-24 pb-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Monogram size={64} className="text-ivory" />
            <p className="display h-sm mt-8 max-w-sm">
              Trust before transactions. <em>Knowledge before commitment.</em>
            </p>
            <p className="eyebrow mt-6">Property • Wealth • Smart Decisions</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {links.map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="underline-hover text-[0.95rem]">{l}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-[0.95rem]">
              {s.email ? <li><a className="underline-hover" href={`mailto:${s.email}`}>{s.email}</a></li> : null}
              {s.phone ? <li><a className="underline-hover" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></li> : null}
              {s.officeCity ? <li className="opacity-75">{s.officeCity}</li> : null}
              {!s.email && !s.phone && <li className="opacity-60">Contact details coming soon.</li>}
              {socials.map(([n, u]) => (
                <li key={n}>
                  <a className="underline-hover" href={u} target="_blank" rel="noopener noreferrer">{n}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5">The Property Letter</p>
            <p className="mb-5 text-[0.95rem] opacity-75">Coming soon. Join the waiting list for new articles and guides.</p>
            <NewsletterForm />
          </div>
        </div>

        <hr className="rule mt-20" />
        <div className="mt-6 flex flex-col gap-3 text-[0.8rem] opacity-65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Jorbe Samuel. All rights reserved.</p>
          <p>
            Property information is provided for guidance and is not legal or financial advice.{" "}
            <Link href="/privacy" className="underline">Privacy policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
