import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" lede="Plain language, short. Review with a legal adviser before launch." />
      <div className="container-x pb-32">
        <div className="prose-journal max-w-2xl">
          <h2>What we collect</h2>
          <p>When you send an enquiry we collect the details you enter: name, email, phone, location, budget range and message. When you subscribe to the newsletter we collect your email address.</p>
          <h2>How we use it</h2>
          <p>Enquiry details are used only to respond to you and to understand how to help. Newsletter emails are used only to send the publication you asked for. We do not sell your data.</p>
          <h2>Analytics</h2>
          <p>If analytics is enabled on this site, it records anonymous usage such as pages visited. It is not used to identify you personally.</p>
          <h2>Retention and your rights</h2>
          <p>We keep enquiries for as long as needed to follow up. You may ask us to access, correct or delete your information at any time by using the contact details on the Contact page. We handle personal data in line with the Nigeria Data Protection Act.</p>
          <h2>Not advice</h2>
          <p>Content on this website is general information and is not legal, tax or financial advice.</p>
          <blockquote>Template text: the owner should have this reviewed and completed (including a named data controller and contact) before publishing.</blockquote>
        </div>
      </div>
    </>
  );
}
