import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** JS monogram: an upright J carrying an italic S, joined by a single gold stroke. */
export function Monogram({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="JS monogram"
      className={cn("shrink-0", className)}
      fill="none"
    >
      <rect x="0.75" y="0.75" width="62.5" height="62.5" stroke="currentColor" strokeWidth="1" opacity="0.9" />
      <text
        x="14"
        y="46"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="40"
        fontWeight="500"
        fill="currentColor"
      >
        J
      </text>
      <text
        x="29"
        y="46"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="40"
        fontStyle="italic"
        fontWeight="400"
        fill="currentColor"
      >
        S
      </text>
      <path d="M9 52 L55 52" stroke="var(--gold)" strokeWidth="1.2" />
    </svg>
  );
}

export function Wordmark({ className, sub = true }: { className?: string; sub?: boolean }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className="whitespace-nowrap text-[0.95rem] font-semibold tracking-[0.34em]">JORBE SAMUEL</span>
      {sub && (
        <span className="mt-1.5 whitespace-nowrap text-[0.58rem] font-medium uppercase tracking-[0.3em] opacity-65">
          Real Estate Consultant
        </span>
      )}
    </span>
  );
}

/** Jorbe's own logo (gold script on navy), cropped from the brand banner. */
export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-header.jpg"
      alt="JORBE SAMUEL — Real Estate Consultant"
      width={960}
      height={430}
      priority={priority}
      sizes="160px"
      className={cn("h-11 w-auto rounded-[2px] ring-1 ring-gold/50 sm:h-12", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Jorbe Samuel — home" className={cn("flex items-center", className)}>
      <BrandLogo priority />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden className={className}>
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
