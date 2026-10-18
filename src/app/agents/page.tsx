import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DraftNotice, Placeholder, ValueOrPlaceholder } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

const path = "/agents";

export const metadata = buildMetadata({
  title: "For Real Estate Agents",
  description:
    "Information for real estate agents bringing clients to Superior Homes — available homes, floor plans and how to work with us.",
  path,
});

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="For agents"
        title="Bringing a client to Superior Homes?"
        intro="Whether your buyer wants a move-in-ready home or a fully custom build, we’d like to work with you."
        breadcrumbs={[{ name: "For Agents", path }]}
      />

      <Section labelledBy="agents-heading">
        <DraftNotice title="Owner input needed" className="mb-12 max-w-3xl">
          Agent policies (registration, compensation and showing procedures) must be provided by Superior Homes.
        </DraftNotice>
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading id="agents-heading" eyebrow="Working together" title="How it works" />
          </div>
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="text-2xl text-ink">Client registration</h3>
              <p className="mt-2 text-lg text-ink-muted">
                <Placeholder>When and how agents should register a client</Placeholder>
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-ink">Compensation</h3>
              <p className="mt-2 text-lg text-ink-muted">
                <Placeholder>Buyer-agent compensation policy, if any</Placeholder>
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-ink">Showings</h3>
              <p className="mt-2 text-lg text-ink-muted">
                <Placeholder>How to schedule showings of available homes</Placeholder>
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-ink">Contact</h3>
              <p className="mt-2 text-lg text-ink-muted">
                Phone: <ValueOrPlaceholder value={siteConfig.contact.phone} label="Phone number" /> · Email:{" "}
                <ValueOrPlaceholder value={siteConfig.contact.email} label="Email address" />
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-10">
              <TextLink href="/available-homes">Current available homes</TextLink>
              <TextLink href="/floor-plans">Floor plans</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <ConsultationCta />
    </>
  );
}
