import { requireUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { ActionForm, Field, Submit, UploadField } from "../../_components";
import { saveProfile } from "../../actions";

export const metadata = { title: "Profile & contact" };

export default async function Profile() {
  await requireUser("ADMIN");
  const s = await getSettings();
  const IMG = "image/jpeg,image/png,image/webp,image/avif";
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Site</p>
      <h1 className="display h-lg mt-2">Profile &amp; contact</h1>
      <ActionForm action={saveProfile} className="mt-10 space-y-10">
        <fieldset className="space-y-6">
          <legend className="label mb-4">Imagery</legend>
          <UploadField name="heroImage" label="Hero photograph (wide, landscape, 2400px+)" accept={IMG} initial={s.heroImage} />
          <UploadField name="portraitImage" label="Portrait of Jorbe (4:5 works best)" accept={IMG} initial={s.portraitImage} />
        </fieldset>
        <fieldset className="grid gap-6 sm:grid-cols-2">
          <legend className="label mb-4">Contact</legend>
          <Field label="WhatsApp number" hint="International format, digits only, e.g. 2348012345678"><input name="whatsapp" defaultValue={s.whatsapp} className="input" inputMode="tel" /></Field>
          <Field label="Telephone"><input name="phone" defaultValue={s.phone} className="input" /></Field>
          <Field label="Email"><input name="email" type="email" defaultValue={s.email} className="input" /></Field>
          <Field label="Office city"><input name="officeCity" defaultValue={s.officeCity} className="input" /></Field>
          <Field label="Instagram URL"><input name="instagram" defaultValue={s.instagram} className="input" placeholder="https://…" /></Field>
          <Field label="LinkedIn URL"><input name="linkedin" defaultValue={s.linkedin} className="input" placeholder="https://…" /></Field>
          <Field label="X URL"><input name="x" defaultValue={s.x} className="input" placeholder="https://…" /></Field>
          <Field label="Facebook URL"><input name="facebook" defaultValue={s.facebook} className="input" placeholder="https://…" /></Field>
        </fieldset>
        <fieldset className="space-y-6">
          <legend className="label mb-4">Your words</legend>
          <Field label="Personal story" hint="In your own voice. Only include what is true."><textarea name="story" rows={8} defaultValue={s.story} className="input" /></Field>
          <Field label="Approach"><textarea name="approach" rows={4} defaultValue={s.approach} className="input" /></Field>
          <Field label="Values" hint="One per line."><textarea name="values" rows={4} defaultValue={s.values.split("|").join("\n")} className="input" /></Field>
        </fieldset>
        <Submit>Save profile</Submit>
      </ActionForm>
    </div>
  );
}
