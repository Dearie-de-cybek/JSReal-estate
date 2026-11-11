"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Arrow } from "./brand";
import { cn } from "@/lib/utils";

type Item = { slug: string; n: string; title: string; short: string; image: string };

/** One large photograph; the four advisory services as a calm index that swaps it. */
export function ServiceShowcase({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink/40 lg:col-span-7 lg:aspect-[4/5] xl:aspect-[5/6]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={items[active].slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={items[active].image} alt={items[active].title} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <ul className="lg:col-span-5 lg:self-center">
        {items.map((s, i) => (
          <li key={s.slug} className="border-t border-[var(--line-light)] last:border-b">
            <Link
              href={`/advisory#${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group block py-7"
            >
              <span className="flex items-baseline gap-5">
                <span className="num !text-base">{s.n}</span>
                <span className={cn("display h-md transition-colors", active === i ? "text-ivory" : "text-ivory/55 group-hover:text-ivory")}>{s.title}</span>
              </span>
              <span className={cn("grid transition-all duration-500", active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[0fr]")}>
                <span className="overflow-hidden">
                  <span className="mt-4 block max-w-md pl-11 text-ivory/70">{s.short}</span>
                  <span className="link-arrow mt-5 ml-11">Learn more <Arrow /></span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
