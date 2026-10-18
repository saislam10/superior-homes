import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice, Placeholder, ValueOrPlaceholder } from "@/components/ui/Placeholder";

const path = "/warranty";

export const metadata = buildMetadata({
  title: "Home Warranty",
  description: "Warranty coverage and how to request service for your Superior Homes home.",
  path,
});

const maintenance = [
  "Change HVAC filters on schedule and have the system serviced annually.",
  "Keep gutters and downspouts clear, and keep soil sloped away from the foundation.",
  "Check caulk and grout in kitchens and baths, and reseal as needed.",
  "Watch for minor drywall settling cracks in the first year — they’re common as a new home dries out.",
  "Know where your water shut-off, electrical panel and gas shut-off are located.",
];

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        eyebrow="Warranty"
        title="Standing behind your home."
        intro="What’s covered, how to request service, and how to care for your home in the first years."
        breadcrumbs={[{ name: "Warranty", path }]}
      />

      <Section labelledBy="coverage-heading">
        <DraftNotice title="Owner input needed" className="mb-12 max-w-3xl">
          Warranty terms must come from Superior Homes’ actual warranty documents. Nothing on this page should be
          published as coverage until confirmed.
        </DraftNotice>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="coverage-heading" eyebrow="Coverage" title="What’s covered" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>
                <Placeholder>Workmanship & materials coverage — length and scope</Placeholder>
              </p>
              <p>
                <Placeholder>Systems coverage (plumbing, electrical, HVAC) — length and scope</Placeholder>
              </p>
              <p>
                <Placeholder>Structural coverage — length, scope, and any third-party warranty provider</Placeholder>
              </p>
              <p>
                <Placeholder>Exclusions and manufacturer warranties on appliances and products</Placeholder>
              </p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Service" title="Requesting warranty service" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
              <p>
                <Placeholder>How to submit a request (form, email or portal) and expected response time</Placeholder>
              </p>
              <p>
                For an emergency such as a major water leak, shut off the water first, then contact us at{" "}
                <ValueOrPlaceholder value={siteConfig.contact.phone} label="Phone number" />.
              </p>
              <p>
                Not a homeowner yet? <Link href="/contact" className="text-brand-800 underline underline-offset-4">Contact us</Link>{" "}
                with questions about warranty coverage on a plan or available home.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="maintenance-heading">
        <SectionHeading
          id="maintenance-heading"
          eyebrow="Homeowner care"
          title="Simple habits that protect your home."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {maintenance.map((m) => (
            <li key={m} className="flex gap-3 rounded-card border border-mist-200 bg-canvas p-5 text-ink-muted">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-leaf-500" />
              {m}
            </li>
          ))}
        </ul>
      </Section>

      <ConsultationCta />
    </>
  );
}
