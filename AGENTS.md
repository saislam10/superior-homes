<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions (WichitaBuild.com / Superior Homes)

These patterns are deliberately business-agnostic so a sibling site (e.g. the separate roofing company site) can copy them. Do **not** couple the two businesses: no shared navigation, branding, metadata or schema.

- **Facts live in config, never in components.** Company facts: `src/config/site.ts`. Images: `src/config/images.ts`. Editable content: `src/data/*`. Unknown facts are `null`; the UI renders `<Placeholder>`/`<ValueOrPlaceholder>`, and JSON-LD omits them.
- **Never invent business facts** (credentials, years, reviews, prices, addresses, project results). Mark drafts with `needsOwnerReview`, `isSample`, `status: "proposed"` or `DraftNotice`.
- **Metadata:** every page exports `metadata = buildMetadata({...})` from `src/lib/seo.ts` with a unique title, description and `path`.
- **Structured data:** build with `src/lib/structured-data.ts`, render with `<JsonLd>` only. Trusted data only.
- **Server Components by default.** Client components so far: `NavLink`, `MobileMenu`, `ContactForm`, `error.tsx`.
- **Listings** (floor plans, available homes, communities, portfolio) are data files in `src/data/` with `isSample` flags; samples must stay `noindex` and out of the sitemap.
- **Brand assets** are generated from `brand-source/`; colors in `globals.css` derive from the logo (navy `brand-*`, green `leaf-*`, neutrals `mist-*`). `leaf-500` is decorative only.
- **Cache Components is on:** no `dynamicParams`; `generateStaticParams` must return ≥ 1 entry; avoid `Date.now()`/`new Date()` in prerendered render paths.
- **Validate before handing off:** `npm run check` (typecheck + lint + build).
- **Before starting work,** read README.md → "Project history and key decisions", "Current state" and "Continuing development". Verify with `npm run check` and `node scripts/smoke-test.mjs`.
