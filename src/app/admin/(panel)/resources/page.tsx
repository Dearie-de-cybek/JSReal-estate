import { db } from "@/lib/db";
import { ActionForm, ConfirmButton, Field, Submit, UploadField } from "../../_components";
import { deleteResource, saveResource, toggleResource } from "../../actions";

export const metadata = { title: "Downloads" };

export default async function Resources() {
  const list = await db.resource.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Publish</p>
      <h1 className="display h-lg mt-2">Guides &amp; checklists</h1>
      <p className="mt-4 text-sm text-slate-ink">PDFs shown under &ldquo;Downloads&rdquo; in the Journal.</p>

      <ActionForm action={saveResource} className="mt-10 space-y-6 border border-[var(--line)] p-6">
        <h2 className="label">Add a PDF</h2>
        <Field label="Title"><input name="title" required className="input" /></Field>
        <Field label="Description"><input name="description" className="input" /></Field>
        <UploadField name="fileUrl" sizeName="fileSize" label="PDF file (max 25MB)" accept="application/pdf" />
        <Submit>Add resource</Submit>
      </ActionForm>

      <ul className="mt-10 border-t border-[var(--line)]">
        {list.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] py-4">
            <span><strong>{r.title}</strong><span className="block text-sm text-slate-ink">{r.published ? "Visible" : "Hidden"} · {r.downloads} downloads</span></span>
            <span className="flex gap-5">
              <form action={toggleResource}><input type="hidden" name="id" value={r.id} /><button className="text-sm underline">{r.published ? "Hide" : "Show"}</button></form>
              <form action={deleteResource}><input type="hidden" name="id" value={r.id} /><ConfirmButton message="Delete this resource?">Delete</ConfirmButton></form>
            </span>
          </li>
        ))}
        {list.length === 0 && <li className="py-6 text-slate-ink">No downloads yet.</li>}
      </ul>
    </div>
  );
}
