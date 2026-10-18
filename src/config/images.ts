/**
 * Central image registry.
 *
 * IMPORTANT: Every image below is a licensed stock photograph from Unsplash
 * (https://unsplash.com/license). None of them show homes built by
 * Superior Homes. They are used for visual direction only and must not be
 * presented as company work. Captions on portfolio entries say so explicitly.
 *
 * To replace with real project photography:
 *   1. Put optimized images in /public/images/... (JPEG/WebP, ~2400px wide max).
 *   2. Change `src` to the local path, e.g. "/images/projects/oak-ridge/exterior.jpg".
 *   3. Update `alt` to describe the actual photo, and set `isStock: false`.
 * Local images need no extra config. New remote hosts must be added to
 * `images.remotePatterns` in next.config.ts.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True for stock/illustrative imagery that is not the company's own work. */
  isStock: boolean;
  credit?: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const images = {
  heroExterior: {
    src: unsplash("photo-1600585154340-be6161a56a0c"),
    alt: "Modern two-story home at dusk with warm interior lighting, large windows and a mature tree over the lawn",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  openLiving: {
    src: unsplash("photo-1600607687939-ce8a6c25118c"),
    alt: "Open-concept living room flowing into a kitchen with a breakfast bar and wood accent wall",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  timberExterior: {
    src: unsplash("photo-1600566753190-17f0baa2a6c3"),
    alt: "Contemporary two-story home with timber cladding, a sloped roofline and a wide driveway",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  modernExterior: {
    src: unsplash("photo-1600047509807-ba8f99d2cdde"),
    alt: "Modern two-story home with a wood-panel accent, large glass entry and a landscaped front lawn",
    width: 2400,
    height: 2000,
    isStock: true,
    credit: "Unsplash",
  },
  sunlitLiving: {
    src: unsplash("photo-1600210492486-724fe5c67fb0"),
    alt: "Sunlit living room with a leather sofa, tall windows and a gallery wall",
    width: 2400,
    height: 1800,
    isStock: true,
    credit: "Unsplash",
  },
  planReview: {
    src: unsplash("photo-1503387762-592deb58ef4e"),
    alt: "Person marking up a set of architectural floor plans on a wooden table",
    width: 2400,
    height: 1350,
    isStock: true,
    credit: "Unsplash",
  },
  primaryBedroom: {
    src: unsplash("photo-1600607687644-c7171b42498f"),
    alt: "Calm bedroom with a vaulted ceiling and floor-to-ceiling windows",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  porchHome: {
    src: unsplash("photo-1570129477492-45c003edd2be"),
    alt: "Traditional home with dormer windows, a gray roof and a wraparound front porch",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  gabledHome: {
    src: unsplash("photo-1449844908441-8829872d2607"),
    alt: "Gabled home with a steep roof set among tall trees at sunset",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  whiteKitchen: {
    src: unsplash("photo-1556912173-3bb406ef7e77"),
    alt: "Bright kitchen with white cabinetry, a marble island and a professional-style range",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  islandKitchen: {
    src: unsplash("photo-1484154218962-a197022b5858"),
    alt: "Kitchen with white cabinets, a dark tile backsplash, an island and pendant lights",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
  acreageHome: {
    src: unsplash("photo-1558036117-15d82a90b9b1"),
    alt: "Wood-sided home with a wraparound deck on open acreage at sunset",
    width: 2400,
    height: 1600,
    isStock: true,
    credit: "Unsplash",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
