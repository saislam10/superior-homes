import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { availableHomes, formatPrice, getAvailableHome, getStatusLabel, propertyInquiryHref } from "@/data/available-homes";
import { getCommunity } from "@/data/communities";
import { getFloorPlan } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { PropertySpecs, StatusBadge } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { PhotoSlideshow } from "@/components/ui/PhotoSlideshow";

/** Keep at least one home in src/data/available-homes.ts (Cache Components requirement). */
export function generateStaticParams() {
  return availableHomes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/available-homes/[slug]">) {
  const { slug } = await params;
  const home = getAvailableHome(slug);
  if (!home) return {};
  return buildMetadata({
    title: home.city ? `${home.address}, ${home.city}` : `${home.address} | Superior Homes`,
    description: home.summary,
    path: `/available-homes/${home.slug}`,
    image: home.image,
    noIndex: home.isSample || home.status === "sold",
  });
}

export default async function AvailableHomePage({ params }: PageProps<"/available-homes/[slug]">) {
  const { slug } = await params;
  const home = getAvailableHome(slug);
  if (!home) notFound();

  const path = `/available-homes/${home.slug}`;
  const community = home.communitySlug ? getCommunity(home.communitySlug) : undefined;
  const plan = home.floorPlanSlug ? getFloorPlan(home.floorPlanSlug) : undefined;
  const gallery = home.gallery;

  return (
    <>
      <PageHero
        eyebrow={getStatusLabel(home.status, home.listingType)}
        title={home.address}
        intro={home.city ?? "Location not provided in the public MLS preview."}
        breadcrumbs={[
          { name: "Available Homes", path: "/available-homes" },
          { name: home.address, path },
        ]}
        image={home.image}
      />

      <Section labelledBy="home-overview-heading">
        {home.isSample && (
          <DraftNotice title="Illustrative sample — not a real listing" className="mb-12 max-w-3xl">
            This page demonstrates the listing template. Details are examples, photos are licensed stock images, and
            the page is hidden from search engines.
          </DraftNotice>
        )}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="home-overview-heading" className="text-3xl text-ink sm:text-4xl">
              About this property
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{home.description ?? home.summary}</p>
            {home.sourceCheckedAt && (
              <p className="mt-5 text-sm text-ink-subtle">Source: South Central Kansas MLS, checked {home.sourceCheckedAt}. Prices and availability can change; contact us to confirm current details.</p>
            )}
            <h3 className="mt-10 text-2xl text-ink">Highlights</h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {home.highlights.map((h, i) => (
                <li key={`${h}-${i}`} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                  {h}
                </li>
              ))}
            </ul>
            {home.details && home.details.length > 0 && (
              <details className="mt-10 rounded-card border border-mist-200 p-5">
                <summary className="cursor-pointer text-xl text-ink">All MLS property details</summary>
                <dl className="mt-5 divide-y divide-mist-200">
                  {home.details.map((detail, index) => (
                    <div key={`${detail.label}-${index}`} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-4">
                      <dt className="text-sm text-ink-subtle">{detail.label}</dt>
                      <dd className="min-w-0 break-words text-sm text-ink">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            )}
          </div>
          <aside aria-label="Property details" className="lg:col-span-5">
            <div className="rounded-card border border-mist-200 bg-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <StatusBadge status={home.status} listingType={home.listingType} />
                <p className="font-display text-2xl text-ink">
                  {home.listingType === "rent"
                    ? home.monthlyRent == null
                      ? "Contact for rent"
                      : `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(home.monthlyRent)}/mo`
                    : formatPrice(home.price)}
                </p>
              </div>
              <PropertySpecs home={home} className="mt-5" />
              <dl className="divide-y divide-mist-200">
                {home.propertyType && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">Property type</dt><dd className="text-right text-ink">{home.propertyType}</dd></div>}
                {home.sourceStatus && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">MLS status</dt><dd className="text-ink">{home.sourceStatus}</dd></div>}
                {home.mlsNumber && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">MLS number</dt><dd className="text-ink">{home.mlsNumber}</dd></div>}
                {home.listingType === "rent" && (
                  <>
                    {home.securityDeposit != null && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">Security deposit</dt><dd className="text-ink">{formatPrice(home.securityDeposit)}</dd></div>}
                    {home.leaseTerm && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">Lease term</dt><dd className="text-ink">{home.leaseTerm}</dd></div>}
                    {home.applicationFee != null && <div className="flex justify-between gap-4 py-3"><dt className="text-ink-subtle">Application fee</dt><dd className="text-ink">{formatPrice(home.applicationFee)}</dd></div>}
                    {home.petPolicy && <div className="py-3"><dt className="text-ink-subtle">Pet policy</dt><dd className="mt-1 text-ink">{home.petPolicy}</dd></div>}
                    {home.utilitiesPolicy && <div className="py-3"><dt className="text-ink-subtle">Utilities</dt><dd className="mt-1 text-ink">{home.utilitiesPolicy}</dd></div>}
                  </>
                )}
                {community && (
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-ink-subtle">Community</dt>
                    <dd>
                      <Link href={`/communities/${community.slug}`} className="text-brand-800 underline underline-offset-4">
                        {community.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {plan && (
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-ink-subtle">Floor plan</dt>
                    <dd>
                      <Link href={`/floor-plans/${plan.slug}`} className="text-brand-800 underline underline-offset-4">
                        {plan.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {home.estimatedCompletion && (
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-ink-subtle">Estimated completion</dt>
                    <dd className="text-ink">{home.estimatedCompletion}</dd>
                  </div>
                )}
              </dl>
              <ButtonLink href={propertyInquiryHref(home)} withArrow className="mt-6 w-full">
                Ask about this property
              </ButtonLink>
              {home.sourceUrl && (
                <a href={home.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 block text-center text-sm text-brand-800 underline underline-offset-4">
                  View source MLS listing
                </a>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {gallery.length > 0 && (
        <Section tone="white" labelledBy="home-gallery-heading">
          <h2 id="home-gallery-heading" className="text-3xl text-ink">
            Gallery
          </h2>
          <div className="mt-10"><PhotoSlideshow images={gallery} label={`${home.address} gallery`} /></div>
          <TextLink href="/available-homes" className="mt-12">
            Back to available homes
          </TextLink>
        </Section>
      )}

      <ConsultationCta title="Interested in this property?" body="Ask a question or arrange a viewing. We’ll include the property’s address and MLS number with your inquiry." contactHref={propertyInquiryHref(home)} inquirySubject={`Property inquiry — MLS #${home.mlsNumber} — ${home.address}`} />
    </>
  );
}
