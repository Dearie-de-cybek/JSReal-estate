import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";

const COOKIE = "js_session";
const secret = () => {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ chars)");
  return new TextEncoder().encode(s);
};

export type Session = { id: string; role: "ADMIN" | "EDITOR"; name: string; email: string };

export async function createSession(u: Session) {
  const token = await new SignJWT({ id: u.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const user = await db.user.findUnique({ where: { id: String(payload.id) } });
    if (!user) return null;
    return { id: user.id, role: user.role as Session["role"], name: user.name, email: user.email };
  } catch {
    return null;
  }
}

export async function requireUser(role?: "ADMIN") {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  if (role === "ADMIN" && s.role !== "ADMIN") redirect("/admin");
  return s;
}
