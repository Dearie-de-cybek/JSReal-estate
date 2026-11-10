import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { ActionForm, ConfirmButton, Field, Submit } from "../../_components";
import { createUser, deleteUser } from "../../actions";

export const metadata = { title: "Users" };

export default async function Users() {
  const me = await requireUser("ADMIN");
  const users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Access</p>
      <h1 className="display h-lg mt-2">Users</h1>
      <p className="mt-4 text-sm text-slate-ink">Admins manage everything. Editors manage content and enquiries, but not profile, users or deletion of enquiries.</p>
      <ul className="mt-8 border-t border-[var(--line)]">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between border-b border-[var(--line)] py-4">
            <span><strong>{u.name}</strong> <span className="text-sm text-slate-ink">· {u.email} · {u.role.toLowerCase()}</span></span>
            {u.id !== me.id && <form action={deleteUser}><input type="hidden" name="id" value={u.id} /><ConfirmButton message={`Remove ${u.name}?`}>Remove</ConfirmButton></form>}
          </li>
        ))}
      </ul>
      <ActionForm action={createUser} className="mt-10 space-y-6 border border-[var(--line)] p-6">
        <h2 className="label">Invite a user</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name"><input name="name" required className="input" /></Field>
          <Field label="Email"><input name="email" type="email" required className="input" /></Field>
          <Field label="Temporary password" hint="12+ characters. They should change it after signing in."><input name="password" type="password" minLength={12} required className="input" autoComplete="new-password" /></Field>
          <Field label="Role"><select name="role" className="input"><option value="EDITOR">Editor</option><option value="ADMIN">Admin</option></select></Field>
        </div>
        <Submit>Create user</Submit>
      </ActionForm>
    </div>
  );
}
