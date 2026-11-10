import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/schemas";
import { clientIp, rateLimit, sameOrigin } from "@/lib/security";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!rateLimit(`nl:${await clientIp()}`, 5, 10 * 60_000))
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const parsed = newsletterSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  await db.subscriber.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    update: {},
    create: { email: parsed.data.email.toLowerCase() },
  });
  return NextResponse.json({ ok: true });
}
