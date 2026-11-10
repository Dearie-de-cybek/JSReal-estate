import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Articles" };

export default async function AdminArticles() {
  const list = await db.article.findMany({ orderBy: { updatedAt: "desc" }, include: { category: true } });
  return (
    <div className="max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div><p className="eyebrow">Publish</p><h1 className="display h-lg mt-2">Articles</h1></div>
        <Link href="/admin/articles/new" className="btn btn-solid !py-3">New article</Link>
      </div>
      <ul className="mt-10 border-t border-[var(--line)]">
        {list.map((a) => (
          <li key={a.id} className="border-b border-[var(--line)]">
            <Link href={`/admin/articles/${a.id}`} className="flex flex-wrap items-baseline justify-between gap-2 py-4 hover:underline">
              <span><strong>{a.title}</strong> <span className="text-sm text-slate-ink">· {a.category?.name ?? "Uncategorised"}</span></span>
              <span className="text-sm text-slate-ink">{a.published ? `Published ${a.publishedAt ? formatDate(a.publishedAt) : ""}` : "Draft"}{a.featured ? " · Featured" : ""}</span>
            </Link>
          </li>
        ))}
        {list.length === 0 && <li className="py-8 text-slate-ink">No articles yet.</li>}
      </ul>
    </div>
  );
}
