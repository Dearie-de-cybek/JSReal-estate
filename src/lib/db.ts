import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const g = globalThis as unknown as { prisma?: PrismaClient };

function make() {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  return new PrismaClient({ adapter });
}

export const db = g.prisma ?? make();
if (process.env.NODE_ENV !== "production") g.prisma = db;
