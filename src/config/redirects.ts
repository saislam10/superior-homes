/**
 * Redirect configuration, consumed by next.config.ts.
 *
 * Two kinds of redirects live here:
 *
 * 1. `legacyPathMap` — old superiorhomesks.com paths mapped to their most
 *    relevant new page. Populate this from a crawl of the old site (see
 *    README → "Domain migration"). Map each old URL to the closest
 *    equivalent page — not blindly to the homepage.
 *
 * 2. Host-level rules (built in `buildRedirects`) that send any other
 *    request on the legacy domain to the same path on wichitabuild.com.
 *    These only take effect if the old domain is pointed at THIS
 *    deployment. If the old domain stays on separate hosting, configure
 *    equivalent 301s there instead, using the same map.
 *
 * Every destination is a final URL (no chains), and `validateRedirects`
 * fails the build if a loop or chain is introduced.
 */

type HostCondition = { type: "host"; value: string };

export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
  has?: HostCondition[];
};

export const PRIMARY_HOST = "wichitabuild.com";
export const LEGACY_HOSTS = ["superiorhomesks.com", "www.superiorhomesks.com"];

/**
 * Old path → new path. Keys are paths on the legacy site; values are paths
 * on wichitabuild.com. The examples below are COMMENTED OUT because the old
 * site's real URLs have not been audited yet. Do not guess.
 */
export const legacyPathMap: Record<string, string> = {
  // "/about-us": "/about",
  // "/contact-us": "/contact",
  // "/floor-plans": "/custom-homes",
  // "/gallery": "/portfolio",
  // "/our-homes": "/portfolio",
  // "/areas-we-serve": "/service-areas",
};

/**
 * Same-domain redirects for URLs that change on wichitabuild.com itself
 * (e.g. if a page is renamed later). Keep destinations final.
 */
export const internalRedirects: { source: string; destination: string }[] = [];

export function buildRedirects(): RedirectRule[] {
  validateRedirects();
  const redirects: RedirectRule[] = [];

  // www → apex on the new domain (harmless if the host already handles it).
  redirects.push({
    source: "/:path*",
    has: [{ type: "host", value: `www.${PRIMARY_HOST}` }],
    destination: `https://${PRIMARY_HOST}/:path*`,
    permanent: true,
  });

  for (const host of LEGACY_HOSTS) {
    // Specific old → new mappings first (first match wins).
    for (const [from, to] of Object.entries(legacyPathMap)) {
      redirects.push({
        source: from,
        has: [{ type: "host", value: host }],
        destination: `https://${PRIMARY_HOST}${to}`,
        permanent: true,
      });
    }
    // Paths that were later renamed on the new site go straight to their
    // final destination, avoiding a legacy -> old path -> new path chain.
    for (const r of internalRedirects) {
      redirects.push({
        source: r.source,
        has: [{ type: "host", value: host }],
        destination: `https://${PRIMARY_HOST}${r.destination}`,
        permanent: true,
      });
    }
    // Everything else keeps its path on the new domain. Unknown paths will
    // 404 there (with helpful links) rather than soft-redirecting to "/".
    redirects.push({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `https://${PRIMARY_HOST}/:path*`,
      permanent: true,
    });
  }

  for (const r of internalRedirects) {
    redirects.push({ source: r.source, destination: r.destination, permanent: true });
  }

  return redirects;
}

/** Throws if any redirect would loop or chain into another redirect. */
export function validateRedirects(): void {
  const internalSources = new Set(internalRedirects.map((r) => r.source));

  for (const [from, to] of Object.entries(legacyPathMap)) {
    if (!from.startsWith("/") || !to.startsWith("/")) {
      throw new Error(`[redirects] Paths must start with "/": ${from} -> ${to}`);
    }
    if (internalSources.has(to)) {
      throw new Error(`[redirects] Chain detected: legacy ${from} -> ${to}, which is itself redirected. Point it at the final URL.`);
    }
  }
  for (const r of internalRedirects) {
    if (r.source === r.destination) throw new Error(`[redirects] Loop: ${r.source} redirects to itself.`);
    if (internalSources.has(r.destination)) {
      throw new Error(`[redirects] Chain detected: ${r.source} -> ${r.destination}, which is itself redirected.`);
    }
  }
}
