import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { realProjects } from "@/data/portfolio";
import { realFloorPlans } from "@/data/floor-plans";
import { realAvailableHomes } from "@/data/available-homes";
import { realCommunities } from "@/data/communities";

/**
 * XML sitemap. Lists indexable pages only:
 *  - sample entries (portfolio, plans, homes, communities) are excluded — they are noindex,
 *  - real entries are added automatically from src/data/*.
 * Add new static routes to `staticRoutes`.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/custom-homes", priority: 0.9, changeFrequency: "monthly" },
  { path: "/floor-plans", priority: 0.9, changeFrequency: "weekly" },
  { path: "/available-homes", priority: 0.9, changeFrequency: "weekly" },
  { path: "/communities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/our-process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/specs-and-finishes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/finance", priority: 0.5, changeFrequency: "yearly" },
  { path: "/warranty", priority: 0.4, changeFrequency: "yearly" },
  { path: "/agents", priority: 0.3, changeFrequency: "yearly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "weekly" },
  { path: "/cost-to-build", priority: 0.8, changeFrequency: "monthly" },
  { path: "/service-areas", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...realProjects.map((p) => ({
      url: absoluteUrl(`/portfolio/${p.slug}`),
      lastModified: p.completed,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...realFloorPlans.map((p) => ({ url: absoluteUrl(`/floor-plans/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...realAvailableHomes.map((h) => ({ url: absoluteUrl(`/available-homes/${h.slug}`), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...realCommunities.map((c) => ({ url: absoluteUrl(`/communities/${c.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
