import { images, type SiteImage } from "@/config/images";

/**
 * Portfolio projects.
 *
 * Each project gets a page at /portfolio/[slug]. Entries with
 * `isSample: true` are ILLUSTRATIVE placeholders, not real Superior Homes
 * projects. Sample pages:
 *   - display a prominent "Illustrative sample" notice,
 *   - are marked `noindex`,
 *   - are excluded from the sitemap and from structured data.
 *
 * To add a real project: add an entry with `isSample: false`, real photos
 * (see src/config/images.ts), and owner-confirmed details. To remove the
 * samples once real projects exist, delete them from this array.
 */

export type ProjectSpec = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Community/area, e.g. "Andover, KS". Only use confirmed locations. */
  location: string;
  /** Short summary for cards and meta descriptions (≤160 chars ideal). */
  summary: string;
  /** Longer narrative for the project page. Paragraphs. */
  description: string[];
  style: string;
  coverImage: SiteImage;
  gallery: SiteImage[];
  specs: ProjectSpec[];
  highlights: string[];
  /** ISO date (YYYY-MM or YYYY-MM-DD) of completion, if known. */
  completed?: string;
  isSample: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sample-modern-family-home",
    title: "Sample: Modern Family Home",
    location: "[Location to be confirmed]",
    summary:
      "An illustrative example of how a project will be presented: an open main level, a dedicated mudroom and a covered outdoor living space.",
    description: [
      "This is a placeholder entry that shows how a completed project will be presented on the site. The photos are licensed stock images, not a home built by Superior Homes.",
      "When real projects are added, this section should describe the homeowners' goals (with their permission), the design decisions that answered them, and anything distinctive about the lot or the build.",
    ],
    style: "Modern",
    coverImage: images.heroExterior,
    gallery: [images.heroExterior, images.openLiving, images.islandKitchen, images.primaryBedroom],
    specs: [
      { label: "Square footage", value: "[To be provided]" },
      { label: "Bedrooms", value: "[To be provided]" },
      { label: "Bathrooms", value: "[To be provided]" },
    ],
    highlights: [
      "Open kitchen, dining and living area",
      "Large windows oriented for natural light",
      "Covered outdoor living space",
    ],
    isSample: true,
    featured: true,
  },
  {
    slug: "sample-farmhouse-on-acreage",
    title: "Sample: Farmhouse on Acreage",
    location: "[Location to be confirmed]",
    summary:
      "An illustrative example of a home on a larger rural lot, with a wraparound porch and a layout built for gathering.",
    description: [
      "This is a placeholder entry that shows how a completed project will be presented on the site. The photos are licensed stock images, not a home built by Superior Homes.",
      "Rural and acreage builds often involve different site considerations — wells, septic systems, longer utility runs and driveways — which a real project write-up can explain.",
    ],
    style: "Farmhouse",
    coverImage: images.acreageHome,
    gallery: [images.acreageHome, images.porchHome, images.whiteKitchen, images.sunlitLiving],
    specs: [
      { label: "Square footage", value: "[To be provided]" },
      { label: "Lot size", value: "[To be provided]" },
      { label: "Bedrooms", value: "[To be provided]" },
    ],
    highlights: [
      "Wraparound porch",
      "Kitchen designed around a large island",
      "Views to the surrounding land",
    ],
    isSample: true,
    featured: true,
  },
  {
    slug: "sample-contemporary-two-story",
    title: "Sample: Contemporary Two-Story",
    location: "[Location to be confirmed]",
    summary:
      "An illustrative example of a contemporary two-story home with mixed exterior materials and a light-filled interior.",
    description: [
      "This is a placeholder entry that shows how a completed project will be presented on the site. The photos are licensed stock images, not a home built by Superior Homes.",
      "A real write-up could cover material choices, how the plan responds to the lot's orientation, and how the homeowners balanced finishes against budget.",
    ],
    style: "Contemporary",
    coverImage: images.modernExterior,
    gallery: [images.modernExterior, images.timberExterior, images.sunlitLiving, images.primaryBedroom],
    specs: [
      { label: "Square footage", value: "[To be provided]" },
      { label: "Bedrooms", value: "[To be provided]" },
      { label: "Bathrooms", value: "[To be provided]" },
    ],
    highlights: [
      "Wood and panel exterior accents",
      "Glass entry",
      "Second-floor primary suite",
    ],
    isSample: true,
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const realProjects = projects.filter((p) => !p.isSample);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
