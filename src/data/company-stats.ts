import { realCommunities } from "./communities";
import { realFloorPlans } from "./floor-plans";

/**
 * Homepage stats bar.
 *
 * Counts of plans and communities are derived from real (non-sample) data.
 * Years of experience and homes built must come from the owner — they are
 * `null` (rendered as placeholders) until confirmed. Never estimate them.
 */

export const ownerStats = {
  yearsExperience: null as string | null, // e.g. "20+"
  homesBuilt: null as string | null, // e.g. "400+"
};

export type Stat = { label: string; value: string | null; href?: string };

export function getStats(): Stat[] {
  const count = (n: number) => (n > 0 ? String(n) : null);
  return [
    { label: "Floor plans", value: count(realFloorPlans.length), href: "/floor-plans" },
    { label: "Communities", value: count(realCommunities.length), href: "/communities" },
    { label: "Years of experience", value: ownerStats.yearsExperience },
    { label: "Homes built", value: ownerStats.homesBuilt },
  ];
}
