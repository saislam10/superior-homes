/**
 * Central business configuration.
 *
 * Every business fact used by the site (UI, metadata and JSON-LD) comes from
 * this file. Unknown values are `null` on purpose:
 *   - The UI renders a clearly marked placeholder for `null` values.
 *   - Structured data (JSON-LD) omits `null` values entirely, so nothing
 *     unverified is ever published to search engines.
 *
 * Replace each `null` only with information confirmed by the business owner.
 * See README.md → "Pre-launch checklist".
 */

export type SocialProfile = {
  /** Display label, e.g. "Facebook". */
  label: string;
  url: string;
};

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

export const siteConfig = {
  /** Company name. Used in copy, page titles, legal pages and Organization schema. */
  name: "Superior Homes",
  /** Website name (the domain brand). Used for Open Graph site name and WebSite schema. */
  siteName: "WichitaBuild.com",
  /** Registered legal entity name (e.g. "Superior Homes, LLC"), if different. Confirm with owner. */
  legalName: null as string | null,
  tagline: "Custom homes built around you",
  description:
    "Superior Homes designs and builds personalized custom homes in Wichita, Kansas, and surrounding communities — planned around your vision, your lifestyle, and your budget.",

  /**
   * Canonical production origin. Can be overridden per environment with
   * NEXT_PUBLIC_SITE_URL (e.g. for staging), but canonical URLs should
   * point at the production domain once launched.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://wichitabuild.com").replace(/\/+$/, ""),
  /** The company's previous website domain. Used for redirect configuration and documentation only. */
  legacyDomain: "superiorhomesks.com",

  locale: "en_US",

  contact: {
    /** E.164 or display format. Example: "+1-316-555-0100". Do NOT guess. */
    phone: null as string | null,
    /** Public inbox for inquiries. Do NOT guess. */
    email: null as string | null,
    /**
     * Physical/mailing address. Leave `null` if the business is a
     * service-area business that does not publish a street address
     * (this should match the Google Business Profile configuration).
     */
    address: null as PostalAddress | null,
    /** Free-text office hours, e.g. "Mon–Fri, 8am–5pm". Omitted from schema until confirmed. */
    hours: null as string | null,
    /** Model home / showroom visiting hours, e.g. "Sat & Sun, 1–5pm". Shown in the CTA when set. */
    visitingHours: null as string | null,
  },

  /** The primary market, used in copy. This much is given in the project brief. */
  primaryMarket: {
    city: "Wichita",
    region: "Kansas",
    regionCode: "KS",
  },

  /** Google Business Profile URL (the "Share" link from the profile). */
  googleBusinessProfileUrl: null as string | null,

  /** Social profiles. Add only accounts the business actually controls. */
  social: [] as SocialProfile[],

  /** Square logo on white, used in Organization schema. Source artwork: brand-source/. */
  logoPath: "/brand/superior-homes-logo-512.png",
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds an absolute URL on the canonical domain. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

/**
 * Whether search engines may index the site.
 *
 * Defaults to `false` so preview/staging deployments full of placeholder
 * content are never indexed by accident. Set NEXT_PUBLIC_ALLOW_INDEXING=true
 * on the production deployment only, after the pre-launch checklist is done.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
