import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function Desk() {
  const [enq, newCount, props, drafts, arts, subs] = await Promise.all([
    db.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { property: true } }),
    db.enquiry.count({ where: { status: "NEW" } }),
    db.property.count({ where: { published: true } }),
    db.property.count({ where: { published: false } }),
    db.article.count({ where: { published: true } }),
    db.subscriber.count(),
  ]);
  const stats: [string, number][] = [["New enquiries", newCount], ["Live properties", props], ["Draft properties", drafts], ["Published articles", arts], ["Subscribers", subs]];
  return (
    <div className="max-w-5xl">
      <p className="eyebrow">The desk</p>
      <h1 className="display h-lg mt-3">Good to see you.</h1>

      <dl className="mt-10 grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-5">
        {stats.map(([k, v]) => (
          <div key={k} className="bg-ivory p-4"><dt className="label !mb-1">{k}</dt><dd className="font-serif text-4xl">{v}</dd></div>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/admin/properties/new" className="btn btn-solid !py-3">New property</Link>
        <Link href="/admin/articles/new" className="btn btn-line !py-3">New article</Link>
        <Link href="/admin/resources" className="btn btn-line !py-3">Upload a guide</Link>
      </div>

      <h2 className="label mt-14">Latest enquiries</h2>
      {enq.length === 0 ? <p className="text-slate-ink">None yet. They will appear here the moment someone writes.</p> : (
        <ul className="border-t border-[var(--line)]">
          {enq.map((e) => (
            <li key={e.id} className="border-b border-[var(--line)] py-4">
              <Link href="/admin/enquiries" className="flex flex-wrap justify-between gap-2">
                <span><strong>{e.name}</strong> · {e.type}{e.property ? ` · ${e.property.name}` : ""}</span>
                <span className="text-sm text-slate-ink">{e.status === "NEW" ? "● New · " : ""}{formatDate(e.createdAt)}</span>
              </Link>
              <p className="mt-1 line-clamp-1 text-sm text-slate-ink">{e.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
