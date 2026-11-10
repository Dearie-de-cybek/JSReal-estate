import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { Photo } from "@/components/photo";
import { ImageReveal, Reveal } from "@/components/motion";
import { IMG, waLink } from "@/lib/content";

const SIDE_IMG: Record<string, string> = {
  journal: "/images/journal-3.jpg",
  properties: "/images/prop-1.jpg",
  whatsapp: "/images/svc-diaspora.jpg",
};

export const metadata: Metadata = {
  title: "Coming soon",
  robots: { index: false },
};

const COPY: Record<string, { eyebrow: string; title: React.ReactNode; body: string }> = {
  properties: {
    eyebrow: "Properties",
    title: <>Curated listings, <em>verified first.</em></>,
    body: "Each property is released only once its details and documentation status have been confirmed. The first opportunities are being prepared.",
  },
  journal: {
    eyebrow: "The Journal",
    title: <>Better informed, <em>shortly.</em></>,
    body: "The Journal's full articles, guides and checklists are being written. They will appear here as soon as they are ready.",
  },
  whatsapp: {
    eyebrow: "Contact",
    title: <>Direct channels are <em>opening soon.</em></>,
    body: "WhatsApp, telephone and email details are being set up. Please check back shortly.",
  },
};

export default async function ComingSoon({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const c = COPY[from ?? ""] ?? {
    eyebrow: "Coming soon",
    title: <>This part of the journal is <em>still being written.</em></>,
    body: "We are putting the finishing touches on it. Thank you for your patience.",
  };
  return (
    <section className="on-dark relative grid min-h-[100svh] overflow-hidden bg-ink text-ivory lg:grid-cols-[1.05fr_1fr]">
      <ImageReveal className="relative h-[46svh] lg:h-auto">
        <Photo src={SIDE_IMG[from ?? ""] ?? IMG.hero} alt="" className="absolute inset-0 h-full w-full" priority sizes="(min-width:1024px) 52vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/40" aria-hidden />
      </ImageReveal>
      <div className="flex items-center px-[clamp(1.25rem,5vw,5rem)] py-20 lg:py-40">
        <Reveal>
          <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-gold" /> {c.eyebrow}</p>
          <h1 className="display h-lg mt-8 max-w-3xl">{c.title}</h1>
          <p className="lede mt-8">{c.body}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-solid">Back to home <Arrow /></Link>
            <Link href="/advisory" className="btn btn-line">Explore advisory</Link>
            <a href={waLink("Hello Jorbe, I'd like to discuss a property decision.")} className="btn btn-line" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
