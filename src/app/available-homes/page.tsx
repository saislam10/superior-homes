import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { availableHomes, realAvailableHomes, statusLabels, type HomeStatus } from "@/data/available-homes";
import { getCommunity } from "@/data/communities";
import { getFloorPlan } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { HomeCard } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";

const path = "/available-homes";

export const metadata = buildMetadata({
  title: "Available Homes",
  description:
    "Move-in-ready and under-construction homes from Superior Homes in the Wichita area. See status, specs and floor plans, and ask about finishing choices.",
  path,
  image: images.porchHome,
});

const groups: HomeStatus[] = ["available", "under-construction", "pending"];

export default function AvailableHomesPage() {
  return (
    <>
      <PageHero
        eyebrow="Available homes"
        title="Homes available now and coming soon."
        intro="Move-in-ready homes and homes still under construction. If a home is early enough in the build, you may still be able to choose some of the finishes."
        breadcrumbs={[{ name: "Available Homes", path }]}
      />

      <Section labelledBy="homes-list-heading">
        <h2 id="homes-list-heading" className="sr-only">
          Homes by status
        </h2>
        {realAvailableHomes.length === 0 && (
          <DraftNotice title="Inventory coming soon" className="mb-12 max-w-3xl">
            The homes below are illustrative samples, not real listings. Current inventory — addresses, status and
            pricing — will appear here once provided by Superior Homes.
          </DraftNotice>
        )}

        <div className="space-y-16">
          {groups.map((status) => {
            const homes = availableHomes.filter((h) => h.status === status);
            if (homes.length === 0) return null;
            return (
              <div key={status}>
                <h3 className="flex items-baseline gap-3 text-2xl text-ink">
                  {statusLabels[status]}
                  <span className="font-sans text-sm text-ink-subtle">({homes.length})</span>
                </h3>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {homes.map((home) => (
                    <HomeCard
                      key={home.slug}
                      home={home}
                      communityName={home.communitySlug ? getCommunity(home.communitySlug)?.name : undefined}
                      planName={home.floorPlanSlug ? getFloorPlan(home.floorPlanSlug)?.name : undefined}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <ConsultationCta
        title="Don’t see the right fit?"
        body="Start from one of our floor plans or from scratch, and we’ll build a home around what you need."
      />
    </>
  );
}
