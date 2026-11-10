import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Monogram } from "@/components/brand";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await requireUser();
  const fresh = await db.enquiry.count({ where: { status: "NEW" } });
  const nav = [
    ["/admin", "Desk"],
    ["/admin/enquiries", `Enquiries${fresh ? ` (${fresh})` : ""}`],
    ["/admin/properties", "Properties"],
    ["/admin/articles", "Articles"],
    ["/admin/resources", "Downloads"],
    ["/admin/faqs", "FAQs"],
    ...(me.role === "ADMIN" ? [["/admin/profile", "Profile & contact"], ["/admin/users", "Users"]] : []),
    ["/admin/account", "My password"],
  ];
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="on-dark bg-ink px-6 py-6 text-ivory lg:sticky lg:top-0 lg:h-screen lg:py-8">
        <div className="flex items-center gap-3">
          <Monogram size={36} />
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">Admin</span>
        </div>
        <nav aria-label="Admin" className="mt-6 flex gap-x-5 gap-y-1 overflow-x-auto text-sm lg:mt-10 lg:flex-col lg:gap-1">
          {nav.map(([h, l]) => (
            <Link key={h} href={h} className="shrink-0 py-1.5 text-ivory/80 transition-colors hover:text-gold">{l}</Link>
          ))}
        </nav>
        <div className="mt-6 text-xs text-ivory/60 lg:absolute lg:bottom-8 lg:left-6 lg:mt-0">
          <p>{me.name} · {me.role.toLowerCase()}</p>
          <Link href="/" target="_blank" className="mt-2 block underline">View site ↗</Link>
          <form action={logout}><button className="mt-2 underline">Sign out</button></form>
        </div>
      </aside>
      <main className="min-w-0 p-6 lg:p-12">{children}</main>
    </div>
  );
}
