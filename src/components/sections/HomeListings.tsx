import { floorPlans, getFloorPlan } from "@/data/floor-plans";
import { availableHomes, realAvailableHomes } from "@/data/available-homes";
import { communities, getCommunity } from "@/data/communities";
import { getStats } from "@/data/company-stats";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DraftNotice, Placeholder } from "@/components/ui/Placeholder";
import { CommunityCard, FloorPlanCard, HomeCard } from "@/components/ui/Listing";
import Link from "next/link";

/** Stats bar under the hero. Unconfirmed values render as placeholders. */
export function StatsBar() {
  const stats = getStats();
  return (
    <section aria-label="Company at a glance" className="border-b border-mist-200 bg-surface">
      <Container>
        <dl className="grid grid-cols-2 gap-y-8 py-10 sm:py-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <dt className="order-2 mt-2 text-sm text-ink-muted">
                {stat.href ? (
                  <Link href={stat.href} className="underline decoration-mist-300 underline-offset-4 hover:text-ink">
                    {stat.label}
                  </Link>
                ) : (
                  stat.label
                )}
              </dt>
              <dd className="order-1 font-display text-4xl text-brand-800 sm:text-5xl">
                {stat.value ?? <Placeholder className="font-sans text-sm">#</Placeholder>}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function SamplesNotice({ what }: { what: string }) {
  return (
    <DraftNotice title="Illustrative samples" className="mt-8">
      The {what} below are sample entries with stock photos and example details. They will be replaced with Superior
      Homes’ real {what} once provided.
    </DraftNotice>
  );
}

export function FloorPlansRow() {
  const plans = floorPlans.slice(0, 3);
  return (
    <Section tone="mist" labelledBy="plans-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="plans-heading"
          eyebrow="Floor plans"
          title="Start with a plan. Make it yours."
          intro="Our plans are starting points, not limits. Pick one that’s close, then change the layout, finishes and features to fit the way you live."
        />
        <TextLink href="/floor-plans" className="shrink-0">
          View all floor plans
        </TextLink>
      </div>
      {plans.some((p) => p.isSample) && <SamplesNotice what="floor plans" />}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <FloorPlanCard key={plan.slug} plan={plan} />
        ))}
      </div>
    </Section>
  );
}

export function AvailableHomesRow() {
  const homes = availableHomes.filter((h) => h.status !== "sold").slice(0, 3);
  const forSale = realAvailableHomes.filter((h) => h.listingType === "sale").length;

  return (
    <Section tone="white" labelledBy="homes-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="homes-heading"
          eyebrow="Available homes & properties"
          title="Explore what’s available."
          intro="Browse homes, multi-family properties and land for sale. See photos, prices and listing details to find your next step."
        />
        <TextLink href="/available-homes" className="shrink-0">
          View all available homes
        </TextLink>
      </div>
      {homes.some((h) => h.isSample) && <SamplesNotice what="homes" />}
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {homes.map((home) => (
          <HomeCard
            key={home.slug}
            home={home}
            communityName={home.communitySlug ? getCommunity(home.communitySlug)?.name : undefined}
            planName={home.floorPlanSlug ? getFloorPlan(home.floorPlanSlug)?.name : undefined}
          />
        ))}
      </div>

      {realAvailableHomes.length > 0 && (
        <div className="mt-14 rounded-card bg-brand-900 px-6 py-10 text-center text-white sm:px-10">
          <h3 className="text-3xl">Looking for something specific?</h3>
          <dl className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              { label: "Listings", value: realAvailableHomes.length },
              { label: "For sale", value: forSale },
              { label: "Floor plans", value: floorPlans.filter((p) => !p.isSample).length },
            ].map((s) => (
              <div key={s.label} className="flex flex-col rounded-card bg-white/10 px-3 py-4">
                <dt className="order-2 text-xs text-white/80">{s.label}</dt>
                <dd className="order-1 font-display text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/available-homes" variant="light" className="mt-8">
            Find your home
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}

export function CommunitiesRow() {
  const list = communities.slice(0, 4);
  return (
    <Section tone="canvas" labelledBy="communities-heading">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="communities-heading"
          eyebrow="Communities"
          title="Where you can build with us."
          intro="From neighborhoods in Wichita to acreage outside town, each location has its own character — and its own considerations."
        />
        <TextLink href="/communities" className="shrink-0">
          Compare all communities
        </TextLink>
      </div>
      {list.some((c) => c.isSample) && <SamplesNotice what="communities" />}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {list.map((community) => (
          <CommunityCard key={community.slug} community={community} />
        ))}
      </div>
    </Section>
  );
}
