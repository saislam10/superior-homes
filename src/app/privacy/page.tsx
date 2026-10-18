import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/sections/LegalPage";
import { Placeholder, ValueOrPlaceholder } from "@/components/ui/Placeholder";

const path = "/privacy";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects information submitted through this website.`,
  path,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path={path}>
      <p>
        This policy describes how {siteConfig.name} (“we”, “us”) handles information collected through{" "}
        {siteConfig.url.replace(/^https?:\/\//, "")}.
      </p>

      <h2>Information you provide</h2>
      <p>
        When you use our <Link href="/contact">contact form</Link>, you may provide your name, email address, phone
        number, intended building location, approximate budget, desired timeline and project details. We use this
        information to respond to your inquiry and discuss your project.
      </p>

      <h2>How your information is handled</h2>
      <ul>
        <li>
          Form submissions are delivered to <Placeholder>email provider / CRM name</Placeholder> so we can respond.
          This website does not keep its own copy of your submission.
        </li>
        <li>We do not sell your personal information.</li>
        <li>
          <Placeholder>Retention period — how long inquiries are kept and how they are deleted</Placeholder>
        </li>
      </ul>

      <h2>Cookies and analytics</h2>
      <p>
        <Placeholder>
          Describe any analytics or tracking tools in use (for example Google Analytics), what they collect, and how
          visitors can opt out. If none are used, say so.
        </Placeholder>
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete the information you’ve sent us by contacting us at{" "}
        <ValueOrPlaceholder value={siteConfig.contact.email} label="Email address" />.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The “last updated” date above reflects the latest version.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <ValueOrPlaceholder value={siteConfig.contact.email} label="Email address" />.
      </p>
    </LegalPage>
  );
}
