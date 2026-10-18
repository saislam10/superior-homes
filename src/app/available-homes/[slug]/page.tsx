import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { availableHomes, formatPrice, getAvailableHome, statusLabels } from "@/data/available-homes";
import { getCommunity } from "@/data/communities";
import { getFloorPlan } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { SpecRow, StatusBadge } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { ButtonLink, TextLink } from "@/components/ui/Button";

/** Keep at least one home in src/data/available-homes.ts (Cache Components requirement). */
export function generateStaticParams() {
  return availableHomes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/available-homes/[slug]">) {
  const { slug } = await params;
  const home = getAvailableHome(slug);
  if (!home) return {};
  return buildMetadata({
    title: `${home.address}, ${home.city}`,
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
  const [, ...gallery] = home.gallery;

  return (
    <>
      <PageHero
        eyebrow={statusLabels[home.status]}
        title={home.address}
        intro={home.city}
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
              About this home
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{home.summary}</p>
            <h3 className="mt-10 text-2xl text-ink">Highlights</h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {home.highlights.map((h, i) => (
                <li key={`${h}-${i}`} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-label="Home details" className="lg:col-span-5">
            <div className="rounded-card border border-mist-200 bg-surface p-6">
              <div className="flex items-center justify-between gap-4">
                <StatusBadge status={home.status} />
                <p className="font-display text-2xl text-ink">{formatPrice(home.price)}</p>
              </div>
              <SpecRow beds={home.beds} baths={home.baths} sqft={home.sqft} className="mt-5" />
              <dl className="divide-y divide-mist-200">
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
              <ButtonLink href="/contact" withArrow className="mt-6 w-full">
                Ask about this home
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      {gallery.length > 0 && (
        <Section tone="white" labelledBy="home-gallery-heading">
          <h2 id="home-gallery-heading" className="text-3xl text-ink">
            Gallery
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {gallery.map((img) => (
              <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <TextLink href="/available-homes" className="mt-12">
            Back to available homes
          </TextLink>
        </Section>
      )}

      <ConsultationCta title="Interested in this home?" />
    </>
  );
}
