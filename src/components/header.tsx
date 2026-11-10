"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo, Monogram } from "./brand";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
  { href: "/advisory", label: "Advisory" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const setOpen = (v: boolean) => setOpenAt(v ? path : null);
  const [scrolled, setScrolled] = useState(false);
  const overlay = path === "/" && !scrolled; // transparent over the dark hero

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,color,border-color] duration-500",
          overlay
            ? "on-dark border-b border-transparent text-ivory"
            : "border-b border-[var(--line)] bg-ivory/92 text-ink backdrop-blur-md"
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between">
          <Logo />
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className="underline-hover pb-1 text-[0.78rem] font-medium uppercase tracking-[0.16em]"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/contact?type=consultation"
              className="btn btn-solid hidden whitespace-nowrap !py-2.5 sm:inline-flex"
            >
              Book a consultation
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              <span className="flex w-6 flex-col gap-[7px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-4 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[60] bg-ink/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="sheet"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="on-dark fixed inset-y-0 right-0 z-[70] flex w-[min(24rem,92vw)] flex-col bg-ink px-8 py-7 text-ivory"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Monogram size={38} />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                    <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-12 flex-1">
                <ul>
                  {NAV.map((n, i) => (
                    <motion.li
                      key={n.href}
                      className="border-b border-[var(--line-light)]"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={n.href}
                        aria-current={active(n.href) ? "page" : undefined}
                        className="flex items-baseline gap-4 py-4 font-serif text-[2rem] leading-none aria-[current=page]:italic aria-[current=page]:text-gold"
                      >
                        <span className="num !text-[0.8rem]">0{i + 1}</span>
                        {n.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <Link href="/contact?type=consultation" className="btn btn-solid justify-center">
                Book a consultation
              </Link>
              <p className="eyebrow mt-6 text-center">Property • Wealth • Smart Decisions</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
