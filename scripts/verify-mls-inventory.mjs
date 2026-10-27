import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { chromium } from 'playwright-core';

const source = JSON.parse(await fs.readFile('listing-source/mls/extracted.json', 'utf8'));
const inventory = JSON.parse(await fs.readFile('src/data/mls-inventory.json', 'utf8'));
const images = JSON.parse(await fs.readFile('src/config/mls-images.json', 'utf8'));
assert.equal(inventory.length, 62);
assert.equal(new Set(inventory.map(r => r.mlsNumber)).size, 62);
let photoCount = 0;
for (const listing of source.records) {
  const published = inventory.find(r => r.mlsNumber === listing.mlsNumber);
  assert.ok(published, `Missing MLS ${listing.mlsNumber}`);
  for (const key of ['address','price','beds','baths','sqft','description']) assert.equal(published[key], listing[key], `${listing.mlsNumber}: ${key}`);
  assert.equal(published.listingType, 'sale');
  assert.equal(images[listing.mlsNumber].length, listing.photoUrls.length);
  for (const image of images[listing.mlsNumber]) {
    const actual = await sharp(`public${image.src}`).metadata();
    assert.equal(actual.width, image.width);
    assert.equal(actual.height, image.height);
    photoCount++;
  }
}
assert.equal(photoCount, 1100);
const base = process.env.BASE_URL ?? 'http://localhost:3011';
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto(`${base}/available-homes`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('main article').count(), 62);
  assert.equal(await page.locator('main a[href*="rental"]').count(), 0);
  assert.equal(await page.locator('main').getByText(/illustrative sample|for rent|plus rental/i).count(), 0);
  const sourceIds = new Set(source.records.map(r => r.mlsNumber));
  const links = await page.locator('main article h3 a').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
  assert.equal(links.length, 62);
  for (const link of links) {
    const response = await page.request.get(base + link);
    assert.equal(response.status(), 200, link);
    assert.ok(sourceIds.has(link.replace('/available-homes/mls-', '')));
  }
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ['680733','678246','669029']) {
      await page.goto(`${base}/available-homes/mls-${id}`, { waitUntil: 'networkidle' });
      await page.getByText('All MLS property details', { exact: true }).click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `${id}: overflow at ${width}`);
      const gallery = page.locator('main [aria-roledescription="carousel"]');
      assert.equal(await gallery.getByRole('button', { name: /^Show photo / }).count(), images[id].length, `${id}: all gallery thumbnails`);
      if (id !== '680733') assert.equal(await page.locator('main').getByText('Not provided', { exact: false }).count(), 0, `${id}: irrelevant bedroom placeholders`);
      if (width === 1440) await page.screenshot({ path: `listing-source/mls/preview-${id}.png`, fullPage: false });
    }
  }
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  for (const record of inventory) assert.ok(sitemap.includes(`/available-homes/${record.slug}`));
  assert.ok(!sitemap.includes('679433'));
  assert.ok(!sitemap.includes('sample-home'));
  assert.deepEqual(errors, []);
  console.log(`Verified ${inventory.length} sale listings, ${photoCount} local photos, every detail URL, sitemap, and residential/multi-family/land layouts at 320 and 1440px.`);
} finally { await browser.close(); }
