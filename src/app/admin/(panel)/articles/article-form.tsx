import Link from "next/link";
import { ActionForm, ConfirmButton, Field, Submit, UploadField } from "../../_components";
import { deleteArticle, saveArticle } from "../../actions";
import { db } from "@/lib/db";
import type { Article } from "@/generated/prisma/client";

export async function ArticleForm({ a, saved }: { a?: Article; saved?: boolean }) {
  const cats = await db.category.findMany({ where: { kind: "ARTICLE" }, orderBy: { sortOrder: "asc" } });
  return (
    <div className="max-w-4xl">
      <p className="eyebrow"><Link href="/admin/articles" className="underline">Articles</Link> /</p>
      <h1 className="display h-lg mt-2">{a ? a.title : "New article"}</h1>
      {saved && <p role="status" className="mt-4 border border-gold bg-gold/15 px-4 py-2 text-sm">Saved.{a?.published && <> <Link href={`/journal/${a.slug}`} target="_blank" className="underline">View live ↗</Link></>}</p>}
      <ActionForm action={saveArticle} className="mt-10 space-y-8">
        <input type="hidden" name="id" defaultValue={a?.id} />
        <Field label="Title"><input name="title" required defaultValue={a?.title} className="input" /></Field>
        <Field label="Excerpt" hint="One or two sentences shown in listings and search results."><textarea name="excerpt" rows={2} defaultValue={a?.excerpt} className="input" maxLength={300} /></Field>
        <div className="grid gap-8 sm:grid-cols-3">
          <Field label="Category"><select name="categoryId" defaultValue={a?.categoryId ?? ""} className="input"><option value="">—</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Author"><input name="author" defaultValue={a?.author ?? "Jorbe Samuel"} className="input" /></Field>
          <Field label="Publication date" hint="Blank = now"><input type="date" name="publishedAt" defaultValue={a?.publishedAt?.toISOString().slice(0, 10)} className="input" /></Field>
        </div>
        <Field label="Body" hint="Markdown: ## headings (they build the table of contents), **bold**, - lists, > notes, [links](https://…)">
          <textarea name="body" rows={24} defaultValue={a?.body} className="input font-mono text-sm leading-6" />
        </Field>
        <div className="grid gap-8 sm:grid-cols-2">
          <UploadField name="coverUrl" label="Cover image (optional)" accept="image/jpeg,image/png,image/webp,image/avif" initial={a?.coverUrl} />
          <Field label="Cover alt text"><input name="coverAlt" defaultValue={a?.coverAlt} className="input" /></Field>
        </div>
        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={a?.published} /> Published</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={a?.featured} /> Featured in Journal</label>
        </div>
        <Submit>Save article</Submit>
      </ActionForm>
      {a && (
        <form action={deleteArticle} className="mt-16 border-t border-[var(--line)] pt-6">
          <input type="hidden" name="id" value={a.id} />
          <ConfirmButton message="Delete this article permanently?">Delete article</ConfirmButton>
        </form>
      )}
    </div>
  );
}
