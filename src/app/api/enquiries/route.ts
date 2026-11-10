import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquirySchema } from "@/lib/schemas";
import { clientIp, rateLimit, sameOrigin } from "@/lib/security";
import { notifyOwner } from "@/lib/notify";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const ip = await clientIp();
  if (!rateLimit(`enq:${ip}`, 5, 10 * 60_000))
    return NextResponse.json({ error: "Too many enquiries. Please try again shortly." }, { status: 429 });

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
    // honeypot tripped: pretend success so bots learn nothing
    if (fields.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 422 });
  }
  const d = parsed.data;
  // time trap: humans take longer than 3 seconds
  if (d.t && Date.now() - d.t < 3000) return NextResponse.json({ ok: true });

  let propertyId: string | null = null;
  if (d.propertyId) {
    const p = await db.property.findUnique({ where: { id: d.propertyId }, select: { id: true } });
    propertyId = p?.id ?? null;
  }
  await db.enquiry.create({
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone,
      type: d.type,
      location: d.location,
      budget: d.budget,
      message: d.message,
      propertyId,
    },
  });
  await notifyOwner(
    `New enquiry — ${d.type}`,
    `${d.name} <${d.email}> ${d.phone}\nLocation: ${d.location}\nBudget: ${d.budget}\n\n${d.message}`
  );
  return NextResponse.json({ ok: true });
}
