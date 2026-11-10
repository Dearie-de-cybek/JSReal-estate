import { cache } from "react";
import { db } from "./db";

export const SETTING_DEFAULTS = {
  heroImage: "",
  portraitImage: "",
  phone: "",
  whatsapp: "", // digits only, international, e.g. 234XXXXXXXXXX
  email: "",
  instagram: "",
  linkedin: "",
  x: "",
  facebook: "",
  officeCity: "",
  story:
    "[Placeholder — Jorbe, replace this with your own story: how you came into real estate, what you saw that others missed, and why you do this work.]",
  approach:
    "I start with questions, not listings. What is the money for? How long can it stay invested? What would make this decision a bad one? Only then do we look at property.",
  values:
    "Transparency over persuasion.|Documents before deposits.|Long-term value over quick wins.|Honest answers, including “not this one”.",
} as const;

export type SettingKey = keyof typeof SETTING_DEFAULTS;
export type Settings = Record<SettingKey, string>;

export const getSettings = cache(async (): Promise<Settings> => {
  const rows = await db.setting.findMany();
  const out: Record<string, string> = { ...SETTING_DEFAULTS };
  for (const r of rows) if (r.key in out && r.value !== "") out[r.key] = r.value;
  return out as Settings;
});

export function waLink(s: Settings, text: string) {
  const n = s.whatsapp.replace(/\D/g, "");
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : `/contact?message=${encodeURIComponent(text)}`;
}
