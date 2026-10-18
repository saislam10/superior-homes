import Image from "next/image";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { floorPlans, getFloorPlan } from "@/data/floor-plans";
import { availableHomes, formatPrice } from "@/data/available-homes";
import { getCommunity } from "@/data/communities";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { HomeCard, SpecRow } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { ButtonLink, TextLink } from "@/components/ui/Button";

/** Keep at least one plan in src/data/floor-plans.ts (Cache Components requirement). */
export function generateStaticParams() {
  return floorPlans.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/floor-plans/[slug]">) {
  const { slug } = await params;
  const plan = getFloorPlan(slug);
  if (!plan) return {};
  return buildMetadata({
    title: `${plan.name} Floor Plan`,
    description: plan.summary,
    path: `/floor-plans/${plan.slug}`,
    image: plan.image,
    noIndex: plan.isSample,
  });
}

export default async function FloorPlanPage({ params }: PageProps<"/floor-plans/[slug]">) {
  const { slug } = await params;
  const plan = getFloorPlan(slug);
  if (!plan) notFound();

  const path = `/floor-plans/${plan.slug}`;
  const homesOnPlan = availableHomes.filter((h) => h.floorPlanSlug === plan.slug && h.status !== "sold");
  const [, ...gallery] = plan.gallery;

  return (
    <>
      <PageHero
        eyebrow="Floor plan"
        title={plan.name}
        intro={plan.summary}
        breadcrumbs={[
          { name: "Floor Plans", path: "/floor-plans" },
          { name: plan.name, path },
        ]}
        image={plan.image}
      />

      <Section labelledBy="plan-overview-heading">
        {plan.isSample && (
          <DraftNotice title="Illustrative sample" className="mb-12 max-w-3xl">
            This page demonstrates the floor plan template. Specifications are examples, photos are licensed stock
            images, and the page is hidden from search engines.
          </DraftNotice>
        )}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="plan-overview-heading" className="text-3xl text-ink sm:text-4xl">
              About this plan
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              {plan.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <h3 className="mt-10 flex items-center gap-2 text-2xl text-ink">
              <Sparkles aria-hidden="true" className="size-5 text-leaf-700" />
              Ways to make it yours
            </h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {plan.customizationIdeas.map((idea) => (
                <li key={idea} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-label="Plan details" className="lg:col-span-5">
            <div className="rounded-card border border-mist-200 bg-surface p-6">
              <SpecRow beds={plan.beds} baths={plan.baths} sqft={plan.sqft} className="border-t-0 pt-0" />
              <dl className="divide-y divide-mist-200">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-subtle">Stories</dt>
                  <dd className="text-ink">{plan.stories}</dd>
                </div>
                {plan.garage && (
                  <div className="flex justify-between gap-4 py-3">
                    <dt className="text-ink-subtle">Garage</dt>
                    <dd className="text-ink">{plan.garage}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-ink-subtle">Starting price</dt>
                  <dd className="text-ink">{formatPrice(plan.startingPrice)}</dd>
                </div>
              </dl>
              <ButtonLink href="/contact" withArrow className="mt-6 w-full">
                Customize this plan
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      {gallery.length > 0 && (
        <Section tone="white" labelledBy="plan-gallery-heading">
          <h2 id="plan-gallery-heading" className="text-3xl text-ink">
            Gallery
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {gallery.map((img) => (
              <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-card bg-mist-200">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {homesOnPlan.length > 0 && (
        <Section tone="mist" labelledBy="plan-homes-heading">
          <h2 id="plan-homes-heading" className="text-3xl text-ink">
            Available homes on this plan
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {homesOnPlan.map((home) => (
              <HomeCard
                key={home.slug}
                home={home}
                communityName={home.communitySlug ? getCommunity(home.communitySlug)?.name : undefined}
              />
            ))}
          </div>
          <TextLink href="/floor-plans" className="mt-12">
            Back to all floor plans
          </TextLink>
        </Section>
      )}

      <ConsultationCta
        title={`Make the ${plan.name} yours.`}
        body="Tell us what you’d change and where you’d like to build. We’ll talk through options, trade-offs and budget."
      />
    </>
  );
}
