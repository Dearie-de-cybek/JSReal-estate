import { db } from "./db";
import { parseList } from "./utils";
import type { Prisma } from "@/generated/prisma/client";

export const propertyInclude = {
  images: { orderBy: { sortOrder: "asc" as const } },
  category: true,
} satisfies Prisma.PropertyInclude;

export type PropertyFull = Prisma.PropertyGetPayload<{ include: typeof propertyInclude }>;
export const featuresOf = (p: { features: string }) => parseList(p.features);

export async function featuredProperties(take = 3) {
  const featured = await db.property.findMany({
    where: { published: true, featured: true },
    include: propertyInclude,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take,
  });
  return featured;
}

export type PropertyFilters = {
  q?: string;
  city?: string;
  category?: string;
  type?: string;
  purpose?: string;
  availability?: string;
  price?: string; // "min-max" in millions
};

export async function searchProperties(f: PropertyFilters) {
  const where: Prisma.PropertyWhereInput = { published: true };
  if (f.city) where.city = f.city;
  if (f.category) where.category = { slug: f.category };
  if (f.type) where.propertyType = f.type;
  if (f.purpose) where.purpose = f.purpose;
  if (f.availability) where.availability = f.availability;
  if (f.q)
    where.OR = [
      { name: { contains: f.q } },
      { city: { contains: f.q } },
      { summary: { contains: f.q } },
      { propertyType: { contains: f.q } },
    ];
  if (f.price) {
    const [min, max] = f.price.split("-").map((n) => (n ? Number(n) * 1_000_000 : undefined));
    where.price = { ...(min ? { gte: min } : {}), ...(max ? { lte: max } : {}) };
  }
  return db.property.findMany({
    where,
    include: propertyInclude,
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function propertyFacets() {
  const rows = await db.property.findMany({
    where: { published: true },
    select: { city: true, propertyType: true },
  });
  const uniq = (a: string[]) => [...new Set(a.filter(Boolean))].sort();
  const categories = await db.category.findMany({
    where: { kind: "PROPERTY" },
    orderBy: { sortOrder: "asc" },
  });
  return {
    cities: uniq(rows.map((r) => r.city)),
    types: uniq(rows.map((r) => r.propertyType)),
    categories,
  };
}

export async function propertyBySlug(slug: string, includeDraft = false) {
  return db.property.findFirst({
    where: { slug, ...(includeDraft ? {} : { published: true }) },
    include: propertyInclude,
  });
}

export async function latestArticles(take = 6) {
  return db.article.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take,
  });
}

export async function articleBySlug(slug: string) {
  return db.article.findFirst({ where: { slug, published: true }, include: { category: true } });
}

export async function relatedArticles(id: string, categoryId: string | null, take = 3) {
  const same = categoryId
    ? await db.article.findMany({
        where: { published: true, categoryId, NOT: { id } },
        include: { category: true },
        orderBy: { publishedAt: "desc" },
        take,
      })
    : [];
  if (same.length >= take) return same;
  const more = await db.article.findMany({
    where: { published: true, NOT: { id: { in: [id, ...same.map((s) => s.id)] } } },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: take - same.length,
  });
  return [...same, ...more];
}
