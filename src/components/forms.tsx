"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow } from "./brand";
import { SITE } from "@/lib/content";

export const CONSULTATION = "Book a consultation";
const ENQUIRY_TYPES = [
  CONSULTATION,
  "Property advisory",
  "Investment guidance",
  "Property search assistance",
  "Diaspora buyer guidance",
  "A specific property",
  "Something else",
];
const BUDGETS = ["Under ₦20m", "₦20m – ₦50m", "₦50m – ₦100m", "₦100m – ₦250m", "₦250m+", "Not sure yet"];

/** Dummy newsletter: nothing is stored or sent; it simply leads to the coming-soon page. */
export function NewsletterForm() {
  const router = useRouter();
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push("/coming-soon"); }}>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex items-end gap-3 border-b border-[var(--line-light)] focus-within:border-gold">
        <input id="nl-email" type="email" autoComplete="email" placeholder="Your email" className="w-full bg-transparent py-3 text-ivory outline-none placeholder:text-ivory/40" />
        <button type="submit" aria-label="Join the waiting list" className="pb-3 hover:text-gold"><Arrow /></button>
      </div>
    </form>
  );
}

/**
 * Static enquiry / consultation form (no backend). On submit it opens a pre-filled WhatsApp chat,
 * or an email draft; with neither configured it routes to the coming-soon page.
 */
export function EnquiryForm({ defaultType, defaultMessage, propertyName, compact }: { defaultType?: string; defaultMessage?: string; propertyName?: string; compact?: boolean }) {
  const router = useRouter();
  const initial =
    propertyName ? "A specific property" : defaultType === "consultation" ? CONSULTATION : ENQUIRY_TYPES.includes(defaultType ?? "") ? defaultType! : ENQUIRY_TYPES[0];
  const [type, setType] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const consult = type === CONSULTATION;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!f.name?.trim()) errs.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email ?? "")) errs.email = "Enter a valid email";
    if ((f.message ?? "").trim().length < 10) errs.message = "A few more words please (10+ characters)";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const text =
      `Hello Jorbe, I'm ${f.name}.\nEnquiry: ${f.type}${propertyName ? ` — ${propertyName}` : ""}` +
      (consult && f.when ? `\nPreferred time: ${f.when}` : "") +
      (consult && f.how ? `\nPreferred contact: ${f.how}` : "") +
      (f.location ? `\nLocation: ${f.location}` : "") +
      (f.budget ? `\nBudget: ${f.budget}` : "") +
      `\n\n${f.message}\n\nReply to: ${f.email}${f.phone ? ` / ${f.phone}` : ""}`;

    const wa = SITE.whatsapp.replace(/\D/g, "");
    if (wa) window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    else if (SITE.email) window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`${f.type}${propertyName ? ` — ${propertyName}` : ""}`)}&body=${encodeURIComponent(text)}`;
    else router.push("/coming-soon?from=whatsapp");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className={compact ? "grid gap-y-8" : "grid gap-x-10 gap-y-8 sm:grid-cols-2"}>
        <div className="field">
          <label htmlFor="e-name">Name</label>
          <input id="e-name" name="name" className="input" required autoComplete="name" aria-invalid={!!errors.name} />
          {errors.name && <p className="err">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="e-email">Email</label>
          <input id="e-email" name="email" type="email" className="input" required autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <p className="err">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="e-phone">Phone / WhatsApp</label>
          <input id="e-phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="e-type">I&apos;m enquiring about</label>
          <select id="e-type" name="type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        {consult && (
          <>
            <div className="field">
              <label htmlFor="e-when">Preferred time (WAT)</label>
              <select id="e-when" name="when" className="input" defaultValue="">
                <option value="">Any time</option>
                <option>Weekday mornings</option>
                <option>Weekday afternoons</option>
                <option>Weekday evenings</option>
                <option>Saturdays</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="e-how">Preferred way to talk</label>
              <select id="e-how" name="how" className="input" defaultValue="">
                <option value="">No preference</option>
                <option>WhatsApp call</option>
                <option>Phone call</option>
                <option>Video call</option>
                <option>In person</option>
              </select>
            </div>
          </>
        )}
        <div className="field">
          <label htmlFor="e-loc">Preferred location</label>
          <input id="e-loc" name="location" className="input" placeholder="e.g. Lekki, Abuja, Ibadan" />
        </div>
        <div className="field">
          <label htmlFor="e-budget">Budget range</label>
          <select id="e-budget" name="budget" className="input" defaultValue="">
            <option value="">Prefer to discuss</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="e-msg">Message</label>
        <textarea id="e-msg" name="message" rows={5} required className="input resize-y" defaultValue={defaultMessage ?? (propertyName ? `I'd like to know more about ${propertyName}. ` : "")} placeholder="What are you trying to decide?" aria-invalid={!!errors.message} />
        {errors.message && <p className="err">{errors.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-solid">{consult ? "Request consultation" : "Send enquiry"} <Arrow /></button>
        <p className="max-w-xs text-xs text-slate-ink">This opens a pre-filled message to Jorbe. Nothing is stored on this website.</p>
      </div>
    </form>
  );
}
