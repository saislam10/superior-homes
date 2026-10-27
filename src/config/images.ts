/**
 * Central image registry.
 *
 * The entries in `images` below are licensed stock photographs from Unsplash
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

import mlsImageRegistry from "./mls-images.json";

export const mlsListingImages: Record<string, SiteImage[]> = mlsImageRegistry;

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

/** Owner-supplied project photography; local files optimized from the original galleries. */
export const remingtonGallery: SiteImage[] = [
  {
    "src": "/images/projects/5046-n-remington-st/photo-01.jpg",
    "alt": "Front exterior with brick accents, a wide driveway and lawn at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-04.jpg",
    "alt": "Entry with a glazed front door and built-in bench at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-08.jpg",
    "alt": "Open living room with a dark fireplace surround and large windows at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-11.jpg",
    "alt": "Kitchen with white cabinets, a contrasting island and pendant lights at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-13.jpg",
    "alt": "Kitchen wall with built-in ovens and a patterned backsplash at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-15.jpg",
    "alt": "Walk-in pantry with wraparound shelving at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-16.jpg",
    "alt": "Dining area beside large windows and a glazed patio door at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-19.jpg",
    "alt": "Carpeted bedroom with a ceiling fan and accent wall at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-22.jpg",
    "alt": "Bathroom with a double vanity and black-framed mirrors at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-24.jpg",
    "alt": "Walk-in shower with patterned tile and dark fixtures at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-28.jpg",
    "alt": "Bedroom with a diagonal accent wall and ceiling fan at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-33.jpg",
    "alt": "Lower-level living area with windows and recessed lighting at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-35.jpg",
    "alt": "Lower-level wet bar with patterned backsplash and open shelves at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-44.jpg",
    "alt": "Covered raised deck overlooking the backyard at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-48.jpg",
    "alt": "Covered patio beneath the raised deck at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/5046-n-remington-st/photo-51.jpg",
    "alt": "Rear exterior with a raised deck, covered patio and lawn at 5046 N Remington St",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  }
];
export const forbesGallery: SiteImage[] = [
  {
    "src": "/images/projects/9002-forbes-ct/photo-01.jpg",
    "alt": "Front exterior with gray siding and an attached garage at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-04.jpg",
    "alt": "Open living room with a dark fireplace wall and ceiling fan at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-05.jpg",
    "alt": "Kitchen island overlooking the open living area at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-06.jpg",
    "alt": "Kitchen with light cabinetry, stainless-steel appliances and a tile backsplash at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-09.jpg",
    "alt": "Open living and dining area with wood-look flooring at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-11.jpg",
    "alt": "Bathroom with a dark vanity, framed mirror and tub surround at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-12.jpg",
    "alt": "Laundry space with shelving and appliance hookups at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-16.jpg",
    "alt": "Bedroom with a large window and double closet doors at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-21.jpg",
    "alt": "Bathroom with a light vanity and tub surround at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  },
  {
    "src": "/images/projects/9002-forbes-ct/photo-22.jpg",
    "alt": "Rear exterior with a covered patio and lawn at 9002 Forbes Ct",
    "width": 2100,
    "height": 1400,
    "isStock": false,
    "credit": "AEV Real Estate Photography Kansas"
  }
];

/** Additional owner-supplied project galleries, imported October 22, 2026. */
export const portfolioGalleries = {
  "1530-e-appleton-st": [
    {
      "src": "/images/projects/1530-e-appleton-st/photo-01.jpg",
      "alt": "Gabled front exterior with light siding and stone accents at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-06.jpg",
      "alt": "Living room with fireplace and open shelving at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-09.jpg",
      "alt": "Kitchen with wood cabinets and a white island at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-13.jpg",
      "alt": "Dining area with large windows and a patio door at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-15.jpg",
      "alt": "Walk-in pantry with wraparound shelves at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-17.jpg",
      "alt": "Bedroom with a ceiling fan and patio access at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-18.jpg",
      "alt": "Bathroom with a long vanity and separate tub at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-19.jpg",
      "alt": "Tiled shower beside the bathroom vanity at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-28.jpg",
      "alt": "Bedroom with a diagonal accent wall at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-31.jpg",
      "alt": "Covered patio beside the rear windows at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-e-appleton-st/photo-33.jpg",
      "alt": "Rear exterior and lawn at 1530 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1510-e-appleton-st": [
    {
      "src": "/images/projects/1510-e-appleton-st/photo-01.jpg",
      "alt": "Front exterior with dark garage doors and brick accents at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-05.jpg",
      "alt": "Entry with a dark wood built-in bench at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-06.jpg",
      "alt": "Open living room with a fireplace at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-09.jpg",
      "alt": "Kitchen with white cabinets and a wood island at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-14.jpg",
      "alt": "Dining area beside a glazed patio door at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-16.jpg",
      "alt": "Walk-in pantry with white shelving at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-12.jpg",
      "alt": "Bedroom with exposed ceiling beams and paneled wall at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-17.jpg",
      "alt": "Bathroom vanity beside a separate tub at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-20.jpg",
      "alt": "Tiled shower with a recessed niche at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-28.jpg",
      "alt": "Covered patio overlooking the rear lawn at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-e-appleton-st/photo-30.jpg",
      "alt": "Rear exterior with a covered patio at 1510 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "5186-n-toben-dr": [
    {
      "src": "/images/projects/5186-n-toben-dr/photo-01.jpg",
      "alt": "Front exterior with gray siding and brick accents at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-05.jpg",
      "alt": "Living room with a wood-accented fireplace at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-07.jpg",
      "alt": "Dining area beside a glazed patio door at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-09.jpg",
      "alt": "Kitchen with wood cabinets and a contrasting island at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-11.jpg",
      "alt": "Kitchen appliances and tile backsplash at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-12.jpg",
      "alt": "Bedroom with a ceiling fan and double closet doors at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-14.jpg",
      "alt": "Bathroom with a wood vanity and tub surround at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-15.jpg",
      "alt": "Closet with shelves and hanging rails at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-21.jpg",
      "alt": "Pantry with built-in shelving at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-22.jpg",
      "alt": "Covered patio overlooking the lawn at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/5186-n-toben-dr/photo-24.jpg",
      "alt": "Rear exterior and lawn at 5186 N Toben Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1510-midway-ct": [
    {
      "src": "/images/projects/1510-midway-ct/photo-01.jpg",
      "alt": "Front exterior with dark garage doors and brick accents at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-05.jpg",
      "alt": "Open living area with fireplace and adjoining kitchen at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-09.jpg",
      "alt": "White kitchen cabinetry and island at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-08.jpg",
      "alt": "Dining area with large windows and patio access at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-13.jpg",
      "alt": "Carpeted bedroom with a paneled accent wall at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-15.jpg",
      "alt": "Double vanity beside built-in closet shelving at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-16.jpg",
      "alt": "Walk-in closet with shelves and hanging rails at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-21.jpg",
      "alt": "Lower-level living area with recessed lighting at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-24.jpg",
      "alt": "Lower-level bedroom with a closet at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-28.jpg",
      "alt": "Covered raised deck with wood railing at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1510-midway-ct/photo-30.jpg",
      "alt": "Rear exterior with a raised deck at 1510 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1530-midway-ct": [
    {
      "src": "/images/projects/1530-midway-ct/photo-01.jpg",
      "alt": "Front exterior with light siding and brick accents at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-05.jpg",
      "alt": "Living room fireplace beside the island kitchen at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-10.jpg",
      "alt": "White kitchen with a dark island countertop at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-08.jpg",
      "alt": "Dining area beside large windows and a patio door at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-13.jpg",
      "alt": "Bedroom with a paneled accent wall at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-15.jpg",
      "alt": "Bathroom vanity beside a separate tub at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-19.jpg",
      "alt": "Bedroom with a diagonal accent wall at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-25.jpg",
      "alt": "Lower-level living area with recessed lighting at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-34.jpg",
      "alt": "Covered raised deck with wood railing at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-35.jpg",
      "alt": "Sheltered patio beneath the deck at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1530-midway-ct/photo-37.jpg",
      "alt": "Rear exterior with raised deck and lawn at 1530 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1520-midway-ct": [
    {
      "src": "/images/projects/1520-midway-ct/photo-01.jpg",
      "alt": "Front exterior with gray siding and brick accents at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-04.jpg",
      "alt": "Living room fireplace beside the open kitchen at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-08.jpg",
      "alt": "White island kitchen with pendant lighting at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-06.jpg",
      "alt": "Dining area with patio access at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-11.jpg",
      "alt": "Carpeted bedroom with a ceiling fan at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-13.jpg",
      "alt": "Bathroom with a light vanity and tub surround at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-19.jpg",
      "alt": "Laundry space with shelving and appliance hookups at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-21.jpg",
      "alt": "Lower-level living area with recessed lighting at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-27.jpg",
      "alt": "Lower-level bathroom with a wide vanity at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-29.jpg",
      "alt": "Covered raised deck with wood railing at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1520-midway-ct/photo-31.jpg",
      "alt": "Rear exterior with a covered deck at 1520 Midway Ct",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "2933-s-bunker-hill-dr": [
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-01.jpg",
      "alt": "Front exterior with adjoining garages and driveways at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-07.jpg",
      "alt": "Open living area looking toward an island kitchen at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-10.jpg",
      "alt": "Kitchen with white cabinets and pendant lights at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-14.jpg",
      "alt": "Bedroom with a ceiling fan and large window at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-16.jpg",
      "alt": "Bathroom vanity beside closet shelving at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-22.jpg",
      "alt": "Laundry space with shelving and appliance hookups at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-25.jpg",
      "alt": "Second interior living area looking toward the kitchen at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-29.jpg",
      "alt": "Second kitchen with an island and stainless-steel appliances at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-32.jpg",
      "alt": "Bedroom with a ceiling fan and broad window at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-34.jpg",
      "alt": "Bathroom with a light vanity and closet access at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-35.jpg",
      "alt": "Closet with hanging rails and built-in shelving at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2933-s-bunker-hill-dr/photo-42.jpg",
      "alt": "Rear exterior with gray siding and lawn at 2933 S Bunker Hill Dr",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1630-e-appleton-st": [
    {
      "src": "/images/projects/1630-e-appleton-st/photo-01.jpg",
      "alt": "Front exterior with light siding and brick accents at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-05.jpg",
      "alt": "Living room with wood built-in shelving at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-09.jpg",
      "alt": "Kitchen with wood cabinets and an island at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-07.jpg",
      "alt": "Dining area beside a glazed patio door at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-12.jpg",
      "alt": "Pantry with wraparound shelving at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-13.jpg",
      "alt": "Bedroom with ceiling beams and a diagonal accent wall at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-15.jpg",
      "alt": "Bathroom with wood cabinetry and a separate tub at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-16.jpg",
      "alt": "Tiled shower beside the bathroom tub at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-25.jpg",
      "alt": "Laundry space with a shelf and appliance hookups at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-26.jpg",
      "alt": "Covered rear patio at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1630-e-appleton-st/photo-28.jpg",
      "alt": "Rear exterior and lawn at 1630 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1640-e-appleton-st": [
    {
      "src": "/images/projects/1640-e-appleton-st/photo-01.jpg",
      "alt": "Gabled front exterior with dark garage doors at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-04.jpg",
      "alt": "Entry with dark built-in benches and cabinetry at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-05.jpg",
      "alt": "Living room fireplace framed by dark built-in shelving at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-09.jpg",
      "alt": "White kitchen cabinetry with a dark island at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-07.jpg",
      "alt": "Dining area with a patio door at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-12.jpg",
      "alt": "Pantry with wraparound shelving at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-13.jpg",
      "alt": "Bedroom with a dark diagonal accent wall at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-15.jpg",
      "alt": "Bathroom with a dark double vanity at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-16.jpg",
      "alt": "Tiled shower with a recessed niche at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-24.jpg",
      "alt": "Covered rear patio with wood posts at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1640-e-appleton-st/photo-26.jpg",
      "alt": "Rear exterior and lawn at 1640 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "1620-e-appleton-st": [
    {
      "src": "/images/projects/1620-e-appleton-st/photo-01.jpg",
      "alt": "Front exterior with an attached garage and lawn at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-04.jpg",
      "alt": "Entry with wood built-in benches and shelving at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-05.jpg",
      "alt": "Furnished living room with fireplace and wood shelving at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-07.jpg",
      "alt": "Furnished dining area beside a patio door at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-09.jpg",
      "alt": "White kitchen with a contrasting wood island at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-12.jpg",
      "alt": "Pantry with wraparound shelving at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-13.jpg",
      "alt": "Furnished bedroom with ceiling beams at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-15.jpg",
      "alt": "Bathroom with a double vanity and framed mirrors at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-16.jpg",
      "alt": "Tiled shower with a recessed niche at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-24.jpg",
      "alt": "Covered rear patio at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/1620-e-appleton-st/photo-26.jpg",
      "alt": "Rear exterior and lawn at 1620 E Appleton St",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ],
  "2121-e-cedar-tree-cir": [
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-01.jpg",
      "alt": "Front exterior with dark garage doors and brick accents at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-06.jpg",
      "alt": "Living room fireplace with open shelving beside the kitchen at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-10.jpg",
      "alt": "White kitchen with an island and pendant lighting at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-08.jpg",
      "alt": "Dining area beside a patio door at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-13.jpg",
      "alt": "Carpeted bedroom with a ceiling fan at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-16.jpg",
      "alt": "Bathroom with a wood vanity and wide mirror at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-17.jpg",
      "alt": "Bedroom with a diagonal accent wall at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-24.jpg",
      "alt": "Lower-level living area with recessed lighting at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-25.jpg",
      "alt": "Lower-level counter with a sink and open shelves at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-31.jpg",
      "alt": "Covered raised deck beside the patio door at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    },
    {
      "src": "/images/projects/2121-e-cedar-tree-cir/photo-35.jpg",
      "alt": "Rear exterior with a raised deck and lawn at 2121 E Cedar Tree Cir",
      "width": 2100,
      "height": 1400,
      "isStock": false,
      "credit": "AEV Real Estate Photography Kansas"
    }
  ]
} satisfies Record<string, SiteImage[]>;

/** Owner-supplied floor plan outlines and furnished renderings. */
export const floorPlanImages: Record<string, SiteImage> = {
  "abraham-2-car-layout-outline": {
    "src": "/images/floor-plans/abraham-2-car-layout-outline.webp",
    "alt": "The Abraham, 2-car garage — layout outline",
    "width": 1103,
    "height": 1426,
    "isStock": false
  },
  "abraham-2-car-layout-rendering": {
    "src": "/images/floor-plans/abraham-2-car-layout-rendering.webp",
    "alt": "The Abraham, 2-car garage — layout rendering",
    "width": 1103,
    "height": 1426,
    "isStock": false
  },
  "abraham-3-car-layout-outline": {
    "src": "/images/floor-plans/abraham-3-car-layout-outline.webp",
    "alt": "The Abraham, 3-car garage — layout outline",
    "width": 1166,
    "height": 1349,
    "isStock": false
  },
  "abraham-3-car-layout-rendering": {
    "src": "/images/floor-plans/abraham-3-car-layout-rendering.webp",
    "alt": "The Abraham, 3-car garage — layout rendering",
    "width": 1166,
    "height": 1349,
    "isStock": false
  },
  "adam-3-car-layout-outline": {
    "src": "/images/floor-plans/adam-3-car-layout-outline.webp",
    "alt": "The Adam, 3-car garage — layout outline",
    "width": 1219,
    "height": 1290,
    "isStock": false
  },
  "adam-3-car-layout-rendering": {
    "src": "/images/floor-plans/adam-3-car-layout-rendering.webp",
    "alt": "The Adam, 3-car garage — layout rendering",
    "width": 1219,
    "height": 1290,
    "isStock": false
  },
  "adams-2-car-layout-outline": {
    "src": "/images/floor-plans/adams-2-car-layout-outline.webp",
    "alt": "The Adams, 2-car garage — layout outline",
    "width": 1189,
    "height": 1323,
    "isStock": false
  },
  "adams-2-car-layout-rendering": {
    "src": "/images/floor-plans/adams-2-car-layout-rendering.webp",
    "alt": "The Adams, 2-car garage — layout rendering",
    "width": 1189,
    "height": 1323,
    "isStock": false
  },
  "bella-3-car-layout-outline": {
    "src": "/images/floor-plans/bella-3-car-layout-outline.webp",
    "alt": "The Bella, 3-car garage — layout outline",
    "width": 1232,
    "height": 1277,
    "isStock": false
  },
  "bella-3-car-layout-rendering": {
    "src": "/images/floor-plans/bella-3-car-layout-rendering.webp",
    "alt": "The Bella, 3-car garage — layout rendering",
    "width": 1254,
    "height": 1254,
    "isStock": false
  },
  "ceasar-3-car-layout-outline": {
    "src": "/images/floor-plans/ceasar-3-car-layout-outline.webp",
    "alt": "The Ceasar, 3-car garage — layout outline",
    "width": 1245,
    "height": 1263,
    "isStock": false
  },
  "ceasar-3-car-layout-rendering": {
    "src": "/images/floor-plans/ceasar-3-car-layout-rendering.webp",
    "alt": "The Ceasar, 3-car garage — layout rendering",
    "width": 1243,
    "height": 1265,
    "isStock": false
  },
  "dallas-duplex-2-car-layout-outline": {
    "src": "/images/floor-plans/dallas-duplex-2-car-layout-outline.webp",
    "alt": "The Dallas Duplex, 2-car garage — layout outline",
    "width": 1127,
    "height": 1396,
    "isStock": false
  },
  "dallas-duplex-2-car-layout-rendering": {
    "src": "/images/floor-plans/dallas-duplex-2-car-layout-rendering.webp",
    "alt": "The Dallas Duplex, 2-car garage — layout rendering",
    "width": 1127,
    "height": 1396,
    "isStock": false
  },
  "dixie-4-car-basement-outline": {
    "src": "/images/floor-plans/dixie-4-car-basement-outline.webp",
    "alt": "The Dixie — basement outline",
    "width": 1279,
    "height": 1230,
    "isStock": false
  },
  "dixie-4-car-basement-rendering": {
    "src": "/images/floor-plans/dixie-4-car-basement-rendering.webp",
    "alt": "The Dixie — basement rendering",
    "width": 1279,
    "height": 1230,
    "isStock": false
  },
  "dixie-4-car-main-floor-outline": {
    "src": "/images/floor-plans/dixie-4-car-main-floor-outline.webp",
    "alt": "The Dixie — main floor outline",
    "width": 1266,
    "height": 1243,
    "isStock": false
  },
  "dixie-4-car-main-floor-rendering": {
    "src": "/images/floor-plans/dixie-4-car-main-floor-rendering.webp",
    "alt": "The Dixie — main floor rendering",
    "width": 1266,
    "height": 1243,
    "isStock": false
  },
  "gilbert-3-car-basement-outline": {
    "src": "/images/floor-plans/gilbert-3-car-basement-outline.webp",
    "alt": "The Gilbert, 3-car garage — basement outline",
    "width": 1254,
    "height": 1254,
    "isStock": false
  },
  "gilbert-3-car-basement-rendering": {
    "src": "/images/floor-plans/gilbert-3-car-basement-rendering.webp",
    "alt": "The Gilbert, 3-car garage — basement rendering",
    "width": 1254,
    "height": 1254,
    "isStock": false
  },
  "gilbert-3-car-main-floor-outline": {
    "src": "/images/floor-plans/gilbert-3-car-main-floor-outline.webp",
    "alt": "The Gilbert, 3-car garage — main floor outline",
    "width": 1200,
    "height": 1310,
    "isStock": false
  },
  "gilbert-3-car-main-floor-rendering": {
    "src": "/images/floor-plans/gilbert-3-car-main-floor-rendering.webp",
    "alt": "The Gilbert, 3-car garage — main floor rendering",
    "width": 1200,
    "height": 1310,
    "isStock": false
  },
  "joseph-3-car-layout-outline": {
    "src": "/images/floor-plans/joseph-3-car-layout-outline.webp",
    "alt": "The Joseph, 3-car garage — layout outline",
    "width": 1265,
    "height": 1243,
    "isStock": false
  },
  "joseph-3-car-layout-rendering": {
    "src": "/images/floor-plans/joseph-3-car-layout-rendering.webp",
    "alt": "The Joseph, 3-car garage — layout rendering",
    "width": 1265,
    "height": 1243,
    "isStock": false
  },
  "meadow-grove-3-car-layout-outline": {
    "src": "/images/floor-plans/meadow-grove-3-car-layout-outline.webp",
    "alt": "The Meadow Grove, 3-car garage — layout outline",
    "width": 1313,
    "height": 1198,
    "isStock": false
  },
  "meadow-grove-3-car-layout-rendering": {
    "src": "/images/floor-plans/meadow-grove-3-car-layout-rendering.webp",
    "alt": "The Meadow Grove, 3-car garage — layout rendering",
    "width": 1313,
    "height": 1198,
    "isStock": false
  },
  "paddock-3-car-basement-outline": {
    "src": "/images/floor-plans/paddock-3-car-basement-outline.webp",
    "alt": "The Paddock, 3-car garage — basement outline",
    "width": 1317,
    "height": 1194,
    "isStock": false
  },
  "paddock-3-car-basement-rendering": {
    "src": "/images/floor-plans/paddock-3-car-basement-rendering.webp",
    "alt": "The Paddock, 3-car garage — basement rendering",
    "width": 1317,
    "height": 1194,
    "isStock": false
  },
  "paddock-3-car-main-floor-outline": {
    "src": "/images/floor-plans/paddock-3-car-main-floor-outline.webp",
    "alt": "The Paddock, 3-car garage — main floor outline",
    "width": 1384,
    "height": 1136,
    "isStock": false
  },
  "paddock-3-car-main-floor-rendering": {
    "src": "/images/floor-plans/paddock-3-car-main-floor-rendering.webp",
    "alt": "The Paddock, 3-car garage — main floor rendering",
    "width": 1385,
    "height": 1136,
    "isStock": false
  },
  "sham-2-car-basement-outline": {
    "src": "/images/floor-plans/sham-2-car-basement-outline.webp",
    "alt": "The Sham, 2-car garage — basement outline",
    "width": 1226,
    "height": 1283,
    "isStock": false
  },
  "sham-2-car-basement-rendering": {
    "src": "/images/floor-plans/sham-2-car-basement-rendering.webp",
    "alt": "The Sham, 2-car garage — basement rendering",
    "width": 1226,
    "height": 1283,
    "isStock": false
  },
  "sham-3-car-basement-outline": {
    "src": "/images/floor-plans/sham-3-car-basement-outline.webp",
    "alt": "The Sham, 3-car garage — basement outline",
    "width": 1208,
    "height": 1302,
    "isStock": false
  },
  "sham-3-car-basement-rendering": {
    "src": "/images/floor-plans/sham-3-car-basement-rendering.webp",
    "alt": "The Sham, 3-car garage — basement rendering",
    "width": 1208,
    "height": 1302,
    "isStock": false
  },
  "sham-3-car-main-floor-outline": {
    "src": "/images/floor-plans/sham-3-car-main-floor-outline.webp",
    "alt": "The Sham, 3-car garage — main floor outline",
    "width": 1208,
    "height": 1302,
    "isStock": false
  },
  "sham-3-car-main-floor-rendering": {
    "src": "/images/floor-plans/sham-3-car-main-floor-rendering.webp",
    "alt": "The Sham, 3-car garage — main floor rendering",
    "width": 1208,
    "height": 1302,
    "isStock": false
  },
  "ty-3-car-layout-outline": {
    "src": "/images/floor-plans/ty-3-car-layout-outline.webp",
    "alt": "The Ty, 3-car garage — layout outline",
    "width": 1264,
    "height": 1244,
    "isStock": false
  },
  "ty-3-car-layout-rendering": {
    "src": "/images/floor-plans/ty-3-car-layout-rendering.webp",
    "alt": "The Ty, 3-car garage — layout rendering",
    "width": 1265,
    "height": 1243,
    "isStock": false
  },
  "woodside-3-car-basement-outline": {
    "src": "/images/floor-plans/woodside-3-car-basement-outline.webp",
    "alt": "The Woodside, 3-car garage — basement outline",
    "width": 1200,
    "height": 1310,
    "isStock": false
  },
  "woodside-3-car-basement-rendering": {
    "src": "/images/floor-plans/woodside-3-car-basement-rendering.webp",
    "alt": "The Woodside, 3-car garage — basement rendering",
    "width": 1200,
    "height": 1310,
    "isStock": false
  },
  "woodside-3-car-main-floor-outline": {
    "src": "/images/floor-plans/woodside-3-car-main-floor-outline.webp",
    "alt": "The Woodside, 3-car garage — main floor outline",
    "width": 1254,
    "height": 1254,
    "isStock": false
  },
  "woodside-3-car-main-floor-rendering": {
    "src": "/images/floor-plans/woodside-3-car-main-floor-rendering.webp",
    "alt": "The Woodside, 3-car garage — main floor rendering",
    "width": 1254,
    "height": 1254,
    "isStock": false
  }
};
