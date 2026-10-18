import { absoluteUrl, siteConfig } from "@/config/site";
import { confirmedServiceAreas } from "@/config/service-areas";
import type { Faq } from "@/data/faqs";
import type { Project } from "@/data/portfolio";

/**
 * JSON-LD builders.
 *
 * Rules:
 *  - Only verified facts from src/config/site.ts are emitted.
 *  - `null` config values are omitted, never filled with placeholders.
 *  - No ratings, reviews, prices, coordinates or opening hours unless they
 *    are verified and added to config deliberately.
 */

type JsonLd = Record<string, unknown>;

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Removes keys whose values are null, undefined or empty arrays. */
function compact<T extends JsonLd>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0),
    ),
  ) as T;
}

export function organizationSchema(): JsonLd {
  const { contact } = siteConfig;
  return compact({
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.logoPath),
    description: siteConfig.description,
    telephone: contact.phone,
    email: contact.email,
    address: contact.address ? { "@type": "PostalAddress", ...contact.address } : null,
    areaServed: confirmedServiceAreas.map((area) => ({
      "@type": "City",
      name: `${area.name}, ${siteConfig.primaryMarket.regionCode}`,
    })),
    sameAs: [
      ...siteConfig.social.map((s) => s.url),
      ...(siteConfig.googleBusinessProfileUrl ? [siteConfig.googleBusinessProfileUrl] : []),
    ],
  });
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: siteConfig.siteName,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** FAQPage schema. Entries still awaiting owner review are excluded. */
export function faqSchema(faqs: Faq[]): JsonLd | null {
  const reviewed = faqs.filter((f) => !f.needsOwnerReview);
  if (reviewed.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: reviewed.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/**
 * Structured data for a real (non-sample) portfolio project. Returns null
 * for sample entries so illustrative content is never marked up.
 */
export function projectSchema(project: Project, path: string): JsonLd | null {
  if (project.isSample) return null;
  return compact({
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(path),
    image: project.gallery.map((img) => img.src),
    creator: { "@id": ORG_ID },
    dateCreated: project.completed ?? null,
    locationCreated: { "@type": "Place", name: project.location },
  });
}

/** Wraps nodes into a single @graph document. Null nodes are dropped. */
export function graph(...nodes: (JsonLd | null)[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is JsonLd => n !== null),
  };
}
