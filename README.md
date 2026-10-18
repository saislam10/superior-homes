# WichitaBuild.com — Superior Homes

Marketing website for **Superior Homes**, a custom home builder serving Wichita, Kansas, and surrounding communities. The site is published at **https://wichitabuild.com** and replaces the company's previous website at `superiorhomesks.com`.

The page set and homepage flow follow the structure of [lckansas.com](https://www.lckansas.com/) (floor plans, available homes, communities, specs & finishes, finance, warranty, agents). The messaging leads with custom building, and all copy, imagery and branding belong to Superior Homes; nothing was copied from that site.

> **Status: pre-launch.** The site is built and passes its checks, but contains clearly marked placeholders (yellow dashed boxes) for business facts that have not been supplied yet. Search engine indexing is **off by default** until it is explicitly enabled. See the [pre-launch checklist](#pre-launch-checklist).

---

## Contents

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
- [Known limitations](#known-limitations)

---

## Tech stack

- **Next.js 16** (App Router, Turbopack, Cache Components enabled) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **lucide-react** icons; fonts via `next/font` (Geist for text, Marcellus for headings, chosen to echo the logo lettering; self-hosted at build)
- No UI framework, no CMS, no client-side data fetching. Every page is prerendered to static HTML.

> **Note for developers/agents:** Next.js 16 differs from earlier versions. Version-matched docs ship in `node_modules/next/dist/docs/`. With Cache Components enabled, for example, `dynamicParams` is not allowed and `generateStaticParams` must return at least one entry.

## Getting started

**Requires Node.js 20.9 or newer** (tested with Node 25 / npm 11).

```bash
npm install
cp .env.example .env.local   # optional; everything works with no env vars
npm run dev                  # http://localhost:3000
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

## Environment variables

All are optional. See `.env.example` for the full annotated list.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin. Defaults to `https://wichitabuild.com`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | build | Must be `true` for search engines to index the site. **Set only on production, after launch checklist.** |
| `CONTACT_DELIVERY_PROVIDER` | server | `webhook` or `resend`. Unset = form delivery disabled (visitors are told their message was not sent). |
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
    service-areas.ts       ★ Communities (confirmed vs. proposed)
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
  lib/
    seo.ts                 buildMetadata(): titles, canonicals, Open Graph, robots
    structured-data.ts     JSON-LD builders (verified facts only)
    contact/               Validation (shared client/server) and delivery integration
public/brand/              Logo variants generated from the original artwork
brand-source/              Original logo file (source of truth for brand assets)
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

All images are referenced through **`src/config/images.ts`**. The current images are licensed Unsplash stock photos, flagged `isStock: true`, used for visual direction only; nowhere does the site present them as the company's work.

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
- **Available homes** (`src/data/available-homes.ts`): address, city, links to a community and plan, `status` (`available`, `under-construction`, `pending`, `sold`), specs, price (or `null`), estimated completion. Inventory goes stale fast, so update status promptly. Sold homes are `noindex` and drop out of listings.
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

If a higher-resolution or vector (SVG/AI/EPS) logo is available, regenerate these from it. The source PNG is only 560 × 560.

The color palette in `globals.css` is derived from the logo: navy `#1E1C58` (primary), green `#4EB748` (accent; decorative use only, since it fails text contrast on white), and a deeper green `#2E7A2A` for green text.

## Contact form

`/contact` uses a React Server Action (`src/app/contact/actions.ts`):

- **Validation:** shared rules in `src/lib/contact/schema.ts` run in the browser for instant feedback *and* authoritatively on the server. The form also works without JavaScript.
- **Delivery:** `src/lib/contact/delivery.ts` is the single integration point.
  - `CONTACT_DELIVERY_PROVIDER=webhook` → JSON `POST` to `CONTACT_WEBHOOK_URL` (HubSpot, a CRM inbound webhook, Zapier/Make, or your own endpoint). Optional `CONTACT_WEBHOOK_SECRET` is sent as a bearer token.
  - `CONTACT_DELIVERY_PROVIDER=resend` → plain-text email through the [Resend](https://resend.com) API. Verify the sending domain in Resend first.
  - **Unset → nothing is sent**, and the visitor is told plainly that their message was *not* sent and how to reach the company directly. The site never claims a delivery that didn't happen.
  - To add another provider, add a `case` in `deliverContact()` that returns `{ status: "delivered" | "failed" | "not_configured" }`.
- **Privacy:** the app does not store or log submissions; it only passes them to the configured provider. Server logs record provider failures without personal data.
- **Anti-spam (built in):** a hidden honeypot field, and a time trap rejecting submissions made < 3 s after the form loaded.
- **Anti-spam (still to configure):** for production traffic, add [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) (verify its token in `actions.ts`) and/or rate limiting at your host or edge (e.g. Vercel Firewall, Cloudflare WAF rules). In-memory rate limiting is not reliable on serverless hosting, so it isn't included.

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

## Known limitations

- `npm audit` reports high-severity advisories in `braces` via `eslint-config-next`. These are development-only lint dependencies and are not shipped to the browser or server. The suggested `--force` fix downgrades Next's ESLint config to v14, so it hasn't been applied. Re-check when `eslint-config-next` updates.
- Stock images are served from Unsplash through Next.js image optimization until replaced with local project photos.
