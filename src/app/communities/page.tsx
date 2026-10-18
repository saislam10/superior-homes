import { buildMetadata } from "@/lib/seo";
import { images } from "@/config/images";
import { communities, realCommunities } from "@/data/communities";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { CommunityCard } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

const path = "/communities";

export const metadata = buildMetadata({
  title: "Communities",
  description:
    "Neighborhoods and lots around Wichita where Superior Homes builds — compare locations, lot types and what’s nearby, then build a home that fits.",
  path,
  image: images.gabledHome,
});

export default function CommunitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Communities"
        title="Find the right place to build."
        intro="Each community has its own setting, lot types and rules. Compare them here — and if you already own land, we’ll talk about building there too."
        breadcrumbs={[{ name: "Communities", path }]}
        image={images.gabledHome}
      />

      <Section labelledBy="communities-list-heading">
        <h2 id="communities-list-heading" className="sr-only">
          All communities
        </h2>
        {realCommunities.length === 0 && (
          <DraftNotice title="Communities coming soon" className="mb-12 max-w-3xl">
            The communities below are illustrative samples. Real neighborhoods and developments will be listed once
            confirmed by Superior Homes.
          </DraftNotice>
        )}
        <div className="grid gap-8 md:grid-cols-2">
          {communities.map((c) => (
            <CommunityCard key={c.slug} community={c} />
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <TextLink href="/service-areas">See our service area</TextLink>
          <TextLink href="/cost-to-build">How your lot affects cost</TextLink>
        </div>
      </Section>

      <ConsultationCta
        title="Have land already — or still looking?"
        body="Tell us where you’d like to build. We can talk through communities, lots and what each location means for your home."
      />
    </>
  );
}
