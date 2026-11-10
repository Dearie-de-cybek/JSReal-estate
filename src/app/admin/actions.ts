"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession, destroySession, getSession, requireUser } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/security";
import { slugify } from "@/lib/utils";
import { SETTING_DEFAULTS } from "@/lib/settings";

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const num = (fd: FormData, k: string) => {
  const v = s(fd, k).replace(/[,\s₦]/g, "");
  return v === "" || isNaN(Number(v)) ? null : Number(v);
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on";
const lines = (v: string) => v.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);

export type ActionState = { error?: string; ok?: string } | undefined;

async function uniqueSlug(model: "property" | "article", base: string, id?: string) {
  const root = slugify(base) || model;
  let slug = root;
  for (let i = 2; ; i++) {
    const hit =
      model === "property"
        ? await db.property.findUnique({ where: { slug } })
        : await db.article.findUnique({ where: { slug } });
    if (!hit || hit.id === id) return slug;
    slug = `${root}-${i}`;
  }
}

/* ───────── Auth ───────── */
export async function login(_: ActionState, fd: FormData): Promise<ActionState> {
  const ip = await clientIp();
  if (!rateLimit(`login:${ip}`, 6, 15 * 60_000)) return { error: "Too many attempts. Try again in a few minutes." };
  const email = s(fd, "email").toLowerCase();
  const user = await db.user.findUnique({ where: { email } });
  // constant-ish time: always run a compare
  const ok = await bcrypt.compare(
    s(fd, "password"),
    user?.passwordHash ?? "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv"
  );
  if (!user || !ok) return { error: "Incorrect email or password." };
  await createSession({ id: user.id, role: user.role as "ADMIN" | "EDITOR", name: user.name, email: user.email });
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ───────── Properties ───────── */
export async function saveProperty(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser();
  const id = s(fd, "id");
  const name = s(fd, "name");
  if (!name) return { error: "Property name is required." };
  const status = s(fd, "documentationStatus") || "UNVERIFIED";
  const data = {
    name,
    summary: s(fd, "summary"),
    description: s(fd, "description"),
    city: s(fd, "city"),
    state: s(fd, "state"),
    address: s(fd, "address"),
    propertyType: s(fd, "propertyType"),
    purpose: s(fd, "purpose") === "INVESTMENT" ? "INVESTMENT" : "RESIDENTIAL",
    categoryId: s(fd, "categoryId") || null,
    price: num(fd, "price"),
    priceVerified: bool(fd, "priceVerified"),
    priceNote: s(fd, "priceNote"),
    availability: ["AVAILABLE", "RESERVED", "SOLD", "COMING_SOON"].includes(s(fd, "availability")) ? s(fd, "availability") : "AVAILABLE",
    bedrooms: num(fd, "bedrooms"),
    bathrooms: num(fd, "bathrooms"),
    sizeSqm: num(fd, "sizeSqm"),
    features: JSON.stringify(lines(s(fd, "features"))),
    documentationStatus: ["UNVERIFIED", "IN_REVIEW", "VERIFIED"].includes(status) ? status : "UNVERIFIED",
    documentationNotes: s(fd, "documentationNotes"),
    featured: bool(fd, "featured"),
    published: bool(fd, "published"),
  };
  // Verified-on date is set only when status becomes VERIFIED
  const prev = id ? await db.property.findUnique({ where: { id } }) : null;
  const documentationVerifiedOn =
    data.documentationStatus === "VERIFIED" ? prev?.documentationVerifiedOn ?? new Date() : null;

  // images: "url|alt" per line, order preserved
  const imgs = lines(s(fd, "images")).map((l, i) => {
    const [url, ...alt] = l.split("|");
    return { url: url.trim(), alt: alt.join("|").trim(), sortOrder: i };
  }).filter((i) => /^(\/uploads\/|https:\/\/)/.test(i.url));

  const slug = await uniqueSlug("property", s(fd, "slug") || name, id || undefined);
  const saved = id
    ? await db.property.update({ where: { id }, data: { ...data, slug, documentationVerifiedOn } })
    : await db.property.create({ data: { ...data, slug, documentationVerifiedOn } });
  await db.propertyImage.deleteMany({ where: { propertyId: saved.id } });
  if (imgs.length) await db.propertyImage.createMany({ data: imgs.map((i) => ({ ...i, propertyId: saved.id })) });

  revalidatePath("/", "layout");
  redirect(`/admin/properties/${saved.id}?saved=1`);
}

export async function quickUpdateProperty(fd: FormData) {
  await requireUser();
  const id = s(fd, "id");
  await db.property.update({
    where: { id },
    data: {
      availability: s(fd, "availability") || "AVAILABLE",
      price: num(fd, "price"),
      priceVerified: bool(fd, "priceVerified"),
    },
  });
  revalidatePath("/", "layout");
}

export async function deleteProperty(fd: FormData) {
  await requireUser();
  await db.property.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/", "layout");
  redirect("/admin/properties");
}

/* ───────── Articles ───────── */
export async function saveArticle(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser();
  const id = s(fd, "id");
  const title = s(fd, "title");
  if (!title) return { error: "Title is required." };
  const published = bool(fd, "published");
  const prev = id ? await db.article.findUnique({ where: { id } }) : null;
  const data = {
    title,
    excerpt: s(fd, "excerpt"),
    body: String(fd.get("body") ?? ""),
    coverUrl: s(fd, "coverUrl"),
    coverAlt: s(fd, "coverAlt"),
    author: s(fd, "author") || "Jorbe Samuel",
    categoryId: s(fd, "categoryId") || null,
    featured: bool(fd, "featured"),
    published,
    publishedAt: published ? (s(fd, "publishedAt") ? new Date(s(fd, "publishedAt")) : prev?.publishedAt ?? new Date()) : prev?.publishedAt ?? null,
  };
  const slug = await uniqueSlug("article", s(fd, "slug") || title, id || undefined);
  const saved = id
    ? await db.article.update({ where: { id }, data: { ...data, slug } })
    : await db.article.create({ data: { ...data, slug } });
  revalidatePath("/", "layout");
  redirect(`/admin/articles/${saved.id}?saved=1`);
}

export async function deleteArticle(fd: FormData) {
  await requireUser();
  await db.article.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/", "layout");
  redirect("/admin/articles");
}

/* ───────── Resources ───────── */
export async function saveResource(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser();
  const title = s(fd, "title");
  const fileUrl = s(fd, "fileUrl");
  if (!title || !fileUrl) return { error: "Title and an uploaded PDF are required." };
  if (!/^(\/uploads\/.+\.pdf|https:\/\/.+)$/i.test(fileUrl)) return { error: "File must be an uploaded PDF or an https link." };
  await db.resource.create({
    data: { title, description: s(fd, "description"), fileUrl, fileSize: num(fd, "fileSize") ?? 0, published: true },
  });
  revalidatePath("/journal");
  return { ok: "Resource added." };
}

export async function toggleResource(fd: FormData) {
  await requireUser();
  const r = await db.resource.findUnique({ where: { id: s(fd, "id") } });
  if (r) await db.resource.update({ where: { id: r.id }, data: { published: !r.published } });
  revalidatePath("/journal");
  revalidatePath("/admin/resources");
}

export async function deleteResource(fd: FormData) {
  await requireUser();
  await db.resource.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/journal");
  revalidatePath("/admin/resources");
}

/* ───────── FAQs ───────── */
export async function saveFaq(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser();
  const id = s(fd, "id");
  const data = {
    question: s(fd, "question"),
    answer: s(fd, "answer"),
    topic: s(fd, "topic") || "General",
    sortOrder: num(fd, "sortOrder") ?? 0,
    published: bool(fd, "published"),
  };
  if (!data.question || !data.answer) return { error: "Question and answer are required." };
  if (id) await db.faq.update({ where: { id }, data });
  else await db.faq.create({ data });
  revalidatePath("/journal");
  revalidatePath("/admin/faqs");
  return { ok: "Saved." };
}

export async function deleteFaq(fd: FormData) {
  await requireUser();
  await db.faq.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/journal");
  revalidatePath("/admin/faqs");
}

/* ───────── Enquiries ───────── */
export async function updateEnquiry(fd: FormData) {
  await requireUser();
  const status = ["NEW", "CONTACTED", "CLOSED"].includes(s(fd, "status")) ? s(fd, "status") : "NEW";
  await db.enquiry.update({ where: { id: s(fd, "id") }, data: { status, notes: s(fd, "notes") } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiry(fd: FormData) {
  await requireUser("ADMIN");
  await db.enquiry.delete({ where: { id: s(fd, "id") } });
  revalidatePath("/admin/enquiries");
}

/* ───────── Profile & settings ───────── */
export async function saveProfile(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser("ADMIN");
  for (const key of Object.keys(SETTING_DEFAULTS)) {
    if (!fd.has(key)) continue;
    let value = String(fd.get(key) ?? "").trim();
    if (key === "whatsapp") value = value.replace(/\D/g, "");
    if (["instagram", "linkedin", "x", "facebook"].includes(key) && value && !/^https:\/\//i.test(value))
      return { error: `${key} link must start with https://` };
    if (key === "values") value = lines(value).join("|");
    await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/", "layout");
  return { ok: "Profile updated." };
}

/* ───────── Users ───────── */
const userSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(12, "Password must be at least 12 characters"),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export async function createUser(_: ActionState, fd: FormData): Promise<ActionState> {
  await requireUser("ADMIN");
  const p = userSchema.safeParse(Object.fromEntries(fd));
  if (!p.success) return { error: p.error.issues[0].message };
  if (await db.user.findUnique({ where: { email: p.data.email } })) return { error: "That email already has an account." };
  await db.user.create({
    data: { name: p.data.name, email: p.data.email, role: p.data.role, passwordHash: await bcrypt.hash(p.data.password, 12) },
  });
  revalidatePath("/admin/users");
  return { ok: "User created." };
}

export async function deleteUser(fd: FormData) {
  const me = await requireUser("ADMIN");
  const id = s(fd, "id");
  if (id === me.id) return;
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function changePassword(_: ActionState, fd: FormData): Promise<ActionState> {
  const me = await getSession();
  if (!me) redirect("/admin/login");
  const user = await db.user.findUnique({ where: { id: me.id } });
  if (!user || !(await bcrypt.compare(s(fd, "current"), user.passwordHash))) return { error: "Current password is incorrect." };
  const next = String(fd.get("next") ?? "");
  if (next.length < 12) return { error: "New password must be at least 12 characters." };
  await db.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(next, 12) } });
  return { ok: "Password changed." };
}
