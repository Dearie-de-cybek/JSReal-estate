import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { ConfirmButton, Submit } from "../../_components";
import { deleteEnquiry, updateEnquiry } from "../../actions";

export const metadata = { title: "Enquiries" };

export default async function Enquiries({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const me = await getSession();
  const list = await db.enquiry.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: { property: true },
    take: 200,
  });
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Inbox</p>
      <h1 className="display h-lg mt-2">Enquiries</h1>
      <nav className="mt-6 flex gap-4 text-sm" aria-label="Filter">
        {[["", "All"], ["NEW", "New"], ["CONTACTED", "Contacted"], ["CLOSED", "Closed"]].map(([v, l]) => (
          <a key={v} href={v ? `?status=${v}` : "?"} aria-current={(status ?? "") === v} className="underline-hover aria-[current=true]:font-bold">{l}</a>
        ))}
      </nav>

      <ul className="mt-8 space-y-6">
        {list.map((e) => {
          const wa = e.phone.replace(/\D/g, "");
          return (
            <li key={e.id} className="border border-[var(--line)] p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-2xl">{e.name} <span className="text-base text-slate-ink">· {e.type}</span></h2>
                <span className="text-sm text-slate-ink">{formatDate(e.createdAt)}</span>
              </div>
              <p className="mt-1 text-sm">
                <a className="underline" href={`mailto:${e.email}`}>{e.email}</a>
                {e.phone && <> · <a className="underline" href={`tel:${e.phone}`}>{e.phone}</a>{wa && <> · <a className="underline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${wa}`}>WhatsApp</a></>}</>}
              </p>
              <p className="mt-1 text-sm text-slate-ink">{[e.location && `Location: ${e.location}`, e.budget && `Budget: ${e.budget}`, e.property && `Property: ${e.property.name}`].filter(Boolean).join(" · ")}</p>
              <p className="mt-4 whitespace-pre-line">{e.message}</p>
              <form action={updateEnquiry} className="mt-5 flex flex-wrap items-end gap-4 border-t border-[var(--line)] pt-4">
                <input type="hidden" name="id" value={e.id} />
                <label className="field"><span className="label">Status</span>
                  <select name="status" defaultValue={e.status} className="input !py-1"><option value="NEW">New</option><option value="CONTACTED">Contacted</option><option value="CLOSED">Closed</option></select>
                </label>
                <label className="field min-w-[14rem] flex-1"><span className="label">Private notes</span><input name="notes" defaultValue={e.notes} className="input !py-1" /></label>
                <Submit>Save</Submit>
              </form>
              {me?.role === "ADMIN" && (
                <form action={deleteEnquiry} className="mt-3"><input type="hidden" name="id" value={e.id} /><ConfirmButton message="Delete this enquiry permanently?">Delete</ConfirmButton></form>
              )}
            </li>
          );
        })}
        {list.length === 0 && <li className="text-slate-ink">No enquiries here.</li>}
      </ul>
    </div>
  );
}
