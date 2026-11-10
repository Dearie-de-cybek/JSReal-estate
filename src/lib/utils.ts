import clsx, { type ClassValue } from "clsx";

export const cn = (...v: ClassValue[]) => clsx(v);

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const formatNaira = (n: number) =>
  "₦" + new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(n);

export const formatDate = (d: Date | string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));

export const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));

export const parseList = (s: string): string[] => {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
};

export const AVAILABILITY: Record<string, string> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
  COMING_SOON: "Coming soon",
};

export const PURPOSE: Record<string, string> = { RESIDENTIAL: "Residential", INVESTMENT: "Investment" };

export const DOC_STATUS: Record<string, string> = {
  UNVERIFIED: "Documentation not yet independently verified",
  IN_REVIEW: "Documentation under review",
  VERIFIED: "Documentation verified",
};

export const siteUrl = () => (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
