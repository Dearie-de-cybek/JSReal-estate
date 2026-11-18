import { cn } from "@/lib/utils";

export type IconName =
  | "compass" | "heart" | "chat" | "search" | "shield" | "key" | "users" | "trending"
  | "globe" | "book" | "home" | "check" | "family" | "lightbulb" | "map";

const P: Record<IconName, React.ReactNode> = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />,
  chat: <><path d="M4 5h16v10H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  shield: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></>,
  key: <><circle cx="8" cy="12" r="3.5" /><path d="M11.5 12H21M17 12v3M20 12v2" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2c3 0 5 2 5 5.3" /></>,
  trending: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  book: <><path d="M3 5.5C6 4 9 4 12 6c3-2 6-2 9-.5V19c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5z" /><path d="M12 6v13.5" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5.5 10v10h13V10" /><path d="M10 20v-5h4v5" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8 12.3l2.8 2.8L16.3 9.5" /></>,
  family: <><circle cx="8" cy="7" r="2.6" /><circle cx="16.5" cy="8.5" r="2" /><path d="M3 20v-3.5C3 14 5 12.5 8 12.5s5 1.5 5 4V20" /><path d="M14.5 20v-2.5c0-1.6 1-2.7 2.5-2.7s3 1.1 3 2.7V20" /></>,
  lightbulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z" /></>,
  map: <><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>,
};

/** Fine-line icon set matching the editorial hairline style. Decorative by default. */
export function Icon({ name, className, size = 28 }: { name: IconName; className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={cn("shrink-0", className)}>
      {P[name]}
    </svg>
  );
}
