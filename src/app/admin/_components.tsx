"use client";
/* eslint-disable @next/next/no-img-element */

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "./actions";

export function Submit({ children = "Save", danger }: { children?: React.ReactNode; danger?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`btn ${danger ? "btn-line" : "btn-solid"} !py-3`}>
      {pending ? "Saving…" : children}
    </button>
  );
}

export function ActionForm({
  action,
  children,
  className,
}: {
  action: (s: ActionState, fd: FormData) => Promise<ActionState>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, undefined);
  return (
    <form action={formAction} className={className}>
      {children}
      {state?.error && <p role="alert" className="err mt-4">{state.error}</p>}
      {state?.ok && <p role="status" className="mt-4 text-sm font-semibold text-gold-ink">{state.ok}</p>}
    </form>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-ink">{hint}</p>}
    </div>
  );
}

export function ConfirmButton({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <button type="submit" className="text-sm text-[#8f2d1f] underline" onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}>
      {children}
    </button>
  );
}

async function upload(file: File): Promise<{ url: string; size: number }> {
  const fd = new FormData();
  fd.append("file", file);
  const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "Upload failed");
  return j;
}

/** Single-file upload (cover image, PDF, portrait…). Writes the URL into a named hidden input. */
export function UploadField({
  name,
  label,
  accept,
  initial = "",
  sizeName,
}: {
  name: string;
  label: string;
  accept: string;
  initial?: string;
  sizeName?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [size, setSize] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const isImg = /\.(jpe?g|png|webp|avif)$/i.test(url);
  return (
    <div className="field">
      <label>{label}</label>
      <input type="hidden" name={name} value={url} />
      {sizeName && <input type="hidden" name={sizeName} value={size} />}
      <div className="flex flex-wrap items-center gap-4">
        {isImg && /* eslint-disable-next-line @next/next/no-img-element */ <img src={url} alt="" className="h-20 w-28 object-cover" />}
        {url && !isImg && <span className="text-sm">{url}</span>}
        <label className="btn btn-line !m-0 !py-2 cursor-pointer !text-[0.7rem] !normal-case !tracking-normal">
          {busy ? "Uploading…" : url ? "Replace" : "Upload"}
          <input
            type="file"
            accept={accept}
            className="sr-only"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              setErr("");
              try {
                const r = await upload(f);
                setUrl(r.url);
                setSize(r.size);
              } catch (x) {
                setErr(x instanceof Error ? x.message : "Upload failed");
              }
              setBusy(false);
            }}
          />
        </label>
        {url && <button type="button" className="text-sm underline" onClick={() => setUrl("")}>Remove</button>}
      </div>
      {err && <p className="err">{err}</p>}
    </div>
  );
}

export type ImgItem = { url: string; alt: string };

/** Multi-image manager: upload, reorder, alt text. Serialises to a hidden "images" field. */
export function ImagesField({ initial }: { initial: ImgItem[] }) {
  const [items, setItems] = useState<ImgItem[]>(initial);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const move = (i: number, d: number) =>
    setItems((a) => {
      const b = [...a];
      const j = i + d;
      if (j < 0 || j >= b.length) return a;
      [b[i], b[j]] = [b[j], b[i]];
      return b;
    });
  return (
    <div className="field">
      <label>Images</label>
      <input type="hidden" name="images" value={items.map((i) => `${i.url}|${i.alt.replace(/[\r\n|]/g, " ")}`).join("\n")} />
      <ul className="space-y-3">
        {items.map((it, i) => (
          <li key={it.url} className="flex items-center gap-4 border border-[var(--line)] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt="" className="h-16 w-24 shrink-0 object-cover" />
            <input
              className="input !py-1 text-sm"
              placeholder="Describe the image (alt text)"
              value={it.alt}
              onChange={(e) => setItems((a) => a.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)))}
              aria-label={`Alt text for image ${i + 1}`}
            />
            <span className="flex shrink-0 gap-2 text-sm">
              <button type="button" onClick={() => move(i, -1)} aria-label="Move up" disabled={i === 0}>↑</button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Move down" disabled={i === items.length - 1}>↓</button>
              <button type="button" className="text-[#8f2d1f]" onClick={() => setItems((a) => a.filter((_, k) => k !== i))} aria-label="Remove image">✕</button>
            </span>
          </li>
        ))}
      </ul>
      <label className="btn btn-line mt-3 cursor-pointer !py-2 !text-[0.7rem]">
        {busy ? "Uploading…" : "Add images"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="sr-only"
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            setBusy(true);
            setErr("");
            for (const f of files) {
              try {
                const r = await upload(f);
                setItems((a) => [...a, { url: r.url, alt: "" }]);
              } catch (x) {
                setErr(x instanceof Error ? x.message : "Upload failed");
              }
            }
            setBusy(false);
            e.target.value = "";
          }}
        />
      </label>
      <p className="mt-1 text-xs text-slate-ink">First image is the cover. Add alt text for accessibility.</p>
      {err && <p className="err">{err}</p>}
    </div>
  );
}
