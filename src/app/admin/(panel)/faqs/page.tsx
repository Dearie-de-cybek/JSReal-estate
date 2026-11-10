import { db } from "@/lib/db";
import { ActionForm, ConfirmButton, Field, Submit } from "../../_components";
import { deleteFaq, saveFaq } from "../../actions";

export const metadata = { title: "FAQs" };

export default async function Faqs() {
  const list = await db.faq.findMany({ orderBy: [{ topic: "asc" }, { sortOrder: "asc" }] });
  return (
    <div className="max-w-4xl">
      <p className="eyebrow">Publish</p>
      <h1 className="display h-lg mt-2">FAQs</h1>

      <ActionForm action={saveFaq} className="mt-10 space-y-6 border border-[var(--line)] p-6">
        <h2 className="label">Add a question</h2>
        <Field label="Question"><input name="question" required className="input" /></Field>
        <Field label="Answer"><textarea name="answer" rows={3} required className="input" /></Field>
        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="Topic"><input name="topic" defaultValue="General" className="input" /></Field>
          <Field label="Order"><input name="sortOrder" type="number" defaultValue={0} className="input" /></Field>
          <label className="flex items-end gap-2 pb-2"><input type="checkbox" name="published" defaultChecked /> Published</label>
        </div>
        <Submit>Add FAQ</Submit>
      </ActionForm>

      <div className="mt-10 space-y-4">
        {list.map((f) => (
          <details key={f.id} className="border border-[var(--line)] p-4">
            <summary className="cursor-pointer"><strong>{f.question}</strong> <span className="text-sm text-slate-ink">· {f.topic}{f.published ? "" : " · hidden"}</span></summary>
            <ActionForm action={saveFaq} className="mt-6 space-y-4">
              <input type="hidden" name="id" value={f.id} />
              <Field label="Question"><input name="question" defaultValue={f.question} required className="input" /></Field>
              <Field label="Answer"><textarea name="answer" rows={3} defaultValue={f.answer} required className="input" /></Field>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Topic"><input name="topic" defaultValue={f.topic} className="input" /></Field>
                <Field label="Order"><input name="sortOrder" type="number" defaultValue={f.sortOrder} className="input" /></Field>
                <label className="flex items-end gap-2 pb-2"><input type="checkbox" name="published" defaultChecked={f.published} /> Published</label>
              </div>
              <Submit>Save</Submit>
            </ActionForm>
            <form action={deleteFaq} className="mt-4"><input type="hidden" name="id" value={f.id} /><ConfirmButton message="Delete this FAQ?">Delete</ConfirmButton></form>
          </details>
        ))}
      </div>
    </div>
  );
}
