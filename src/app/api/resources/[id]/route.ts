import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const r = await db.resource.findFirst({ where: { id, published: true } });
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.resource.update({ where: { id }, data: { downloads: { increment: 1 } } });
  return NextResponse.redirect(new URL(r.fileUrl, req.url));
}
