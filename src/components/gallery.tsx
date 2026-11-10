"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plate } from "./plate";

type Img = { url: string; alt: string };

export function Gallery({ images, name }: { images: Img[]; name: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const n = images.length;
  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  if (n === 0)
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-stone">
        <Plate variant="dusk" label={`${name} — photography pending`} />
        <p className="absolute bottom-4 right-4 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/70">Photography pending</p>
      </div>
    );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-stone"
        aria-label={`Enlarge image ${active + 1} of ${n}`}
      >
        <Image
          key={images[active].url}
          src={images[active].url}
          alt={images[active].alt || name}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 left-4 bg-ivory px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
          {active + 1} / {n}
        </span>
      </button>
      {n > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {images.map((im, i) => (
            <li key={im.url} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative block h-20 w-28 overflow-hidden transition-opacity ${i === active ? "opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-ivory" : "opacity-55 hover:opacity-100"}`}
              >
                <Image src={im.url} alt="" fill sizes="112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="on-dark fixed inset-0 z-[80] flex flex-col bg-ink/96 text-ivory"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <p className="eyebrow">{name} — {active + 1} / {n}</p>
              <button type="button" onClick={() => setOpen(false)} className="p-2" aria-label="Close gallery">
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden><path d="M3 3l16 16M19 3L3 19" stroke="currentColor" /></svg>
              </button>
            </div>
            <div className="relative flex-1">
              <Image src={images[active].url} alt={images[active].alt || name} fill sizes="100vw" className="object-contain" />
              {n > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-3xl hover:text-gold sm:left-6">‹</button>
                  <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-3xl hover:text-gold sm:right-6">›</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
