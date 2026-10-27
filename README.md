# WichitaBuild.com — Superior Homes

Marketing website for **Superior Homes**, a custom home builder serving Wichita, Kansas, and surrounding communities. The site is published at **https://wichitabuild.com** and replaces the company's previous website at `superiorhomesks.com`.

The page set and homepage flow follow the structure of [lckansas.com](https://www.lckansas.com/) (floor plans, available homes, communities, specs & finishes, finance, warranty, agents). The messaging leads with custom building, and all copy, imagery and branding belong to Superior Homes; nothing was copied from that site.

> **Status: pre-launch.** The site is built and passes its checks, but contains clearly marked placeholders (yellow dashed boxes) for business facts that have not been supplied yet. Search engine indexing is **off by default** until it is explicitly enabled. See the [pre-launch checklist](#pre-launch-checklist).

---

## Contents

- [Project history and key decisions](#project-history-and-key-decisions)
- [Current state](#current-state)
- [Previous website review](#previous-website-review)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Commands](#commands)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Updating content](#updating-content)
- [Contact form](#contact-form)
- [SEO](#seo)
- [Analytics and search monitoring](#analytics-and-search-monitoring)
- [Deployment](#deployment)
- [Domain migration (superiorhomesks.com → wichitabuild.com)](#domain-migration-superiorhomeskscom--wichitabuildcom)
- [Pre-launch checklist](#pre-launch-checklist)
- [Continuing development](#continuing-development)
- [Testing and verification](#testing-and-verification)
- [Roadmap / next steps](#roadmap--next-steps)
- [Known limitations](#known-limitations)

---

## Project history and key decisions

Read this first if you are picking the project up. These decisions were made deliberately; don't undo them without checking with the owner.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-17 | Built from an empty repo on Next.js 16 / React 19 / Tailwind v4, every page statically prerendered. | Fast, cheap to host, SEO-friendly; no CMS needed at this size. |
| 2026-10-17 | **Never invent business facts.** Unknown facts are `null` and render as yellow placeholders; samples are labeled and `noindex`. | Required by the original brief. The site must not claim credentials, prices, reviews, projects or stats that aren't verified. |
| 2026-10-17 | **Naming:** the company is **Superior Homes**; the website/domain is **WichitaBuild.com**. | Clarified by the owner. The original brief implied the brand itself was "WichitaBuild"; that is no longer the case. |
| 2026-10-17 | **Brand palette and logo come from the owner's logo** (navy `#1E1C58`, green `#4EB748`). Source Sans 3 and Lora provide a clear, warm typographic voice. | Owner supplied the logo and asked for the theme to be built around it; both fonts use the SIL Open Font License. |
| 2026-10-17 | **Site map and homepage flow modeled on [lckansas.com](https://www.lckansas.com/)** (floor plans, available homes, communities, specs & finishes, finance, warranty, agents). | Owner request. |
| 2026-10-17 | **Hybrid positioning:** LC's page set and homepage order, but messaging leads with custom building; plans and inventory are presented as starting points you can customize. | Owner chose this over a full production-builder model, to stay consistent with the brief's move away from cookie-cutter subdivision homes. |
| 2026-10-17 | **Kept the existing visual style** (editorial, generous whitespace) rather than copying LC's look; no LC copy, photos or branding were reused. | Owner chose "keep current aesthetic"; copying another company's content would also raise copyright and misrepresentation issues. |
| 2026-10-17 | **Search indexing off by default** (`NEXT_PUBLIC_ALLOW_INDEXING`). | So previews full of placeholders never get indexed. |
| 2026-10-17 | Contact form **never claims delivery** unless a provider confirms it. | Honesty requirement in the brief. |

A separate **roofing company website** is planned as its own project. Do not add roofing services, navigation, branding or schema here. Engineering patterns (config-driven facts, placeholder components, `buildMetadata`, JSON-LD builders) can be copied to that project, but the two sites should not share code or content at runtime.

## Current state

As of 2026-10-17:

- **Done:** all 21 page templates (41 prerendered routes including sample detail pages), design system, logo/favicons, SEO (metadata, canonicals, sitemap, robots, JSON-LD), redirect framework for the old domain, contact form with validation and a pluggable delivery integration, documentation.
- **Verified:** `npm run check` passes (typecheck, lint, build). `scripts/smoke-test.mjs` passes on 21 pages × 5 viewport widths with no horizontal overflow or console errors; mobile menu, skip link and contact form behave correctly. Lighthouse (production build): Accessibility 100, Best Practices 100; Performance 91–97 on mobile, 100 on desktop; SEO 100 with indexing enabled (it reads ~69 by design while `noindex` is on). The SEO 100 figure was measured before the LC-style pages were added; re-run it with indexing enabled to confirm.
- **Not done (needs the owner or external accounts):** every item in the [pre-launch checklist](#pre-launch-checklist): real business details, real listings and photos, legal review, contact delivery provider, spam protection, hosting, domains, Search Console, old-site URL inventory.
- **Repository:** [github.com/saislam10/superior-homes](https://github.com/saislam10/superior-homes), default branch `main`.

## Previous website review

The previous public site at [superiorhomesks.com](https://superiorhomesks.com/) was reviewed for content relevant to this custom-home site. Candidate facts and claims are stored in `src/data/previous-site-review.ts` and appear only in visible draft notices. They are not treated as verified company facts, inserted into `siteConfig`, or emitted in structured data.

- **Contact details confirmed by owner:** use `(316) 440-6000` and `kansashomes1@gmail.com`, now set in `src/config/site.ts`. The old site's conflicting phone number is historical only. Its office address and weekday hours with weekends by appointment still need confirmation.
- **Past build locations:** the old site shows work associated with Wichita, Derby, Bel Aire and Haysville. These are signals of past activity, not confirmation of current service coverage; they remain proposed until the owner confirms them.
- **Feature claims:** the old homepage mentions energy-efficient windows, granite countertops throughout and LED lighting. Confirm what is currently standard before adding these to Specs & Finishes.
- **Financing claims:** the old homepage says no construction loan is needed, a small deposit can start a project, and Superior Homes finances construction until closing. These are significant financial claims; confirm the current policy and review wording before publication.
- **Process copy:** the old process page includes useful stage names, but also mentions New Home Centers, Flat Branch Home Loans and Schuber Mitchell homeowners. Its descriptive copy is not safe to reuse as Superior Homes policy.
- **Portfolio:** the old Our Homes page contains more than 100 home entries with details and third-party tour links. Add projects only after confirming details and obtaining homeowner permission for identifiable information and photography.
- **Out of scope:** the old site also advertises remodeling, painting and roofing. Those services were not added here; roofing belongs to its separate website. The old blog and legal copy were not imported.

## Tech stack

- **Next.js 16** (App Router, Turbopack, Cache Components enabled) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **lucide-react** icons; fonts via `next/font` (Source Sans 3 for text and Lora for headings; both self-hosted at build and licensed under SIL OFL 1.1)
- No UI framework, no CMS, no client-side data fetching. Every page is prerendered to static HTML.

> **Note for developers/agents:** Next.js 16 differs from earlier versions. Version-matched docs ship in `node_modules/next/dist/docs/`. With Cache Components enabled, for example, `dynamicParams` is not allowed and `generateStaticParams` must return at least one entry.

## Getting started

**Requires Node.js 20.9 or newer** (tested with Node 25 / npm 11).

```bash
npm install
cp .env.example .env.local   # optional; everything works with no env vars
npm run dev                  # http://localhost:3011
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (prerenders every page) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm run check` | Typecheck + lint + build — run before every deploy |
| `node scripts/smoke-test.mjs` | Browser smoke test against a running build (see [Testing](#testing-and-verification)) |
| `python scripts/generate-brand-assets.py` | Regenerate logo variants and favicons from `brand-source/` |

## Environment variables

All are optional. See `.env.example` for the full annotated list.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin. Defaults to `https://wichitabuild.com`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | Must be `true` for search engines to index the site. **Set only on production, after launch checklist.** |
| `CONTACT_DELIVERY_PROVIDER` | server | `hubspot`, `webhook` or `resend`. Unset = form delivery disabled (visitors are told their message was not sent). |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID` | server | HubSpot account portal ID and the HubSpot consultation form ID. |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | server | Webhook delivery target and optional bearer token. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | Email delivery via Resend. |
| `GOOGLE_SITE_VERIFICATION` | build | Search Console meta-tag token. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | build | GA4 ID. No analytics script loads when unset. |

`NEXT_PUBLIC_*` values are baked in at build time — **redeploy after changing them**. Never put secrets in a `NEXT_PUBLIC_` variable. Server-only secrets are read exclusively in `src/lib/contact/delivery.ts` (guarded by `server-only`).

## Project structure

```
src/
  app/                     Routes (each folder = URL), layout, sitemap.ts, robots.ts, icon.png/apple-icon.png/favicon.ico
    contact/               Contact page, client form, server action
    floor-plans/[slug]/    Floor plan detail template
    available-homes/[slug]/ Listing detail template
    communities/[slug]/    Community detail template
    portfolio/[slug]/      Project detail template
  components/
    layout/                Header, mobile menu, footer, logo, analytics loader
    sections/              Page-level sections (hero, CTA, process overview, legal shell…)
    ui/                    Buttons, fields, cards, breadcrumbs, FAQ, JSON-LD, placeholders
  config/
    site.ts                ★ Company name, domain, phone, email, address, social links
    navigation.ts          Header/footer/legal navigation
    images.ts              ★ Every image URL + alt text, in one place
    service-areas.ts       ★ Towns served (confirmed vs. proposed)
    redirects.ts           ★ Old-site → new-site redirect map
  data/
    floor-plans.ts         ★ Floor plans (drives /floor-plans and detail pages)
    available-homes.ts     ★ Move-in-ready / under-construction inventory
    communities.ts         ★ Neighborhoods and developments
    company-stats.ts       ★ Homepage stats bar (years, homes built)
    specs.ts               ★ Standard specifications by category
    portfolio.ts           ★ Projects (drives /portfolio and /portfolio/[slug])
    faqs.ts                ★ FAQ content
    process.ts             ★ Building-process stages
    cost-factors.ts        Cost-to-build guide content
    approach.ts            "Why Superior Homes" points
    previous-site-review.ts Prior-site facts and claims marked for owner review
  lib/
    seo.ts                 buildMetadata(): titles, canonicals, Open Graph, robots
    structured-data.ts     JSON-LD builders (verified facts only)
    contact/               Validation (shared client/server) and delivery integration
public/brand/              Logo variants generated from the original artwork
brand-source/              Original logo file (source of truth for brand assets)
scripts/
  generate-brand-assets.py Rebuilds public/brand/* and favicons from brand-source/
  smoke-test.mjs           Playwright-based browser checks (optional tooling)
AGENTS.md                  Conventions for AI coding agents (top block is managed by Next.js)
```

★ = files the business is most likely to edit.

## Updating content

### Company details

Edit **`src/config/site.ts`**. Unknown values are `null`:

- In the UI, `null` renders a visible yellow placeholder such as `[Phone number — to be provided]`.
- In structured data, `null` values are **omitted** — nothing unverified is published to search engines.

Fill in values only with information confirmed by the owner. **Do not guess phone numbers or addresses.** If the business is a service-area business without a public storefront, leave `address` as `null` and keep it consistent with the Google Business Profile.

Naming convention used throughout: `name` = **Superior Homes** (the company: copy, page titles, Organization schema, legal pages); `siteName` = **WichitaBuild.com** (the website: Open Graph site name, WebSite schema).

### Images

All images are referenced through **`src/config/images.ts`**. Owner-supplied photography for **13 portfolio projects** in Bel Aire, Valley Center, Wichita and Park City is stored locally in `public/images/projects/` and registered as `remingtonGallery`, `forbesGallery` and `portfolioGalleries` with `isStock: false`. These galleries appear in the portfolio; the homepage uses the Remington exterior and living room. The Bunker Hill project includes units 100 and 200 together, matching its source gallery. Photo sources and import details are recorded in `public/images/projects/README.md`. Prices, availability, completion dates and numerical specifications have not been inferred from the photos.

Remaining Unsplash stock photos are flagged `isStock: true` and used for visual direction or clearly marked sample entries. Sample projects remain accessible at their existing URLs but are omitted from the portfolio grid while real projects are available.

To swap in real photography:

1. Add optimized files to `public/images/...` (JPEG/WebP, ≤ ~2400 px wide).
2. Change the entry's `src` (e.g. `/images/projects/oak-ridge/exterior.jpg`), rewrite `alt` to describe the actual photo, set `isStock: false`.
3. Once no Unsplash URLs remain, remove the `images.unsplash.com` entry from `next.config.ts`.

### Portfolio

Edit **`src/data/portfolio.ts`**. Each entry becomes a page at `/portfolio/<slug>`.

- `isSample: true` entries show an "Illustrative sample" badge and notice, are `noindex`, and are excluded from the sitemap and structured data.
- To publish a real project, add an entry with `isSample: false`, real photos, and owner-confirmed details (location, specs, completion date). It is automatically added to the sitemap and gets `CreativeWork` structured data.
- Delete the samples once real projects exist. **Keep at least one project in the array** — with Cache Components, an empty `generateStaticParams` is a build error.
- Get homeowner permission before publishing identifiable details or exact addresses.

### FAQs, process, service areas

- **FAQs** (`src/data/faqs.ts`): entries with `needsOwnerReview: true` show a "Draft — owner to confirm" badge and are excluded from FAQPage schema. Remove the flag once confirmed.
- **Process** (`src/data/process.ts`): a general outline. Edit to match how the company really works, then set `processReviewedByOwner = true` to remove the draft notice.
- **Service areas** (`src/config/service-areas.ts`): only Wichita is `confirmed` (it is named in the brief). Everything else is `proposed` and visibly marked. Change each to `confirmed` or delete it. Only confirmed areas appear in `areaServed` schema.

### Floor plans, available homes, communities

All three work the same way as the portfolio: edit the data file, and pages, cards, homepage rows and sitemap entries follow automatically.

- **Floor plans** (`src/data/floor-plans.ts`): name, beds/baths/sq ft, stories, garage, description, customization ideas, photos. `startingPrice` stays `null` (shown as "Contact for pricing") unless the owner provides a current figure.
- **Available homes** (`src/data/available-homes.ts`): the current inventory contains sale listings only; rentals were removed at the owner request. The data model retains separate rental pricing and terms for possible future use. Rentals can include monthly rent, deposit, lease term, application fee, pet policy and utilities. Use `null` for MLS details that are not provided; update availability promptly because listings go stale. Sold or leased homes are `noindex` and drop out of the active listings.
- **Communities** (`src/data/communities.ts`): name, city, description and highlights. Only list places the company actually builds, each with genuinely unique details. `/service-areas` lists towns; communities are specific neighborhoods or developments.
- Entries with `isSample: true` are badged, `noindex` and kept out of the sitemap and homepage counts. Remove them once real entries exist, but keep at least one entry in each file (Cache Components build requirement).
- The homepage "Looking for something specific?" inventory band appears automatically once at least one real (non-sample) home is listed.

### Stats bar, specs, finance, warranty, agents

- **Stats bar** (`src/data/company-stats.ts`): plan and community counts come from real data; years of experience and homes built are `null` (placeholders) until the owner confirms them.
- **Specs & finishes** (`src/data/specs.ts`): fill each category's `items` with what is actually included as standard.
- **Finance, Warranty, Agents** pages (`src/app/finance`, `src/app/warranty`, `src/app/agents`) contain general guidance plus placeholders for company-specific terms (preferred lender, warranty coverage, agent policies).
- **Visiting hours** (`site.ts → contact.visitingHours`) appear in the closing call-to-action when set. The CTA's "Call us" / "Email us" buttons appear once phone and email are configured.

### Logo and favicon

The logo comes from the owner-supplied artwork in `brand-source/superior-homes-logo-original.png`. Variants generated from it:

| File | Use |
| --- | --- |
| `public/brand/superior-homes-logo-horizontal.png` | Header (mark beside wordmark) |
| `public/brand/superior-homes-logo-horizontal-light.png` | Footer / dark backgrounds (wordmark recolored white) |
| `public/brand/superior-homes-logo.png`, `…-light.png` | Original stacked lockup, trimmed |
| `public/brand/superior-homes-logo-512.png` | Square logo on white, used in Organization schema |
| `public/brand/superior-homes-mark-house.png` | The large house from the logo, isolated |
| `src/app/icon.png`, `apple-icon.png`, `favicon.ico` | Favicons: the large house on a navy tile |

If a higher-resolution or vector (SVG/AI/EPS) logo becomes available, export a transparent PNG with the same layout, save it over `brand-source/superior-homes-logo-original.png`, and run `python scripts/generate-brand-assets.py` (needs `pip install Pillow`). If the new artwork's layout differs, adjust the coordinates at the top of the script. The current source PNG is only 560 × 560, which limits sharpness on large retina displays.

The color palette in `globals.css` is derived from the logo: navy `#1E1C58` (primary), green `#4EB748` (accent; decorative use only, since it fails text contrast on white), and a deeper green `#2E7A2A` for green text.

## Contact form

`/contact` uses a React Server Action (`src/app/contact/actions.ts`):

- **Validation:** shared rules in `src/lib/contact/schema.ts` run in the browser for instant feedback *and* authoritatively on the server. The form also works without JavaScript.
- **Delivery:** `src/lib/contact/delivery.ts` is the single integration point.
  - `CONTACT_DELIVERY_PROVIDER=hubspot` → submits the consultation to a HubSpot form using `HUBSPOT_PORTAL_ID` and `HUBSPOT_FORM_ID`. No private app token is needed. The HubSpot form must include `firstname`, `lastname`, `email`, `phone`, and the custom contact properties `intended_build_location`, `lot_status`, `approximate_budget`, `desired_timeline`, and `project_details`. Make `lastname`, `phone`, and the custom properties optional; use text fields for the custom properties so the form accepts the site's existing answers. The form's internal property names must match exactly.
  - `CONTACT_DELIVERY_PROVIDER=webhook` → JSON `POST` to `CONTACT_WEBHOOK_URL` (HubSpot, a CRM inbound webhook, Zapier/Make, or your own endpoint). Optional `CONTACT_WEBHOOK_SECRET` is sent as a bearer token.
  - `CONTACT_DELIVERY_PROVIDER=resend` → plain-text email through the [Resend](https://resend.com) API. Verify the sending domain in Resend first.
  - **Unset → nothing is sent**, and the visitor is told plainly that their message was *not* sent and how to reach the company directly. The site never claims a delivery that didn't happen.
  - To add another provider, add a `case` in `deliverContact()` that returns `{ status: "delivered" | "failed" | "not_configured" }`.
- **Privacy:** the app does not store or log submissions; it only passes them to the configured provider. Server logs record provider failures without personal data.
- **Anti-spam (built in):** a hidden honeypot field, and a time trap rejecting submissions made < 3 s after the form loaded.
- **Anti-spam (still to configure):** for production traffic, add [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (verify its token in `actions.ts`) and/or rate limiting at your host or edge (e.g. Vercel Firewall, Cloudflare WAF rules). In-memory rate limiting is not reliable on serverless hosting, so it isn't included.

To connect HubSpot, create a form in HubSpot with the property names above, then copy its portal ID and form ID into the deployment's server environment variables. If the HubSpot form requires consent fields, add matching consent capture to this page before making the form live; this page currently has a privacy notice but no consent checkbox.

The budget ranges in the form are visitor self-reported choices, not company prices. Edit `budgetOptions` in `schema.ts` as you see fit.

## SEO

- **Metadata:** each page calls `buildMetadata()` (`src/lib/seo.ts`) for a unique title, description, canonical URL, Open Graph and Twitter cards. Title template: `Page | Superior Homes`.
- **Canonicals** resolve against `NEXT_PUBLIC_SITE_URL` (default `https://wichitabuild.com`).
- **`/sitemap.xml`** lists indexable pages only and picks up real portfolio projects automatically. Add new static routes to `staticRoutes` in `src/app/sitemap.ts`.
- **`/robots.txt`** disallows everything until `NEXT_PUBLIC_ALLOW_INDEXING=true`; then it allows all and links the sitemap. Pages also carry `noindex` while indexing is off.
- **Structured data (JSON-LD):** a `GeneralContractor` organization and a `WebSite` on every page; `BreadcrumbList` on interior pages; `FAQPage` where FAQs appear (reviewed answers only); `CreativeWork` on real project pages. No ratings, reviews, prices, coordinates or hours are emitted. Telephone, email, address and `sameAs` appear automatically once set in `site.ts`. (Google may warn about the missing address in its Rich Results test until one is confirmed or the business is configured as service-area only. That warning is expected.)
- **JSON-LD rendering** uses `dangerouslySetInnerHTML` *only* in `src/components/ui/JsonLd.tsx`, with developer-controlled data and `<` escaped, following the Next.js guidance. Never pass user input to it.
- **Future location pages:** set `hasPage` on a service area and create a route only when there is genuinely unique, useful content for that community (lots, developments, permitting specifics, real projects there). Avoid templated "city + keyword" pages.

## Analytics and search monitoring

1. **Google Search Console:** add a *Domain* property for `wichitabuild.com` (DNS TXT verification, recommended), or a URL-prefix property using the HTML tag: set `GOOGLE_SITE_VERIFICATION` and redeploy. After launch, submit `https://wichitabuild.com/sitemap.xml`. Keep (or create) a property for `superiorhomesks.com` too, so you can use the **Change of Address** tool.
2. **Google Analytics 4 (optional):** set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` and redeploy. The loader (`src/components/layout/Analytics.tsx`) renders nothing when unset. Before enabling, update the privacy policy and decide whether you need a consent banner. Privacy-friendly alternatives (Plausible, Fathom, Vercel Analytics) can be added in the same component.
3. **Core Web Vitals:** watch the Search Console *Core Web Vitals* report, or enable your host's speed insights.

## Deployment

Works on any host that supports Next.js 16 (Vercel, Netlify, AWS Amplify, or a Node server with `npm run build && npm start`).

**Vercel (simplest):**

1. Import the repository. The framework preset is detected automatically.
2. Set environment variables for **Production** (`NEXT_PUBLIC_ALLOW_INDEXING=true` only there, once ready) and leave indexing unset for **Preview**.
3. Add `wichitabuild.com` and `www.wichitabuild.com` as domains, with the apex as primary.
4. Point DNS at the host as instructed and confirm HTTPS.

**Self-hosted Node:** `npm ci && npm run build && npm start` behind a reverse proxy that terminates TLS. Set env vars before building.

Security headers (HSTS, `nosniff`, frame-blocking, referrer and permissions policies) are set in `next.config.ts`. A full script `Content-Security-Policy` is not enabled, because it requires per-request nonces that would make every page dynamic. Revisit this if third-party scripts are added.

## Domain migration (superiorhomesks.com → wichitabuild.com)

The goal is to keep the search equity and inbound links of the old domain by sending each old URL **directly** (one 301/308 hop) to its closest equivalent on the new site.

### 1. Inventory the old site (before changing anything)

- Crawl `superiorhomesks.com` (Screaming Frog, Sitebulb, or similar) and export every URL.
- Export top pages and inbound links from the old Search Console property and analytics.
- Note pages with traffic or backlinks; those need careful mapping.

### 2. Build the redirect map

Fill in `legacyPathMap` in **`src/config/redirects.ts`**:

```ts
export const legacyPathMap: Record<string, string> = {
  "/about-us": "/about",
  "/gallery": "/portfolio",
  "/contact-us": "/contact",
};
```

Map each URL to its **most relevant** new page, not blanket redirects to `/`. Any old path not in the map is redirected to the **same path** on the new domain (`superiorhomesks.com/about` → `wichitabuild.com/about`). If that path doesn't exist, the visitor gets a helpful 404 page instead of a misleading homepage redirect.

`validateRedirects()` runs at build time and **fails the build** if a mapping creates a loop or a chain. If a page on the new site is later renamed, add it to `internalRedirects`; legacy requests are then sent straight to the final URL.

### 3. Point the old domain at the redirects

The redirects in this repo only fire for requests that reach this deployment. Choose one:

- **A. (Recommended)** Add `superiorhomesks.com` and `www.superiorhomesks.com` as domains on the same hosting project, update their DNS, and make sure SSL certificates are issued for them. The host-based rules in `redirects.ts` handle the rest.
- **B.** Keep the old domain on its current host and configure equivalent 301 redirects there, using the same map.

DNS, registrar, hosting and SSL changes for the old domain are made outside this repository. **Renew `superiorhomesks.com` and keep the redirects in place long-term (at least a year, ideally indefinitely).**

### 4. Verify and notify Google

- Spot-check redirects: `curl -I https://superiorhomesks.com/some-old-page` should return a single `308`/`301` to the final `https://wichitabuild.com/...` URL.
- In the **old** Search Console property, use **Settings → Change of Address** to point to `wichitabuild.com`.
- Submit the new sitemap in the new property and monitor *Pages* and *Crawl stats* for 404s over the following weeks; add mappings for any that matter.
- Update the **Google Business Profile** website link to `https://wichitabuild.com` (same profile, so don't create a new one). Then add its URL to `googleBusinessProfileUrl` in `site.ts`.
- Update the website link on social profiles, directories (Houzz, BBB, HBA listings, etc.), email signatures and printed materials.

## Pre-launch checklist

Information required from the owner (each item is currently a visible placeholder or a draft marker):

- [ ] **Phone number** and **inquiry email** (`site.ts → contact`)
- [ ] **Address**, or confirmation that the business is service-area only (must match the Google Business Profile)
- [ ] **Legal entity name** (e.g. "Superior Homes, LLC"), if it differs from the company name
- [ ] **Office hours** (optional)
- [ ] **Google Business Profile URL** and any **social media profiles** the company controls
- [ ] **Service areas**: confirm or remove each "proposed" community
- [ ] **About page**: company story, years of experience, owner/team names, roles, bios and photos
- [ ] **Licensing, insurance, memberships**: only those that can be verified
- [ ] **Warranty** details (FAQ placeholder)
- [ ] **Process**: confirm or edit the seven stages, then set `processReviewedByOwner = true`
- [ ] **FAQs** marked "Draft": confirm or rewrite each, then remove `needsOwnerReview`
- [ ] **"Why Superior Homes" points** (`data/approach.ts`) and contact-page follow-up commitments: confirm they reflect actual practice
- [ ] **Real project photos and details**, with homeowner permission, to replace samples
- [ ] **Floor plans**: real plan names, specs, drawings/photos (and starting prices only if they will be kept current)
- [ ] **Available homes inventory**: addresses, status, specs, photos, pricing (or "contact for pricing")
- [ ] **Communities**: real neighborhoods/developments with unique details
- [ ] **Stats**: years of experience and homes built (verifiable numbers only)
- [ ] **Standard specifications** for each category on Specs & Finishes, and selection process details
- [ ] **Preferred lender(s)**, if any, with required disclosures
- [ ] **Agent policies**: registration, compensation, showings
- [ ] **Visiting / model home hours**, if applicable
- [ ] **Higher-resolution or vector logo**, if available
- [ ] **Privacy Policy and Terms of Use** reviewed by an attorney; fill in placeholders and set "last updated" dates
- [ ] **Contact form delivery** configured and a test submission received
- [ ] **Spam protection** (Turnstile and/or rate limiting) configured
- [ ] **Old-site URL inventory** completed and `legacyPathMap` filled in
- [ ] **Analytics decision** made and privacy policy updated accordingly

Technical go-live steps:

- [ ] `npm run check` passes
- [ ] Production env: `NEXT_PUBLIC_ALLOW_INDEXING=true`, delivery variables set; preview env: indexing unset
- [ ] Domains + SSL live for `wichitabuild.com`, `www.wichitabuild.com`, and the legacy domains
- [ ] Search Console verified, sitemap submitted, Change of Address filed
- [ ] Google Business Profile website link updated
- [ ] Search the codebase for `null` values in `site.ts` and yellow placeholders on every page; none should remain

## Continuing development

### Conventions (follow these)

- **Facts live in config/data, never in components.** Business facts: `src/config/site.ts`. Images: `src/config/images.ts`. Content: `src/data/*`. Components only render.
- **Unknown = `null`.** Render unknowns with `<ValueOrPlaceholder>` or `<Placeholder>` (`src/components/ui/Placeholder.tsx`). Mark whole sections that need owner input with `<DraftNotice>`. Never fill a gap with a plausible-sounding guess.
- **Samples are flagged.** Listing data uses `isSample`; FAQs use `needsOwnerReview`; service areas use `status: "proposed"`. Flagged content must stay visibly labeled, `noindex`, and out of the sitemap and JSON-LD.
- **Every page exports metadata** via `buildMetadata({ title, description, path, image?, noIndex? })` from `src/lib/seo.ts`. Titles must be unique; keep them under ~60 characters including the ` | Superior Homes` suffix.
- **One `<h1>` per page**, normally rendered by `<PageHero>`, which also renders breadcrumbs and their JSON-LD.
- **Server Components by default.** Client components are limited to navigation controls, `ContactForm`, `PhotoSlideshow` and `error.tsx`; keep data loading and page templates on the server.
- **Structured data** goes through `src/lib/structured-data.ts` and renders only via `<JsonLd>`. Trusted data only.
- **Copy tone:** plain, warm, specific; no superlatives ("best builder in Wichita"), no keyword stuffing, no unverifiable claims.

### Next.js 16 / Cache Components gotchas

- `export const dynamicParams` is **not allowed**. Unknown slugs fall through to `notFound()`.
- `generateStaticParams` must return **at least one** entry, so keep at least one item in each listing data file.
- Avoid `Date.now()` / `new Date()` in prerendered render paths (the footer has no year for this reason). Inside server actions it's fine.
- Route props use the global helpers `PageProps<"/route/[slug]">` and `LayoutProps<"/">`; `params` is a Promise.
- When unsure, read the version-matched docs in `node_modules/next/dist/docs/` rather than relying on memory of older Next.js versions.

### Design system

- **Tokens** (`src/app/globals.css`, Tailwind v4 `@theme`):
  - Colors: `brand-50…900` (navy), `leaf-300/500/700` (green), `mist-100…500` (cool neutrals), `ink`, `ink-muted`, `ink-subtle`, `canvas`, `surface`, plus `draft-*` for placeholders.
  - Fonts: `font-display` (Lora) and the default sans (Source Sans 3).
- **Contrast rules:** `leaf-500` (logo green) is decorative only (2.6:1 on white). Use `leaf-700` for green text on light backgrounds and `leaf-300` on navy. All current text pairs pass WCAG AA.
- **Building blocks:**
  - `Section` (tones: `canvas`, `white`, `mist`, `navy`), `SectionHeading` (eyebrow + title + intro)
  - `Container`, `ButtonLink` / `Button` / `TextLink`
  - `PageHero`, `ConsultationCta`
  - `FloorPlanCard`, `HomeCard`, `CommunityCard`, `ProjectCard`, `SpecRow`, `StatusBadge`
  - `FaqList`, `Breadcrumbs`, `TextField` / `SelectField` / `TextAreaField`
- **Layout rhythm:** `section-y` utility for section padding, `max-w-site` container, `rounded-card` radius. The desktop nav appears at `xl` (1280px); below that the menu button is used.

### Common tasks

**Add a new page**

1. Create `src/app/<slug>/page.tsx`. Export `metadata = buildMetadata({ title, description, path: "/<slug>" })`.
2. Start the page with `<PageHero eyebrow title intro breadcrumbs={[{ name, path }]} />`, then `<Section>` blocks, usually ending with `<ConsultationCta />`.
3. Add the path to `staticRoutes` in `src/app/sitemap.ts`.
4. Add it to `mainNav`, `secondaryNav` and/or `footerNav` in `src/config/navigation.ts`. Keep `mainNav` to about 6 items or the header will crowd.
5. Add it to the `pages` list in `scripts/smoke-test.mjs`, then run `npm run check` and the smoke test.

**Add a new listing type** (e.g. "Lots for sale"): copy the floor-plans pattern.

1. Data file with a type, an `isSample` flag, `realX` and `getX(slug)` helpers.
2. Card component in `Listing.tsx`.
3. Index page plus a `[slug]/page.tsx` with `generateStaticParams`, `generateMetadata` (`noIndex: isSample`) and `notFound()`.
4. Sitemap entries for real items only.

**Change contact details or hours:** edit `src/config/site.ts`. Phone and email automatically appear in the footer, contact page, closing CTA buttons and JSON-LD.

**Replace stock photos:** see [Images](#images). Update `alt` text to describe the real photo.

**Rename or move a page:** add an entry to `internalRedirects` in `src/config/redirects.ts`, update navigation and the sitemap, and search the codebase for hard-coded links to the old path.

**Connect the contact form:** set the env vars in [Contact form](#contact-form) on the host, redeploy, send a test, and confirm it arrives.

### Troubleshooting

- **Build error about `generateStaticParams` returning an empty array:** a listing data file has no entries left; keep at least one.
- **Build error from `[redirects]`:** a redirect map entry creates a loop or chain; point it at the final URL.
- **Remote image fails to load:** its host is missing from `images.remotePatterns` in `next.config.ts`.
- **Changes to `NEXT_PUBLIC_*` vars have no effect:** they're inlined at build time; rebuild/redeploy.
- **`next dev` re-adds a block to `AGENTS.md`:** expected; Next manages that block. Commit it.

## Testing and verification

There is no unit-test suite; the code is mostly declarative content. Verification is done with:

1. **`npm run check`.** Typecheck, lint and production build. Required before every deploy.
2. **Browser smoke test (`scripts/smoke-test.mjs`).** Run it after any layout, navigation or form change:
   ```bash
   npm install --no-save playwright-core   # one-time; not a project dependency
   npm run build && npm start              # terminal 1
   node scripts/smoke-test.mjs             # terminal 2 (BASE_URL / CHROME_PATH env vars optional)
   ```
   It checks every page at 320/390/768/1024/1440px for HTTP 200, horizontal overflow, console errors and a single `<h1>`, then tests the mobile menu, skip link and contact form. Uses your locally installed Chrome; no browser download.
3. **Lighthouse.** Use a production build. Build with `NEXT_PUBLIC_ALLOW_INDEXING=true` when measuring SEO, otherwise the deliberate `noindex` lowers the score:
   ```bash
   npx lighthouse http://localhost:3011/ --preset=desktop --view
   ```
4. **Manual checks after content changes:** look for leftover yellow placeholders, read new copy for unverified claims, and check that new images have accurate alt text.
5. **After launch:** Google's [Rich Results Test](https://search.google.com/test/rich-results) on the homepage and a project page; `curl -I` spot-checks of old-domain redirects; Search Console coverage and Core Web Vitals reports.

## Roadmap / next steps

In rough priority order:

1. ~~Make the initial git commit and push to a remote.~~ Done.
2. **Collect owner information** (pre-launch checklist) and replace placeholders. Start with contact details, logo source file, service areas and real listings, which unlock the most content.
3. **Deploy a preview** (e.g. Vercel) with indexing off, for owner review.
4. **Connect contact delivery** (Resend or CRM webhook) and add Cloudflare Turnstile.
5. **Crawl `superiorhomesks.com`** and fill in `legacyPathMap`.
6. **Replace stock imagery** with real project photography as it becomes available.
7. **Legal review** of Privacy and Terms; decide on analytics and consent.
8. **Launch:** domains, `NEXT_PUBLIC_ALLOW_INDEXING=true`, Search Console, sitemap, Change of Address, Google Business Profile link.
9. **Post-launch options** (only if the business wants them):
   - A headless CMS or simple admin for listings, if inventory changes too often for code edits.
   - Filtering on Available Homes (by community, beds, status).
   - Downloadable floor-plan PDFs or drawings.
   - `RealEstateListing`/`Offer` schema on real listings, once pricing is maintained.
   - Unique location pages for confirmed communities with real content.
   - Testimonials (verified, with permission).

## Known limitations

- `npm audit` reports high-severity advisories in `braces` via `eslint-config-next`. These are development-only lint dependencies and are not shipped to the browser or server. The suggested `--force` fix downgrades Next's ESLint config to v14, so it hasn't been applied. Re-check when `eslint-config-next` updates.
- Stock images are served from Unsplash through Next.js image optimization until replaced with local project photos.
- The logo source is a 560 × 560 PNG; logos and favicons are only as sharp as that source allows.
- The stats bar, Specs & Finishes, Warranty, Finance and Agents pages are mostly placeholders until the owner provides content. They are structurally complete but not publishable as-is.
- No script Content-Security-Policy (see [Deployment](#deployment)), and no rate limiting on the contact form yet.

### Owner-supplied floor plan library

The floor plan section now uses 42 owner-supplied outlines and furnished renderings across 16 plan/garage variants. Main-floor and basement drawings are grouped on the same detail page. All drawings display uncropped and link to full-size images. Assets and source filenames are documented in public/images/floor-plans/README.md; image references live in src/config/images.ts. Owner-supplied bedroom/bath counts, square footage, attached garage details and basement status are recorded for all 16 plans in src/data/floor-plans.ts. The Abraham 2-car and 3-car variants share the same specifications apart from garage size; all plans are owner-confirmed ranch style with 2 floors, while prices remain null. Basement status is stored separately exactly as supplied; the owner confirmed Adam and both Abraham variants have no basement. The owner confirmed Dixie has a 4-car attached garage, matching its drawings. Dallas Duplex is listed with two 2-car attached garages; its supplied totals are not divided per unit.

### Available homes and property inventory

The owner's public MLS report now supplies 62 active sale listings: 55 residential, 4 multi-family and 3 land, with 1,100 locally optimized listing photos. All rentals and illustrative sale listings were removed at the owner request. The index groups homes, multi-family properties and land separately; detail pages include descriptions, all extracted labeled MLS details, source links and the checked date. Active means for sale, without assuming move-in readiness. Package listings can overlap individual listings, so counts refer to MLS listings. This is a dated snapshot, not a live feed. Spreadsheet export, original reports, complete extraction data and refresh instructions are in listing-source/mls/README.md. Site records are in src/data/mls-inventory.json; photo references are registered through src/config/images.ts.

### Slideshows and property inquiries

`PhotoSlideshow` provides click-through photos on property, floor plan and portfolio cards and detail pages. It includes previous/next buttons, thumbnails on detail pages, keyboard arrows/Home/End, touch swipes, an enlarged dialog with Escape/close and focus restoration, and full-size image links. Photos do not advance automatically. Single-photo entries hide previous/next controls. Every supplied image remains accessible, including the cover image.

Property inquiry links use `/contact?mls=<number>#form-heading`. The contact form resolves the MLS against current listing data inside a Suspense boundary, displays the selected address and MLS, and prefills the message. On submission, the server validates the MLS and independently adds the trusted address, MLS number and listing URL to `details`; the visitor can rewrite the question without losing that context. The webhook receives `mlsNumber` as a separate field, HubSpot receives the property context in `project_details` without needing new CRM fields, and email subjects include the MLS. Direct email links on property pages also include the MLS and address. General inquiries can leave the MLS blank. Unknown MLS numbers are rejected; failed deliveries retain the user's message and selection. Online delivery still depends on the provider configuration described above.

`scripts/verify-gallery-inquiry.mjs` tests slideshows, card controls, mobile layouts, MLS prefill and delivery retries, and then runs the standard smoke test. For delivery verification only, start the app with `CONTACT_DELIVERY_PROVIDER=webhook` and `CONTACT_WEBHOOK_URL=http://127.0.0.1:3013`; the test starts a local receiver so no test messages go to the business or an external provider. These test settings should not be saved to the production environment.
