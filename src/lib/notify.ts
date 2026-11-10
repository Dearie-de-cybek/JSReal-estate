import "server-only";

/** Emails the owner about a new enquiry when RESEND_API_KEY + NOTIFY_EMAIL are configured. Never throws. */
export async function notifyOwner(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "Jorbe Samuel <onboarding@resend.dev>",
        to,
        subject,
        text,
      }),
    });
  } catch {}
}
