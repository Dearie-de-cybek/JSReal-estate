import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "dusk" | "court" | "lines" | "portrait";

/**
 * Atmospheric architectural illustration, used ONLY where no photograph has been supplied.
 * Clearly a stand-in: replace by uploading real photography in the admin.
 */
export function Plate({ variant = "dusk", className, label, shift = 0 }: { variant?: Variant; className?: string; label?: string; shift?: number }) {
  const id = `p-${variant}`;
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label ?? "Architectural illustration placeholder"}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1215" />
          <stop offset="0.55" stopColor="#2a2d2e" />
          <stop offset="1" stopColor="#8a7a62" />
        </linearGradient>
        <linearGradient id={`${id}-warm`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9d9b4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#b69a67" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${id}-pool`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d6250" />
          <stop offset="1" stopColor="#14171a" />
        </linearGradient>
        <pattern id={`${id}-louvre`} width="14" height="10" patternUnits="userSpaceOnUse">
          <rect width="14" height="10" fill="#1a1d20" />
          <rect width="14" height="2" fill="#2f3336" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e9d9b4" stopOpacity="0.5" />
          <stop offset="1" stopColor="#e9d9b4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {variant === "dusk" && (
        <g>
          <rect width="1200" height="800" fill={`url(#${id}-sky)`} />
          <rect y="590" width="1200" height="210" fill="#14171a" />
          <g transform={`translate(${shift} 0)`}>
          <ellipse cx="640" cy="560" rx="520" ry="170" fill={`url(#${id}-glow)`} />
          <rect x="120" y="625" width="1000" height="90" fill={`url(#${id}-pool)`} opacity="0.9" />
          {/* upper cantilever */}
          <rect x="250" y="250" width="760" height="60" fill="#101315" />
          <rect x="250" y="310" width="760" height="6" fill="#b69a67" opacity="0.7" />
          <rect x="300" y="316" width="640" height="130" fill={`url(#${id}-louvre)`} />
          <rect x="560" y="330" width="170" height="100" fill={`url(#${id}-warm)`} />
          {/* lower volume */}
          <rect x="180" y="446" width="900" height="40" fill="#0d1012" />
          <rect x="180" y="486" width="900" height="104" fill="#1b1e21" />
          <rect x="220" y="500" width="260" height="90" fill={`url(#${id}-warm)`} />
          <rect x="520" y="500" width="120" height="90" fill="#0f1215" />
          <rect x="680" y="500" width="340" height="90" fill={`url(#${id}-warm)`} opacity="0.8" />
          {[360, 424, 488].map((x) => (
            <rect key={x} x={x} y="500" width="2" height="90" fill="#0f1215" />
          ))}
          {[740, 800, 860, 920].map((x) => (
            <rect key={x} x={x} y="500" width="2" height="90" fill="#0f1215" />
          ))}
          {/* reflections */}
          <rect x="220" y="630" width="260" height="50" fill="#e9d9b4" opacity="0.22" />
          <rect x="680" y="630" width="340" height="50" fill="#e9d9b4" opacity="0.16" />
          <rect x="560" y="330" width="170" height="2" fill="#0f1215" />
          {/* planting */}
          <path d="M80 590 q10 -140 40 -190 q4 90 24 190z" fill="#0b0d0f" />
          <path d="M1080 590 q10 -110 46 -160 q-2 90 20 160z" fill="#0b0d0f" />
          </g>
        </g>
      )}

      {variant === "court" && (
        <g>
          <rect width="1200" height="800" fill="#d8d2c7" />
          <rect width="1200" height="800" fill="#b8ad98" opacity="0.35" />
          <rect x="0" y="0" width="560" height="800" fill="#cfc7b8" />
          <rect x="560" y="0" width="640" height="800" fill="#1d2023" />
          <rect x="620" y="90" width="420" height="620" fill="#2a2e31" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={640 + i * 50} y="110" width="22" height="580" fill="#171a1d" />
          ))}
          <rect x="0" y="560" width="1200" height="240" fill="#a99f8b" opacity="0.45" />
          <path d="M0 560 L560 560 L420 800 L0 800z" fill="#e5dfd2" opacity="0.5" />
          <circle cx="330" cy="330" r="150" fill="#f5f2eb" opacity="0.7" />
          <rect x="560" y="200" width="2" height="360" fill="#b69a67" />
        </g>
      )}

      {variant === "lines" && (
        <g stroke="#171a1d" strokeWidth="1.2" fill="none" opacity="0.8">
          <rect width="1200" height="800" fill="#e9e4d9" stroke="none" />
          <rect x="140" y="120" width="920" height="560" />
          <path d="M140 330h420M560 120v320M560 440h500M820 440v240M300 330v350M140 520h160" />
          <path d="M560 330a60 60 0 0 1 60 60" />
          <path d="M820 560a60 60 0 0 0 60 60" />
          <path d="M60 120v560M40 120h40M40 680h40" stroke="#b69a67" />
          <path d="M140 740h920M140 720v40M1060 720v40" stroke="#b69a67" />
          <g strokeDasharray="4 6" opacity="0.5"><path d="M140 225h920M140 580h920M430 120v560M690 120v560" /></g>
        </g>
      )}

      {variant === "portrait" && (
        <g>
          <rect width="1200" height="800" fill="#cfc7b8" />
          <rect width="1200" height="800" fill={`url(#${id}-sky)`} opacity="0.55" />
          <rect x="740" y="0" width="460" height="800" fill="#171a1d" opacity="0.9" />
          <circle cx="470" cy="300" r="120" fill="#171a1d" opacity="0.85" />
          <path d="M240 800 q0 -280 230 -280 q230 0 230 280z" fill="#171a1d" opacity="0.85" />
          <rect x="740" y="100" width="2" height="600" fill="#b69a67" />
        </g>
      )}
    </svg>
  );
}

/** A photograph when supplied, otherwise a clearly-marked illustrated stand-in. */
export function Photo({
  src,
  alt,
  variant = "dusk",
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  shift,
}: {
  shift?: number;
  src?: string | null;
  alt: string;
  variant?: Variant;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-stone", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <Plate variant={variant} label={alt} shift={shift} />
      )}
    </div>
  );
}
