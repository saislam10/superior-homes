import { images, type SiteImage } from "@/config/images";

/**
 * Communities — specific neighborhoods/developments where Superior Homes
 * builds (as opposed to /service-areas, which lists towns).
 *
 * Each community gets a page at /communities/[slug]. `isSample: true`
 * entries are ILLUSTRATIVE, badged, `noindex` and excluded from the sitemap.
 * Add real communities only with owner-confirmed names, locations and
 * details. Keep at least one entry.
 */

export type Community = {
  slug: string;
  name: string;
  /** Town, e.g. "Wichita". Should match a confirmed entry in service-areas.ts. */
  city: string;
  summary: string;
  description: string[];
  /** Owner-confirmed highlights (schools, parks, access, HOA notes…). */
  highlights: string[];
  image: SiteImage;
  isSample: boolean;
};

const sampleNote =
  "This is an illustrative sample community used to demonstrate the page layout. It is not a real Superior Homes development, and the photo is a licensed stock image.";

export const communities: Community[] = [
  {
    slug: "sample-community-north",
    name: "Sample Community North",
    city: "[City to be confirmed]",
    summary: "An example neighborhood listing. Real entries describe location, lot types and what’s nearby.",
    description: [
      sampleNote,
      "A real community description would cover the setting, lot sizes and types, utilities, covenants or HOA details, and what makes it a good place to build.",
    ],
    highlights: ["[Nearby schools]", "[Parks and trails]", "[Highway access]", "[HOA / covenant notes]"],
    image: images.gabledHome,
    isSample: true,
  },
  {
    slug: "sample-community-east",
    name: "Sample Community East",
    city: "[City to be confirmed]",
    summary: "An example neighborhood listing showing how each community will be introduced.",
    description: [
      sampleNote,
      "Unique, owner-provided details for each community are what make these pages useful to buyers and search engines alike.",
    ],
    highlights: ["[Nearby schools]", "[Shopping and dining]", "[Lot sizes]", "[Special assessments, if any]"],
    image: images.porchHome,
    isSample: true,
  },
  {
    slug: "sample-acreage-sites",
    name: "Sample Acreage Sites",
    city: "[Area to be confirmed]",
    summary: "An example listing for larger rural lots outside city limits.",
    description: [
      sampleNote,
      "A real listing for acreage sites would explain well and septic considerations, driveway and utility runs, and county permitting.",
    ],
    highlights: ["[Typical lot sizes]", "[Water and septic]", "[Distance to Wichita]"],
    image: images.acreageHome,
    isSample: true,
  },
  {
    slug: "sample-infill-lots",
    name: "Sample Infill Lots",
    city: "[City to be confirmed]",
    summary: "An example listing for individual lots in established neighborhoods.",
    description: [
      sampleNote,
      "A real listing would describe the neighborhood, setbacks and design expectations, and available utilities.",
    ],
    highlights: ["[Neighborhood]", "[Setbacks and design guidelines]", "[Utilities]"],
    image: images.heroExterior,
    isSample: true,
  },
];

export const realCommunities = communities.filter((c) => !c.isSample);

export function getCommunity(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}
