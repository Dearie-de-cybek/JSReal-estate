"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Full-bleed photograph with gentle parallax and an optional caption. Pure image-led breathing room. */
export function PhotoBreak({
  src,
  alt,
  children,
  className,
  align = "left",
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  return (
    <section ref={ref} className={cn("on-dark relative isolate flex h-[70svh] min-h-[26rem] items-end overflow-hidden bg-ink text-ivory lg:h-[85svh]", className)}>
      <motion.div className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      {children && (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" aria-hidden />
          <div className={cn("container-x pb-12 sm:pb-20", align === "right" && "text-right", align === "center" && "text-center")}>{children}</div>
        </>
      )}
    </section>
  );
}
