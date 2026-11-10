import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer s={s} />
    </>
  );
}
