import { ActionForm, Field, Submit } from "../../_components";
import { changePassword } from "../../actions";

export const metadata = { title: "My password" };

export default function Account() {
  return (
    <div className="max-w-md">
      <p className="eyebrow">Security</p>
      <h1 className="display h-lg mt-2">Change password</h1>
      <ActionForm action={changePassword} className="mt-10 space-y-6">
        <Field label="Current password"><input name="current" type="password" required className="input" autoComplete="current-password" /></Field>
        <Field label="New password" hint="At least 12 characters."><input name="next" type="password" minLength={12} required className="input" autoComplete="new-password" /></Field>
        <Submit>Update password</Submit>
      </ActionForm>
    </div>
  );
}
