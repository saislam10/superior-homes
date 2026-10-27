import { mlsListingImages, type SiteImage } from "@/config/images";
import mlsInventory from "./mls-inventory.json";

/**
 * Homes, multi-family properties and land for sale from owner-supplied listings.
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
export type ListingType = "sale" | "rent";

export const statusLabels: Record<HomeStatus, string> = {
  available: "For sale",
  "under-construction": "Under construction",
  pending: "Sale pending",
  sold: "Sold",
};

export function getStatusLabel(status: HomeStatus, listingType: ListingType): string {
  if (listingType === "rent") {
    if (status === "available") return "For rent";
    if (status === "pending") return "Application pending";
    if (status === "sold") return "Leased";
  }
  return statusLabels[status];
}

export type AvailableHome = {
  slug: string;
  listingType: ListingType;
  /** Street address, owner-confirmed. */
  address: string;
  city: string | null;
  propertyClass?: "Residential" | "Multi-Family" | "Land";
  propertyType?: string | null;
  sourceStatus?: string;
  sourceCheckedAt?: string;
  units?: number | null;
  lotSqft?: number | null;
  description?: string;
  details?: { label: string; value: string }[];
  communitySlug?: string;
  floorPlanSlug?: string;
  status: HomeStatus;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  price: number | null;
  /** Monthly rent, only for active rental listings. */
  monthlyRent?: number | null;
  securityDeposit?: number | null;
  leaseTerm?: string | null;
  applicationFee?: number | null;
  petPolicy?: string | null;
  utilitiesPolicy?: string | null;
  mlsNumber?: string | null;
  sourceUrl?: string | null;
  /** e.g. "Spring 2027" — only if confirmed. */
  estimatedCompletion: string | null;
  summary: string;
  highlights: string[];
  image: SiteImage;
  gallery: SiteImage[];
  isSample: boolean;
};

const importedHomes: AvailableHome[] = mlsInventory.map(record => ({
  ...record,
  listingType: "sale",
  status: "available",
  propertyClass: record.propertyClass as AvailableHome["propertyClass"],
  image: mlsListingImages[record.mlsNumber][0],
  gallery: mlsListingImages[record.mlsNumber],
}));

export const availableHomes: AvailableHome[] = importedHomes;

export const realAvailableHomes = availableHomes.filter((h) => !h.isSample && h.status !== "sold");

export function getAvailableHome(slug: string): AvailableHome | undefined {
  return availableHomes.find((h) => h.slug === slug);
}

export function propertyInquiryHref(home: AvailableHome): string {
  return home.mlsNumber ? `/contact?mls=${encodeURIComponent(home.mlsNumber)}#form-heading` : "/contact#form-heading";
}

export function formatPrice(price: number | null): string {
  return price === null
    ? "Contact for pricing"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}
