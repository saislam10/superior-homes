import { Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { DraftNotice, Placeholder } from "@/components/ui/Placeholder";
import { previousSiteReview } from "@/data/previous-site-review";
import { ContactForm } from "./ContactForm";
import { Suspense } from "react";
import { availableHomes } from "@/data/available-homes";

const path = "/contact";

export const metadata = buildMetadata({
  title: "Contact Us About Your Custom Home",
  description:
    "Planning a custom home in the Wichita area? Tell us about your plans, location, budget and timeline, and we’ll follow up to talk it through.",
  path,
});

const expectations = [
  "We review every inquiry personally.",
  "We’ll follow up to arrange a conversation about your plans.",
  "There’s no cost or obligation to talk.",
];

async function InquiryForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const query = await searchParams;
  const mls = typeof query.mls === "string" ? query.mls : "";
  const property = availableHomes.find(home => home.mlsNumber === mls && !home.isSample && home.status !== "sold");
  const contact = siteConfig.contact;
  return <ContactForm key={property?.mlsNumber ?? "general"} direct={{ phone: contact.phone, email: contact.email }} property={property?.mlsNumber ? { mlsNumber: property.mlsNumber, address: property.address, city: property.city } : undefined} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your home."
        intro="Whether you have a lot and a set of plans or just the beginnings of an idea, we’d like to hear about it. Share a few details and we’ll be in touch."
        breadcrumbs={[{ name: "Contact", path }]}
      />

      <Section tone="white" labelledBy="form-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-2xl text-ink">What happens next</h2>
            <ul className="mt-5 space-y-3 text-ink-muted">
              {expectations.map((e) => (
                <li key={e} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-700" />
                  {e}
                </li>
              ))}
            </ul>
            <DraftNotice title="Owner to confirm" className="mt-6">
              Confirm the follow-up commitments above (and add a typical response time if you can commit to one).
            </DraftNotice>

            <h2 className="mt-12 text-2xl text-ink">Reach us directly</h2>
            <ul className="mt-5 space-y-4 text-ink-muted">
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" />
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-ink">
                    {contact.phone}
                  </a>
                ) : (
                  <Placeholder>Phone — to be provided</Placeholder>
                )}
              </li>
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" />
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="break-all hover:text-ink">
                    {contact.email}
                  </a>
                ) : (
                  <Placeholder>Email — to be provided</Placeholder>
                )}
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700" />
                <span>
                  Serving {siteConfig.primaryMarket.city}, {siteConfig.primaryMarket.regionCode} and surrounding
                  communities
                </span>
              </li>
            </ul>
            <DraftNotice title="Former website details — owner to confirm" className="mt-6">
              <ul className="list-disc space-y-1 pl-5">
                <li>Previously listed office: {previousSiteReview.contact.officeAddress}</li>
                <li>Previously listed hours: {previousSiteReview.contact.hours}</li>
              </ul>
            </DraftNotice>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-card border border-mist-200 bg-canvas p-6 sm:p-10">
              <h2 id="form-heading" className="text-3xl text-ink">
                Tell us about your project
              </h2>
              <p className="mt-2 text-ink-muted">It takes about two minutes.</p>
              <div className="relative mt-8">
                <Suspense fallback={<p role="status" className="text-ink-muted">Loading inquiry form…</p>}>
                  <InquiryForm searchParams={searchParams} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
