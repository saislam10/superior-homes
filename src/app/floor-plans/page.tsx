import { buildMetadata } from "@/lib/seo";
import { floorPlans, realFloorPlans } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { FloorPlanCard } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

const path = "/floor-plans";

export const metadata = buildMetadata({
  title: "Floor Plans",
  description:
    "Browse Superior Homes floor plans for Wichita-area homes — starting points you can customize with your own layout changes, finishes and features.",
  path,
  image: floorPlans[0].image,
});

export default function FloorPlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Floor plans"
        title="Floor plans you can make your own."
        intro="Every plan here is a starting point. Move walls, add a basement or storm shelter, rework the kitchen, change the exterior — we’ll help you adapt the plan to your household, your lot and your budget."
        breadcrumbs={[{ name: "Floor Plans", path }]}
      />

      <Section labelledBy="plans-list-heading">
        <h2 id="plans-list-heading" className="sr-only">
          All floor plans
        </h2>
        {realFloorPlans.length === 0 && (
          <DraftNotice title="Floor plans coming soon" className="mb-12 max-w-3xl">
            The plans below are illustrative samples with example specifications and stock photos. Superior Homes’
            actual plan library will replace them once provided.
          </DraftNotice>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {floorPlans.map((plan) => (
            <FloorPlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <TextLink href="/custom-homes">Prefer to start from scratch?</TextLink>
          <TextLink href="/specs-and-finishes">See specs &amp; finishes</TextLink>
        </div>
      </Section>

      <ConsultationCta
        title="Found a plan that’s close?"
        body="Tell us which plan caught your eye and what you’d change. We’ll talk through what’s possible on your lot and within your budget."
      />
    </>
  );
}
