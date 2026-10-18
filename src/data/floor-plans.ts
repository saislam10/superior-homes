import { images, type SiteImage } from "@/config/images";

/**
 * Floor plans — presented as starting points homeowners can customize.
 *
 * Each plan gets a page at /floor-plans/[slug]. `isSample: true` entries are
 * ILLUSTRATIVE: example specs and stock photos, badged on the page,
 * `noindex`, and excluded from the sitemap. Replace them with the company's
 * real plans (names, specs, drawings, photos) supplied by the owner.
 *
 * Never invent prices: leave `startingPrice` null unless the owner provides
 * a current figure (and keep it current).
 *
 * Keep at least one entry (Cache Components requires generateStaticParams
 * to return at least one param).
 */

export type FloorPlan = {
  slug: string;
  name: string;
  beds: number;
  baths: number;
  sqft: number;
  garage?: string;
  stories: 1 | 1.5 | 2;
  summary: string;
  description: string[];
  /** Ideas for how this plan is commonly customized. */
  customizationIdeas: string[];
  image: SiteImage;
  gallery: SiteImage[];
  /** Base price in USD, owner-confirmed only. */
  startingPrice: number | null;
  isSample: boolean;
};

const sampleNote =
  "This is an illustrative sample plan. The specifications are examples and the photos are licensed stock images, not a Superior Homes build.";

export const floorPlans: FloorPlan[] = [
  {
    slug: "sample-ranch-plan",
    name: "Sample Ranch Plan",
    beds: 3,
    baths: 2,
    sqft: 1600,
    garage: "2-car",
    stories: 1,
    summary: "A single-level layout with an open kitchen and living area and a private primary suite.",
    description: [
      sampleNote,
      "A real plan description would explain the layout, how the rooms connect, and who the plan tends to suit — then point out which parts are easiest to adapt.",
    ],
    customizationIdeas: [
      "Add a basement or storm shelter",
      "Extend the garage or add a workshop bay",
      "Enlarge the kitchen island or add a walk-in pantry",
    ],
    image: images.porchHome,
    gallery: [images.porchHome, images.whiteKitchen, images.sunlitLiving],
    startingPrice: null,
    isSample: true,
  },
  {
    slug: "sample-family-two-story",
    name: "Sample Family Two-Story",
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    garage: "3-car",
    stories: 2,
    summary: "Shared living spaces on the main level and bedrooms upstairs, with a flexible bonus room.",
    description: [
      sampleNote,
      "A real plan description would cover the main-level flow, the upstairs arrangement and the options for the bonus space.",
    ],
    customizationIdeas: [
      "Convert the bonus room to a fifth bedroom or office",
      "Add a main-level guest suite",
      "Upgrade to a covered patio or screened porch",
    ],
    image: images.modernExterior,
    gallery: [images.modernExterior, images.islandKitchen, images.primaryBedroom],
    startingPrice: null,
    isSample: true,
  },
  {
    slug: "sample-modern-open-plan",
    name: "Sample Modern Open Plan",
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    garage: "2-car",
    stories: 1.5,
    summary: "A contemporary plan built around a great room with tall windows and a loft overlook.",
    description: [
      sampleNote,
      "A real plan description would explain the design intent, natural light and how the loft can be used.",
    ],
    customizationIdeas: [
      "Swap the loft for an enclosed office",
      "Change exterior materials and roofline",
      "Add a mudroom drop zone off the garage",
    ],
    image: images.timberExterior,
    gallery: [images.timberExterior, images.openLiving, images.sunlitLiving],
    startingPrice: null,
    isSample: true,
  },
];

export const realFloorPlans = floorPlans.filter((p) => !p.isSample);

export function getFloorPlan(slug: string): FloorPlan | undefined {
  return floorPlans.find((p) => p.slug === slug);
}
