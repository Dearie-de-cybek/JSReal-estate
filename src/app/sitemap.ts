import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [props, arts] = await Promise.all([
    db.property.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    db.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ]);
  const pages = ["", "/about", "/properties", "/advisory", "/journal", "/contact", "/privacy"].map((p) => ({ url: base + p, changeFrequency: "weekly" as const }));
  return [
    ...pages,
    ...props.map((p) => ({ url: `${base}/properties/${p.slug}`, lastModified: p.updatedAt })),
    ...arts.map((a) => ({ url: `${base}/journal/${a.slug}`, lastModified: a.updatedAt })),
  ];
}
