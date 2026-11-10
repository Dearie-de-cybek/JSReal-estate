/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { db } from "@/lib/db";
import { quickUpdateProperty } from "../../actions";
import { Submit } from "../../_components";

export const metadata = { title: "Properties" };

export default async function AdminProperties() {
  const list = await db.property.findMany({ orderBy: { updatedAt: "desc" }, include: { images: { take: 1, orderBy: { sortOrder: "asc" } } } });
  return (
    <div className="max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div><p className="eyebrow">Manage</p><h1 className="display h-lg mt-2">Properties</h1></div>
        <Link href="/admin/properties/new" className="btn btn-solid !py-3">New property</Link>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-slate-ink">
        Update price and availability inline. Prices show publicly only when &ldquo;price verified&rdquo; is ticked.
      </p>

      {list.length === 0 ? (
        <p className="mt-10 border border-dashed border-[var(--line)] p-10 text-center text-slate-ink">No properties yet. Add your first verified property.</p>
      ) : (
        <ul className="mt-8 border-t border-[var(--line)]">
          {list.map((p) => (
            <li key={p.id} className="border-b border-[var(--line)] py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Link href={`/admin/properties/${p.id}`} className="group flex items-center gap-4">
                  {p.images[0] ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.images[0].url} alt="" className="h-14 w-20 object-cover" /> : <span className="h-14 w-20 bg-stone" />}
                  <span>
                    <strong className="group-hover:underline">{p.name}</strong>
                    <span className="block text-sm text-slate-ink">{[p.city, p.state].filter(Boolean).join(", ")} · {p.published ? "Published" : "Draft"}{p.featured ? " · Featured" : ""}</span>
                  </span>
                </Link>
                <form action={quickUpdateProperty} className="flex flex-wrap items-end gap-4 text-sm">
                  <input type="hidden" name="id" value={p.id} />
                  <label className="field"><span className="label">Price (₦)</span><input name="price" defaultValue={p.price ?? ""} className="input !w-36 !py-1" inputMode="numeric" /></label>
                  <label className="flex items-center gap-2 pb-2"><input type="checkbox" name="priceVerified" defaultChecked={p.priceVerified} /> Verified</label>
                  <label className="field"><span className="label">Availability</span>
                    <select name="availability" defaultValue={p.availability} className="input !w-36 !py-1">
                      <option value="AVAILABLE">Available</option><option value="RESERVED">Reserved</option><option value="COMING_SOON">Coming soon</option><option value="SOLD">Sold</option>
                    </select>
                  </label>
                  <Submit>Update</Submit>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
