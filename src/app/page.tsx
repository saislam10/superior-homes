import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { HomeHero } from "@/components/sections/HomeHero";
import { AvailableHomesRow, CommunitiesRow, FloorPlansRow, StatsBar } from "@/components/sections/HomeListings";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { ProcessOverview } from "@/components/sections/ProcessOverview";
import { WhyBuild } from "@/components/sections/WhyBuild";
import { ConsultationCta } from "@/components/sections/ConsultationCta";

export const metadata = buildMetadata({
  description: siteConfig.description,
  path: "/",
});

/**
 * Homepage section order follows the reference layout (hero, stats, plans,
 * available homes, communities, why-us, CTA) with custom-home messaging
 * leading after the stats bar.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBar />
      <ValueProposition />
      <FloorPlansRow />
      <AvailableHomesRow />
      <CommunitiesRow />
      <ProcessOverview />
      <WhyBuild />
      <ConsultationCta title="Ready to build your home?" />
    </>
  );
}
