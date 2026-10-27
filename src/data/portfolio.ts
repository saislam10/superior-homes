import { images, remingtonGallery, forbesGallery, portfolioGalleries, type SiteImage } from "@/config/images";

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
    slug: "1530-e-appleton-st",
    title: "1530 E Appleton St",
    location: "Valley Center, KS",
    summary: "Wood cabinetry, a white kitchen island and a fireplace with open shelving bring warmth to this Valley Center home.",
    description: [
      "A gabled front exterior combines light siding, stone accents and a covered entry. Inside, wood cabinetry contrasts with a white kitchen island, while open shelving frames the living room fireplace.",
      "The gallery follows the dining area, pantry and bedrooms through to a bathroom with a separate tub and tiled shower. A covered patio opens onto the rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Wood kitchen cabinetry and white island",
      "Fireplace with open shelving",
      "Bathroom with separate tub and shower",
      "Covered rear patio"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1530-e-appleton-st"][0],
    gallery: portfolioGalleries["1530-e-appleton-st"],
  },
  {
    slug: "1510-e-appleton-st",
    title: "1510 E Appleton St",
    location: "Valley Center, KS",
    summary: "Explore a Valley Center home with white kitchen cabinetry, a wood island, a beamed bedroom ceiling and a covered patio.",
    description: [
      "Dark garage doors and brick accents contrast with the light front siding. A built-in entry bench leads to an open living area, where a fireplace sits beside the kitchen and dining space.",
      "White cabinets, a wood island and a matching range hood define the kitchen. Other photographed details include a pantry, a bedroom with ceiling beams, a tiled shower and a covered rear patio."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "White kitchen cabinets with a wood island",
      "Built-in entry bench",
      "Bedroom with ceiling beams",
      "Covered rear patio"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1510-e-appleton-st"][0],
    gallery: portfolioGalleries["1510-e-appleton-st"],
  },
  {
    slug: "5186-n-toben-dr",
    title: "5186 N Toben Dr",
    location: "Bel Aire, KS",
    summary: "Tour this Bel Aire home with a wood-accented fireplace, mixed-tone kitchen cabinetry and a covered patio overlooking the lawn.",
    description: [
      "Gray siding and brick accents frame the front entry. The living room pairs wood-look flooring with a fireplace set into a tall wood accent panel, opening toward the kitchen and dining area.",
      "Wood cabinets, a contrasting island and stainless-steel appliances feature in the kitchen. The photo tour also includes bedrooms, closet shelving, bathrooms and a covered rear patio."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Fireplace with a tall wood accent panel",
      "Kitchen with mixed-tone cabinetry",
      "Closet and pantry shelving",
      "Covered rear patio"
    ],
    isSample: false,
    coverImage: portfolioGalleries["5186-n-toben-dr"][0],
    gallery: portfolioGalleries["5186-n-toben-dr"],
  },
  {
    slug: "1510-midway-ct",
    title: "1510 Midway Ct",
    location: "Valley Center, KS",
    summary: "White kitchen cabinetry, an open living area and a covered raised deck feature in this Valley Center home's photo tour.",
    description: [
      "Dark garage doors and brick accents give way to a bright interior with wood-look flooring. The living room fireplace and adjoining white island kitchen sit beside large windows and a dining area.",
      "The gallery continues through carpeted bedrooms, a double vanity, closet shelving and a lower-level living area. A covered raised deck overlooks the rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Open living area with a fireplace",
      "White island kitchen",
      "Lower-level living space",
      "Covered raised deck"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1510-midway-ct"][0],
    gallery: portfolioGalleries["1510-midway-ct"],
  },
  {
    slug: "1530-midway-ct",
    title: "1530 Midway Ct",
    location: "Valley Center, KS",
    summary: "This Valley Center gallery pairs a white kitchen and dark island countertop with a fireplace, lower-level living area and raised deck.",
    description: [
      "Light siding and brick accents frame the front exterior. Inside, a white fireplace surround anchors the living area, while a dark island countertop contrasts with the white kitchen cabinetry.",
      "Photographed interior details include paneled bedroom walls, a bathroom with a separate tub, and a lower-level living area. The tour finishes with the covered raised deck, sheltered patio and rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "White kitchen with a dark island countertop",
      "Bedroom accent walls",
      "Lower-level living area",
      "Covered deck and sheltered patio"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1530-midway-ct"][0],
    gallery: portfolioGalleries["1530-midway-ct"],
  },
  {
    slug: "1520-midway-ct",
    title: "1520 Midway Ct",
    location: "Valley Center, KS",
    summary: "Explore this Valley Center home with a white island kitchen, fireplace, lower-level living space and a covered deck above the lawn.",
    description: [
      "Gray siding and brick accents shape the front of this home. Wood-look flooring connects the living area, fireplace, white island kitchen and dining area beside a glazed patio door.",
      "Carpeted bedrooms, bathroom vanities and a lower-level living area appear throughout the interior gallery. Outside, a covered deck provides a raised view across the rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "White island kitchen with pendant lighting",
      "Living room fireplace",
      "Lower-level living space",
      "Covered raised deck"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1520-midway-ct"][0],
    gallery: portfolioGalleries["1520-midway-ct"],
  },
  {
    slug: "2933-s-bunker-hill-dr",
    title: "2933 S Bunker Hill Dr",
    location: "Wichita, KS",
    summary: "See exterior and interior photography from units 100 and 200 at this Wichita property, including open living spaces and island kitchens.",
    description: [
      "The source gallery covers units 100 and 200 at 2933 S Bunker Hill Dr. Gray siding, white garage doors and adjoining driveways define the front exterior.",
      "The interior photos show open living areas, white kitchen cabinets, islands, pendant lighting and stainless-steel appliances. Bedroom, bathroom, closet and laundry details are included from across the property, followed by rear exterior views."
    ],
    style: "Duplex",
    specs: [],
    highlights: [
      "Gallery includes units 100 and 200",
      "Open living areas and island kitchens",
      "White cabinetry and stainless-steel appliances",
      "Closet shelving and laundry spaces"
    ],
    isSample: false,
    coverImage: portfolioGalleries["2933-s-bunker-hill-dr"][0],
    gallery: portfolioGalleries["2933-s-bunker-hill-dr"],
  },
  {
    slug: "1630-e-appleton-st",
    title: "1630 E Appleton St",
    location: "Valley Center, KS",
    summary: "Wood cabinetry and living room shelving, a beamed bedroom ceiling and a covered patio feature in this Valley Center home's gallery.",
    description: [
      "Light siding and brick accents lead to an open interior with wood-look flooring and living room shelving. The adjoining kitchen combines wood cabinetry, an island and stainless-steel appliances.",
      "A bedroom with ceiling beams and a diagonal accent wall adds another wood detail. The bathroom gallery shows a separate tub and tiled shower, while exterior photos show the covered patio and rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Wood kitchen cabinetry and island",
      "Living room built-in shelving",
      "Bedroom with ceiling beams",
      "Separate tub and tiled shower"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1630-e-appleton-st"][0],
    gallery: portfolioGalleries["1630-e-appleton-st"],
  },
  {
    slug: "1640-e-appleton-st",
    title: "1640 E Appleton St",
    location: "Valley Center, KS",
    summary: "Dark built-ins, a contrasting kitchen island and bedroom accent walls distinguish this Valley Center home with a covered rear patio.",
    description: [
      "Dark garage doors and entry cabinetry contrast with the light exterior and interior walls. Built-in shelving frames the fireplace, while a dark island anchors the white kitchen.",
      "The gallery highlights a bedroom with a dark diagonal accent wall, a bathroom with a double vanity and tiled shower, and closet shelving. Rear views show a covered patio alongside the lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Fireplace with dark built-in cabinetry",
      "White kitchen with a contrasting island",
      "Dark bedroom accent walls",
      "Covered rear patio"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1640-e-appleton-st"][0],
    gallery: portfolioGalleries["1640-e-appleton-st"],
  },
  {
    slug: "1620-e-appleton-st",
    title: "1620 E Appleton St",
    location: "Valley Center, KS",
    summary: "A furnished photo tour of a Valley Center home with wood built-ins, a white kitchen, ceiling beams and a covered patio.",
    description: [
      "This furnished gallery shows an open living and dining area with wood-look flooring. Wood built-ins frame the fireplace and entry, while white kitchen cabinetry surrounds a contrasting wood island.",
      "Bedroom ceiling beams, a double vanity, a tiled shower and pantry shelving appear in the interior photos. A covered patio opens toward the lawn behind the home."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Furnished living and dining areas",
      "Fireplace with wood built-ins",
      "White kitchen with a wood island",
      "Bedroom ceiling beams"
    ],
    isSample: false,
    coverImage: portfolioGalleries["1620-e-appleton-st"][0],
    gallery: portfolioGalleries["1620-e-appleton-st"],
  },
  {
    slug: "2121-e-cedar-tree-cir",
    title: "2121 E Cedar Tree Cir",
    location: "Park City, KS",
    summary: "Tour this Park City home with an open island kitchen, living room fireplace, lower-level living area and covered raised deck.",
    description: [
      "Light siding, brick accents and dark garage doors frame the front exterior. The living room fireplace sits beside an open white kitchen and dining area, with large windows and a glazed patio door bringing in daylight.",
      "The gallery includes carpeted bedrooms, bathroom and closet details, and a lower-level living area with a small counter and sink. A covered raised deck overlooks the rear lawn."
    ],
    style: "Contemporary",
    specs: [],
    highlights: [
      "Open white island kitchen",
      "Living room fireplace and shelving",
      "Lower-level living area with a counter and sink",
      "Covered raised deck"
    ],
    isSample: false,
    coverImage: portfolioGalleries["2121-e-cedar-tree-cir"][0],
    gallery: portfolioGalleries["2121-e-cedar-tree-cir"],
  },
  {
    slug: "5046-n-remington-st",
    title: "5046 N Remington St",
    location: "Bel Aire, KS",
    summary: "Explore this Bel Aire home, from its open living area and island kitchen to its covered deck and lower-level living space.",
    description: [
      "Brick accents and a wide front approach lead into an open living area with large windows and a dark fireplace surround. White kitchen cabinetry, a contrasting island, pendant lighting and a walk-in pantry shape the adjoining kitchen.",
      "The photo gallery also shows a double-vanity bathroom, a tiled walk-in shower, a lower-level living area with a wet bar, and a covered deck above a sheltered patio.",
    ],
    style: "Contemporary",
    coverImage: remingtonGallery[0],
    gallery: remingtonGallery,
    specs: [],
    highlights: ["Open living area with a fireplace", "Island kitchen and walk-in pantry", "Lower-level living area with a wet bar", "Covered deck and sheltered patio"],
    isSample: false,
    featured: true,
  },
  {
    slug: "9002-forbes-ct",
    title: "9002 Forbes Ct",
    location: "Bel Aire, KS",
    summary: "Take a photo tour of this Bel Aire home with an open living area, island kitchen, dark fireplace wall and covered rear patio.",
    description: [
      "Gray siding and an attached garage frame the front exterior. Inside, wood-look flooring connects the living area and kitchen, with a dark fireplace wall anchoring the gathering space.",
      "Light kitchen cabinetry, stainless-steel appliances and a tile backsplash surround the island. The gallery continues through the bedrooms, bathrooms and laundry space before stepping outside to the covered rear patio.",
    ],
    style: "Contemporary",
    coverImage: forbesGallery[0],
    gallery: forbesGallery,
    specs: [],
    highlights: ["Open living area with a dark fireplace wall", "Island kitchen with stainless-steel appliances", "Laundry space with built-in shelving", "Covered rear patio"],
    isSample: false,
    featured: true,
  },
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
