import { realCommunities } from "./communities";
import { realFloorPlans } from "./floor-plans";

/**
 * Homepage stats bar.
 *
 * Plan counts come from real data; the community statistic is owner-confirmed.
 * Years of experience and homes sold are owner-confirmed business figures.
 * Never equate sales with the number of homes built.
 */

export const ownerStats = {
  communities: "10s" as string | null,
  yearsExperience: "23" as string | null,
  homesSold: "1,700" as string | null,
};

export type Stat = { label: string; value: string | null; href?: string };

export function getStats(): Stat[] {
  const count = (n: number) => (n > 0 ? String(n) : null);
  return [
    { label: "Floor plans", value: count(realFloorPlans.length), href: "/floor-plans" },
    { label: "Communities", value: ownerStats.communities ?? count(realCommunities.length), href: "/communities" },
    { label: "Years of experience", value: ownerStats.yearsExperience },
    { label: "Homes sold", value: ownerStats.homesSold },
  ];
}
