import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { propertyInclude } from "@/lib/queries";
import { PropertyForm } from "../property-form";

export default async function EditProperty({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const p = await db.property.findUnique({ where: { id }, include: propertyInclude });
  if (!p) notFound();
  return <PropertyForm p={p} saved={!!saved} />;
}
