# Owner-supplied MLS inventory

The owner identified this public report as the company's available homes and properties and authorized extraction and use on the site:

https://sckmls.paragonrels.com/paragonls/publink/view.mvc/?GUID=f5a7a951-9e42-4c09-8604-f820559dd242&Report=Yes

The 2026-10-27 snapshot contains 62 active listings: 55 residential, 4 multi-family, and 3 land. Some package listings cover properties also listed individually; counts are MLS listings, not unique homes. The previously supplied rental (MLS 679433) was removed at the owner request; all current inventory is for sale.

- `manifest.json`: source link, retrieval timestamp and all listing IDs.
- `<MLS>.html`: original public report for that listing.
- `<MLS>-gallery.html`: original public photo gallery.
- `extracted.json`: complete extracted descriptions, labeled fields, positioned report text, photo URLs and provenance.
- `listings.csv`: spreadsheet export of core specifications, descriptions and source links.
- `summary.json`: compact audit of all 62 extracted records.
- `index.html`: report navigation markup with runtime scripts removed, so visitor tracking metadata is not archived.
- Site data: `src/data/mls-inventory.json`; image registry: `src/config/mls-images.json`, exported through `src/config/images.ts`.
- Photos: 1,100 supplied images in `public/images/listings/`, optimized to WebP at the supplied dimensions (about 26.7 MB total).

The report uses positioned text and different layouts for residential, multi-family and land. The extractor pairs labels with values by their position, distinguishes total floor area from lot area, combines full/half bathroom counts, and preserves continuation lines. Missing fields remain null. Multi-family bedroom/bath counts are not inferred from unit counts. Land never uses lot area as living area. Public website/address display flags are checked before importing.

The site labels the records as for sale, preserving the source's Active status without claiming every home is move-in ready. Source descriptions retain construction information; a specific completion date is not invented. Source dates and direct report links are shown on detail pages. This is a snapshot, not a live MLS feed.

To refresh:

1. Run `./scripts/import-mls-reports.ps1 -Refresh` (network access required). The current script deliberately checks for 62 listings; review changes to the source list before adjusting the guard.
2. Run `node scripts/extract-mls-reports.mjs > listing-source/mls/summary.json` and review field mappings and counts.
3. Run `node scripts/import-mls-photos.mjs` (network access required). This reuses existing local photos; if photos change, review and replace the relevant listing's local files before importing.
4. Run `node scripts/build-mls-inventory.mjs` to refresh site data and CSV.
5. Run `npm run check` and `node scripts/smoke-test.mjs` against a running build; validate representative residential, multi-family and land detail pages.
