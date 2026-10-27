import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { availableHomes, realAvailableHomes, getStatusLabel, type HomeStatus, type ListingType } from "@/data/available-homes";
import { getCommunity } from "@/data/communities";
import { getFloorPlan } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { HomeCard } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";

const path = "/available-homes";

export const metadata = buildMetadata({
  title: "Homes & Properties for Sale",
  description:
    "Explore Wichita-area homes, multi-family properties and land for sale. View photos, prices, specifications and MLS details.",
  path,
  image: realAvailableHomes[0]?.image ?? images.porchHome,
});

const groups: HomeStatus[] = ["available", "under-construction", "pending"];
const listingTypes: ListingType[] = ["sale"];

export default function AvailableHomesPage() {
  return (
    <>
      <PageHero
        eyebrow="Homes & properties"
        title="Find a property that fits your plans."
        intro="Browse homes, multi-family properties and land for sale. Explore photos, prices and details from the public MLS listings."
        breadcrumbs={[{ name: "Available Homes", path }]}
      />

      <Section labelledBy="homes-list-heading">
        <h2 id="homes-list-heading" className="sr-only">
          Homes and properties by status
        </h2>
        {realAvailableHomes.length === 0 && (
          <DraftNotice title="Inventory coming soon" className="mb-12 max-w-3xl">
            The homes below are illustrative samples, not real listings. Current inventory — addresses, status and
            pricing — will appear here once provided by Superior Homes.
          </DraftNotice>
        )}

        <nav aria-label="Browse property types" className="mb-12 flex flex-wrap gap-3">
          {([['Residential', 'Homes'], ['Multi-Family', 'Multi-family'], ['Land', 'Land']] as const).map(([category, label]) => {
            const count = realAvailableHomes.filter(home => home.listingType === "sale" && home.propertyClass === category).length;
            return count > 0 && <a key={category} href={`#sale-available-${category.toLowerCase()}`} className="rounded-button border border-mist-300 px-4 py-2 text-sm text-brand-800 hover:bg-mist-100">{label} ({count})</a>;
          })}
        </nav>

        <div className="space-y-16">
          {listingTypes.map((listingType) => {
            const typeHomes = availableHomes.filter((h) => h.listingType === listingType && h.status !== "sold");
            if (typeHomes.length === 0) return null;
            return <section key={listingType} aria-labelledby={`${listingType}-heading`}>
              <h3 id={`${listingType}-heading`} className="text-3xl text-ink">{listingType === "rent" ? "For rent" : "For sale"}</h3>
              <div className="mt-8 space-y-12">
                {groups.map((status) => {
                  const homes = typeHomes.filter((h) => h.status === status);
                  if (homes.length === 0) return null;
                  return <div key={status}>
                    <h4 className="flex items-baseline gap-3 text-2xl text-ink">
                      {status === "available" ? "Active listings" : getStatusLabel(status, listingType)}
                      <span className="font-sans text-sm text-ink-subtle">({homes.length})</span>
                    </h4>
                    <div className="mt-6 space-y-12">
                      {(["Residential", "Multi-Family", "Land"] as const).map((category) => {
                        const properties = homes.filter(home => (home.propertyClass ?? "Residential") === category);
                        if (!properties.length) return null;
                        return <section key={category} id={`${listingType}-${status}-${category.toLowerCase()}`} className="scroll-mt-28" aria-label={category === "Residential" ? "Homes" : category === "Multi-Family" ? "Multi-family properties" : "Land"}>
                          <h5 className="mb-6 text-xl text-ink">{category === "Residential" ? "Homes" : category === "Multi-Family" ? "Multi-family properties" : "Land"} <span className="font-sans text-sm text-ink-subtle">({properties.length})</span></h5>
                          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {properties.map((home) => <HomeCard key={home.slug} home={home} communityName={home.communitySlug ? getCommunity(home.communitySlug)?.name : undefined} planName={home.floorPlanSlug ? getFloorPlan(home.floorPlanSlug)?.name : undefined} />)}
                          </div>
                        </section>;
                      })}
                    </div>
                  </div>;
                })}
              </div>
            </section>;
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
