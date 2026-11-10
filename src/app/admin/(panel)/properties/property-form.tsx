import Link from "next/link";
import { ActionForm, ConfirmButton, Field, ImagesField, Submit } from "../../_components";
import { deleteProperty, saveProperty } from "../../actions";
import { db } from "@/lib/db";
import { parseList } from "@/lib/utils";
import type { PropertyFull } from "@/lib/queries";

export async function PropertyForm({ p, saved }: { p?: PropertyFull; saved?: boolean }) {
  const cats = await db.category.findMany({ where: { kind: "PROPERTY" }, orderBy: { sortOrder: "asc" } });
  return (
    <div className="max-w-4xl">
      <p className="eyebrow"><Link href="/admin/properties" className="underline">Properties</Link> /</p>
      <h1 className="display h-lg mt-2">{p ? p.name : "New property"}</h1>
      {saved && <p role="status" className="mt-4 border border-gold bg-gold/15 px-4 py-2 text-sm">Saved.{p?.published && <> <Link href={`/properties/${p.slug}`} target="_blank" className="underline">View live ↗</Link></>}</p>}

      <ActionForm action={saveProperty} className="mt-10 space-y-10">
        <input type="hidden" name="id" defaultValue={p?.id} />

        <fieldset className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <legend className="label mb-4">Essentials</legend>
          <Field label="Name"><input name="name" required defaultValue={p?.name} className="input" /></Field>
          <Field label="URL slug" hint="Leave blank to generate from the name."><input name="slug" defaultValue={p?.slug} className="input" /></Field>
          <div className="sm:col-span-2"><Field label="One-line summary"><input name="summary" defaultValue={p?.summary} className="input" maxLength={200} /></Field></div>
          <Field label="City / area"><input name="city" defaultValue={p?.city} className="input" /></Field>
          <Field label="State"><input name="state" defaultValue={p?.state} className="input" /></Field>
          <div className="sm:col-span-2"><Field label="Street / estate (optional)" hint="Only add what the owner is happy to publish."><input name="address" defaultValue={p?.address} className="input" /></Field></div>
          <Field label="Category">
            <select name="categoryId" defaultValue={p?.categoryId ?? ""} className="input"><option value="">—</option>{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
          </Field>
          <Field label="Property type" hint="e.g. Duplex, Apartment, Residential land"><input name="propertyType" defaultValue={p?.propertyType} className="input" /></Field>
          <Field label="Purpose">
            <select name="purpose" defaultValue={p?.purpose ?? "RESIDENTIAL"} className="input"><option value="RESIDENTIAL">Residential</option><option value="INVESTMENT">Investment</option></select>
          </Field>
          <Field label="Availability">
            <select name="availability" defaultValue={p?.availability ?? "AVAILABLE"} className="input"><option value="AVAILABLE">Available</option><option value="RESERVED">Reserved</option><option value="COMING_SOON">Coming soon</option><option value="SOLD">Sold</option></select>
          </Field>
        </fieldset>

        <fieldset className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
          <legend className="label mb-4">Price &amp; size</legend>
          <Field label="Price (₦)"><input name="price" inputMode="numeric" defaultValue={p?.price ?? ""} className="input" /></Field>
          <div className="flex items-end pb-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="priceVerified" defaultChecked={p?.priceVerified} /> Price verified (show publicly)</label></div>
          <Field label="Price note" hint="e.g. per plot, negotiable"><input name="priceNote" defaultValue={p?.priceNote} className="input" /></Field>
          <Field label="Bedrooms"><input name="bedrooms" inputMode="numeric" defaultValue={p?.bedrooms ?? ""} className="input" /></Field>
          <Field label="Bathrooms"><input name="bathrooms" inputMode="numeric" defaultValue={p?.bathrooms ?? ""} className="input" /></Field>
          <Field label="Size (m²)"><input name="sizeSqm" inputMode="decimal" defaultValue={p?.sizeSqm ?? ""} className="input" /></Field>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="label mb-4">Description</legend>
          <Field label="Description"><textarea name="description" rows={6} defaultValue={p?.description} className="input" /></Field>
          <Field label="Key features" hint="One per line."><textarea name="features" rows={5} defaultValue={p ? parseList(p.features).join("\n") : ""} className="input" /></Field>
        </fieldset>

        <fieldset className="space-y-6">
          <legend className="label mb-4">Documentation</legend>
          <p className="text-sm text-slate-ink">Only mark &ldquo;Verified&rdquo; once the documents have actually been confirmed by an independent lawyer. The site never implies verification otherwise.</p>
          <Field label="Status">
            <select name="documentationStatus" defaultValue={p?.documentationStatus ?? "UNVERIFIED"} className="input">
              <option value="UNVERIFIED">Not yet independently verified</option><option value="IN_REVIEW">Under review</option><option value="VERIFIED">Verified</option>
            </select>
          </Field>
          <Field label="Documentation notes" hint="e.g. which documents exist, who verified them, and when."><textarea name="documentationNotes" rows={3} defaultValue={p?.documentationNotes} className="input" /></Field>
        </fieldset>

        <fieldset>
          <legend className="label mb-4">Photography</legend>
          <ImagesField initial={p?.images.map((i) => ({ url: i.url, alt: i.alt })) ?? []} />
        </fieldset>

        <fieldset className="flex flex-wrap gap-8">
          <legend className="label mb-4">Visibility</legend>
          <label className="flex items-center gap-2"><input type="checkbox" name="published" defaultChecked={p?.published} /> Published</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={p?.featured} /> Featured on homepage</label>
        </fieldset>

        <Submit>Save property</Submit>
      </ActionForm>

      {p && (
        <form action={deleteProperty} className="mt-16 border-t border-[var(--line)] pt-6">
          <input type="hidden" name="id" value={p.id} />
          <ConfirmButton message="Delete this property permanently? This cannot be undone.">Delete property</ConfirmButton>
        </form>
      )}
    </div>
  );
}
