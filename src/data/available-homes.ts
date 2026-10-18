import { images, type SiteImage } from "@/config/images";

/**
 * Available homes — homes that are move-in ready or under construction.
 *
 * Each home gets a page at /available-homes/[slug]. `isSample: true`
 * entries are ILLUSTRATIVE: badged, `noindex`, excluded from the sitemap and
 * from the inventory counts on the homepage.
 *
 * Inventory changes often. Update `status` promptly and remove sold homes
 * (or set status "sold"). Never publish a price that isn't current and
 * owner-confirmed — leave `price` null to show "Contact for pricing".
 * Keep at least one entry.
 */

export type HomeStatus = "available" | "under-construction" | "pending" | "sold";

export const statusLabels: Record<HomeStatus, string> = {
  available: "Move-in ready",
  "under-construction": "Under construction",
  pending: "Sale pending",
  sold: "Sold",
};

export type AvailableHome = {
  slug: string;
  /** Street address, owner-confirmed. */
  address: string;
  city: string;
  communitySlug?: string;
  floorPlanSlug?: string;
  status: HomeStatus;
  beds: number;
  baths: number;
  sqft: number;
  price: number | null;
  /** e.g. "Spring 2027" — only if confirmed. */
  estimatedCompletion: string | null;
  summary: string;
  highlights: string[];
  image: SiteImage;
  gallery: SiteImage[];
  isSample: boolean;
};

export const availableHomes: AvailableHome[] = [
  {
    slug: "sample-home-1",
    address: "Sample Home — [Address to be provided]",
    city: "[City]",
    communitySlug: "sample-community-north",
    floorPlanSlug: "sample-ranch-plan",
    status: "available",
    beds: 3,
    baths: 2,
    sqft: 1600,
    price: null,
    estimatedCompletion: null,
    summary:
      "An illustrative listing showing how a move-in-ready home will be presented. Not a real home for sale.",
    highlights: ["[Key feature]", "[Key feature]", "[Lot details]"],
    image: images.porchHome,
    gallery: [images.porchHome, images.whiteKitchen, images.sunlitLiving],
    isSample: true,
  },
  {
    slug: "sample-home-2",
    address: "Sample Home — [Address to be provided]",
    city: "[City]",
    communitySlug: "sample-community-east",
    floorPlanSlug: "sample-family-two-story",
    status: "under-construction",
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    price: null,
    estimatedCompletion: null,
    summary:
      "An illustrative listing for a home under construction — buyers may still be able to choose some finishes. Not a real home for sale.",
    highlights: ["[Selections still open]", "[Key feature]", "[Lot details]"],
    image: images.modernExterior,
    gallery: [images.modernExterior, images.islandKitchen, images.primaryBedroom],
    isSample: true,
  },
  {
    slug: "sample-home-3",
    address: "Sample Home — [Address to be provided]",
    city: "[City]",
    communitySlug: "sample-acreage-sites",
    floorPlanSlug: "sample-modern-open-plan",
    status: "under-construction",
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    price: null,
    estimatedCompletion: null,
    summary: "An illustrative listing for a home on a larger lot. Not a real home for sale.",
    highlights: ["[Key feature]", "[Lot size]", "[Key feature]"],
    image: images.timberExterior,
    gallery: [images.timberExterior, images.openLiving, images.sunlitLiving],
    isSample: true,
  },
];

export const realAvailableHomes = availableHomes.filter((h) => !h.isSample && h.status !== "sold");

export function getAvailableHome(slug: string): AvailableHome | undefined {
  return availableHomes.find((h) => h.slug === slug);
}

export function formatPrice(price: number | null): string {
  return price === null
    ? "Contact for pricing"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}
