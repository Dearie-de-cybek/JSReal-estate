"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div aria-hidden className="fixed inset-x-0 top-[4.5rem] z-40 h-[2px] origin-left bg-gold" style={{ scaleX }} />
  );
}
