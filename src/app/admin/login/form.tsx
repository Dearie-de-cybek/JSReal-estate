"use client";

import { ActionForm, Field, Submit } from "../_components";
import { login } from "../actions";

export function LoginForm() {
  return (
    <ActionForm action={login} className="mt-10 space-y-8">
      <Field label="Email">
        <input name="email" type="email" required autoComplete="username" className="input" />
      </Field>
      <Field label="Password">
        <input name="password" type="password" required autoComplete="current-password" className="input" />
      </Field>
      <Submit>Sign in</Submit>
    </ActionForm>
  );
}
