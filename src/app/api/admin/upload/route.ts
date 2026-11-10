import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getSession } from "@/lib/auth";
import { sameOrigin } from "@/lib/security";

const IMAGE = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);
const MAX_IMAGE = 12 * 1024 * 1024;
const MAX_PDF = 25 * 1024 * 1024;

/** Magic-byte check so a renamed file can't masquerade as an image/PDF. */
function sniff(buf: Buffer, mime: string) {
  if (mime === "application/pdf") return buf.subarray(0, 4).toString() === "%PDF";
  if (mime === "image/jpeg") return buf[0] === 0xff && buf[1] === 0xd8;
  if (mime === "image/png") return buf.subarray(1, 4).toString() === "PNG";
  if (mime === "image/webp") return buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP";
  if (mime === "image/avif") return buf.subarray(4, 12).toString().startsWith("ftypavif");
  return false;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const isPdf = file.type === "application/pdf";
  const ext = isPdf ? "pdf" : IMAGE.get(file.type);
  if (!ext) return NextResponse.json({ error: "Only JPG, PNG, WebP, AVIF or PDF files are allowed." }, { status: 415 });
  if (file.size > (isPdf ? MAX_PDF : MAX_IMAGE))
    return NextResponse.json({ error: `File too large (max ${isPdf ? 25 : 12}MB).` }, { status: 413 });

  const buf = Buffer.from(await file.arrayBuffer());
  if (!sniff(buf, file.type)) return NextResponse.json({ error: "File content does not match its type." }, { status: 415 });

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const name = `${Date.now().toString(36)}-${randomBytes(5).toString("hex")}.${ext}`;
  await writeFile(path.join(dir, name), buf);
  return NextResponse.json({ url: `/uploads/${name}`, size: buf.length });
}
