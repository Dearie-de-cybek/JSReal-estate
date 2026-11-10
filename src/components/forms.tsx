"use client";

import { useState } from "react";
import { ENQUIRY_TYPES, BUDGETS } from "@/lib/schemas";
import { Arrow } from "./brand";

type State = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Something went wrong");
      setState("done");
      setMsg("Subscribed. Thank you.");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "done") return <p role="status" className="text-gold">{msg}</p>;
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex items-end gap-3 border-b border-[var(--line-light)] focus-within:border-gold">
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          className="w-full bg-transparent py-3 text-ivory outline-none placeholder:text-ivory/40"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button type="submit" aria-label="Subscribe" disabled={state === "sending"} className="pb-3 hover:text-gold disabled:opacity-50">
          <Arrow />
        </button>
      </div>
      {state === "error" && <p role="alert" className="mt-2 text-sm text-[#f0a79b]">{msg}</p>}
    </form>
  );
}

export type EnquiryFormProps = {
  defaultType?: string;
  defaultMessage?: string;
  propertyId?: string;
  propertyName?: string;
  compact?: boolean;
  /** WhatsApp number (digits) for the context-aware hand-off after sending */
  whatsapp?: string;
};

export function EnquiryForm({ defaultType, defaultMessage, propertyId, propertyName, compact, whatsapp }: EnquiryFormProps) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMsg, setServerMsg] = useState("");
  const [started] = useState(() => Date.now());
  const [who, setWho] = useState("");
  const [showBudget, setShowBudget] = useState(
    !defaultType || /advis|invest|search|diaspora|specific/i.test(defaultType)
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(fd);
    data.t = started;
    setWho(String(data.name ?? ""));
    if (propertyId) data.propertyId = propertyId;
    setState("sending");
    setErrors({});
    try {
      const r = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) {
        setErrors(j.fields ?? {});
        throw new Error(j.error ?? "We couldn't send that. Please try again.");
      }
      setState("done");
    } catch (err) {
      setState("error");
      setServerMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "done") {
    const wa = whatsapp?.replace(/\D/g, "");
    const text = `Hello Jorbe, I just sent an enquiry${propertyName ? ` about ${propertyName}` : ""}${who ? ` — ${who}` : ""}.`;
    return (
      <div role="status" className="border border-[var(--line)] p-8">
        <p className="num">Received</p>
        <h3 className="display h-sm mt-2">Thank you. Your enquiry is in.</h3>
        <p className="mt-4 text-slate-ink">
          Jorbe will read it personally and reply by email or phone. If it&apos;s urgent, message on WhatsApp.
        </p>
        {wa && (
          <a className="link-arrow mt-6" href={`https://wa.me/${wa}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" aria-describedby={state === "error" ? "form-error" : undefined}>
      {propertyName && (
        <p className="border-l-2 border-gold pl-4 text-sm text-slate-ink">
          Enquiring about <strong className="text-ink">{propertyName}</strong>
        </p>
      )}
      <div className={compact ? "space-y-8" : "grid gap-x-10 gap-y-8 sm:grid-cols-2"}>
        <div className="field">
          <label htmlFor="e-name">Name</label>
          <input id="e-name" name="name" className="input" required autoComplete="name" aria-invalid={!!err("name")} />
          {err("name") && <p className="err">{err("name")}</p>}
        </div>
        <div className="field">
          <label htmlFor="e-email">Email</label>
          <input id="e-email" name="email" type="email" className="input" required autoComplete="email" aria-invalid={!!err("email")} />
          {err("email") && <p className="err">{err("email")}</p>}
        </div>
        <div className="field">
          <label htmlFor="e-phone">Phone / WhatsApp</label>
          <input id="e-phone" name="phone" type="tel" className="input" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="e-type">I&apos;m enquiring about</label>
          <select
            id="e-type"
            name="type"
            className="input"
            defaultValue={defaultType ?? (propertyId ? "A specific property" : ENQUIRY_TYPES[0])}
            onChange={(e) => setShowBudget(/advis|invest|search|diaspora|specific/i.test(e.target.value))}
          >
            {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
            {defaultType === "consultation" && <option>Consultation</option>}
          </select>
        </div>
        <div className="field">
          <label htmlFor="e-loc">Preferred location</label>
          <input id="e-loc" name="location" className="input" placeholder="e.g. Lekki, Abuja, Ibadan" />
        </div>
        {showBudget && (
          <div className="field">
            <label htmlFor="e-budget">Budget range</label>
            <select id="e-budget" name="budget" className="input" defaultValue="">
              <option value="">Prefer to discuss</option>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="e-msg">Message</label>
        <textarea
          id="e-msg"
          name="message"
          rows={5}
          required
          className="input resize-y"
          defaultValue={defaultMessage}
          placeholder="What are you trying to decide?"
          aria-invalid={!!err("message")}
        />
        {err("message") && <p className="err">{err("message")}</p>}
      </div>
      {/* honeypot */}
      <div className="hidden" aria-hidden>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-solid" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send enquiry"} <Arrow />
        </button>
        <p className="max-w-xs text-xs text-slate-ink">
          Your details are used only to respond to you. See the <a className="underline" href="/privacy">privacy policy</a>.
        </p>
      </div>
      {state === "error" && <p id="form-error" role="alert" className="err">{serverMsg}</p>}
    </form>
  );
}
