import type { MetadataRoute } from "next";
import { ARTICLES, PROPERTIES } from "@/lib/content";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = ["", "/about", "/properties", "/advisory", "/journal", "/contact", "/privacy"].map((p) => ({ url: base + p, changeFrequency: "weekly" as const }));
  return [
    ...pages,
    ...PROPERTIES.filter((p) => p.released).map((p) => ({ url: `${base}/properties/${p.slug}` })),
    ...ARTICLES.filter((a) => a.published && a.body).map((a) => ({ url: `${base}/journal/${a.slug}`, lastModified: a.date })),
  ];
}
