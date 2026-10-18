import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { communities, getCommunity } from "@/data/communities";
import { availableHomes } from "@/data/available-homes";
import { getFloorPlan } from "@/data/floor-plans";
import { PageHero } from "@/components/sections/PageHero";
import { ConsultationCta } from "@/components/sections/ConsultationCta";
import { Section } from "@/components/ui/Section";
import { HomeCard } from "@/components/ui/Listing";
import { DraftNotice } from "@/components/ui/Placeholder";
import { TextLink } from "@/components/ui/Button";

/** Keep at least one community in src/data/communities.ts (Cache Components requirement). */
export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/communities/[slug]">) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) return {};
  return buildMetadata({
    title: `${community.name} — ${community.city}`,
    description: community.summary,
    path: `/communities/${community.slug}`,
    image: community.image,
    noIndex: community.isSample,
  });
}

export default async function CommunityPage({ params }: PageProps<"/communities/[slug]">) {
  const { slug } = await params;
  const community = getCommunity(slug);
  if (!community) notFound();

  const path = `/communities/${community.slug}`;
  const homes = availableHomes.filter((h) => h.communitySlug === community.slug && h.status !== "sold");

  return (
    <>
      <PageHero
        eyebrow={community.city}
        title={community.name}
        intro={community.summary}
        breadcrumbs={[
          { name: "Communities", path: "/communities" },
          { name: community.name, path },
        ]}
        image={community.image}
      />

      <Section labelledBy="community-about-heading">
        {community.isSample && (
          <DraftNotice title="Illustrative sample" className="mb-12 max-w-3xl">
            This page demonstrates the community template and is hidden from search engines.
          </DraftNotice>
        )}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="community-about-heading" className="text-3xl text-ink sm:text-4xl">
              About {community.name}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
              {community.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
          <aside aria-labelledby="community-highlights-heading" className="lg:col-span-5">
            <div className="rounded-card border border-mist-200 bg-surface p-6">
              <h3 id="community-highlights-heading" className="text-xl text-ink">
                Highlights
              </h3>
              <ul className="mt-4 space-y-2 text-ink-muted">
                {community.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-leaf-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="mist" labelledBy="community-homes-heading">
        <h2 id="community-homes-heading" className="text-3xl text-ink">
          Available homes in {community.name}
        </h2>
        {homes.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {homes.map((home) => (
              <HomeCard
                key={home.slug}
                home={home}
                planName={home.floorPlanSlug ? getFloorPlan(home.floorPlanSlug)?.name : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            No homes are listed here right now — but that doesn’t mean there’s no room for yours. Ask us about building
            a custom home in this community.
          </p>
        )}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-10">
          <TextLink href="/communities">Back to all communities</TextLink>
          <TextLink href="/floor-plans">Browse floor plans</TextLink>
        </div>
      </Section>

      <ConsultationCta title={`Build in ${community.name}.`} />
    </>
  );
}
