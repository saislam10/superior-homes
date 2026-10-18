import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { LegalPage } from "@/components/sections/LegalPage";
import { Placeholder, ValueOrPlaceholder } from "@/components/ui/Placeholder";

const path = "/terms";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${siteConfig.name} website.`,
  path,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path={path}>
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2>Informational content only</h2>
      <p>
        Content on this website — including descriptions of our process, cost factors and example projects — is
        provided for general information. It is not an offer, estimate, quote or contract. Any construction work is
        governed solely by a separate written agreement.
      </p>

      <h2>Images and examples</h2>
      <p>
        Some images on this site are licensed stock photography used for illustration and are labeled as such. They
        do not depict homes built by {siteConfig.name} unless stated otherwise.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Site content, branding and design are owned by {siteConfig.name} or its licensors and may not be reused
        without permission.
      </p>

      <h2>Links to other sites</h2>
      <p>We are not responsible for the content or practices of websites we link to.</p>

      <h2>Limitation of liability</h2>
      <p>
        <Placeholder>Limitation of liability and disclaimer language — to be provided by legal counsel</Placeholder>
      </p>

      <h2>Governing law</h2>
      <p>
        <Placeholder>Governing law and venue — to be confirmed by legal counsel</Placeholder>
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <ValueOrPlaceholder value={siteConfig.contact.email} label="Email address" />. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
