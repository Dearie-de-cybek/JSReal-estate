import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { ARTICLES, FAQS } from "./content";

const db = new PrismaClient({
  adapter: new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db", authToken: process.env.DATABASE_AUTH_TOKEN }),
});

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password.length < 12) throw new Error("Set ADMIN_PASSWORD (12+ chars) before seeding.");
  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Jorbe Samuel", role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) },
  });

  const propCats = ["Residential", "Land", "Commercial", "Off-plan"];
  for (const [i, name] of propCats.entries())
    await db.category.upsert({
      where: { slug: slug(name) },
      update: {},
      create: { name, slug: slug(name), kind: "PROPERTY", sortOrder: i },
    });

  const artCats = ["First-time buyers", "Land & documentation", "Investment", "Diaspora", "Location & value"];
  const catIds: Record<string, string> = {};
  for (const [i, name] of artCats.entries()) {
    const c = await db.category.upsert({
      where: { slug: slug(name) },
      update: {},
      create: { name, slug: slug(name), kind: "ARTICLE", sortOrder: i },
    });
    catIds[name] = c.id;
  }

  for (const a of ARTICLES) {
    await db.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        body: a.body,
        categoryId: catIds[a.category],
        featured: a.featured ?? false,
        published: true,
        publishedAt: new Date(a.date),
      },
    });
  }

  if ((await db.faq.count()) === 0)
    await db.faq.createMany({ data: FAQS.map((f, i) => ({ ...f, sortOrder: i })) });

  console.log("Seed complete. Admin:", email);
}

main().finally(() => db.$disconnect());
