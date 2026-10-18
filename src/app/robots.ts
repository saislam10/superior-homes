import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/config/site";

/**
 * robots.txt. Blocks all crawling unless NEXT_PUBLIC_ALLOW_INDEXING=true,
 * so previews and staging deployments are never indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
