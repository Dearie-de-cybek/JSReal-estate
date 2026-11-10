// DEV ONLY: inserts clearly-labelled SAMPLE properties so the layout can be reviewed.
// Run `npx tsx prisma/demo.ts --remove` to delete them. Never run against a live site.
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const db = new PrismaClient({ adapter: new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" }) });
const SAMPLE = [
  { slug: "sample-property-one", name: "SAMPLE — Garden Residence", city: "Lekki", state: "Lagos", propertyType: "Detached duplex", bedrooms: 4, bathrooms: 5, sizeSqm: 420, price: 185000000, priceVerified: true, featured: true },
  { slug: "sample-property-two", name: "SAMPLE — Corner Plot", city: "Abuja", state: "FCT", propertyType: "Residential land", sizeSqm: 600, price: 45000000, priceVerified: false, purpose: "INVESTMENT", featured: true },
  { slug: "sample-property-three", name: "SAMPLE — City Apartment", city: "Ibadan", state: "Oyo", propertyType: "Apartment", bedrooms: 2, bathrooms: 2, availability: "COMING_SOON", featured: true },
];
async function main() {
  if (process.argv.includes("--remove")) {
    await db.property.deleteMany({ where: { slug: { startsWith: "sample-property-" } } });
    return console.log("removed");
  }
  for (const s of SAMPLE)
    await db.property.upsert({
      where: { slug: s.slug },
      update: {},
      create: { summary: "Sample entry for design review only — not a real listing.", description: "Sample text.", features: JSON.stringify(["Sample feature", "Gated estate"]), published: true, ...s },
    });
  console.log("demo added");
}
main().finally(() => db.$disconnect());
