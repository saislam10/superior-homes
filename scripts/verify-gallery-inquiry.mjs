import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

// Start the app with CONTACT_DELIVERY_PROVIDER=webhook and
// CONTACT_WEBHOOK_URL=http://127.0.0.1:3013. All submissions stay on this machine.
const base = process.env.BASE_URL ?? 'http://localhost:3011';
if (process.argv.includes('--screenshots-only')) {
  const previewBrowser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await previewBrowser.newPage();
    await page.goto(`${base}/available-homes/mls-680733`, { waitUntil: 'networkidle' });
    const gallery = page.locator('main [aria-roledescription="carousel"]');
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('button[aria-label^="Show photo"] img')].filter(image => {
      const bounds = image.getBoundingClientRect();
      return bounds.left < innerWidth && bounds.right > 0 && bounds.top < innerHeight && bounds.bottom > 0;
    }).every(image => image.complete && image.naturalWidth > 0));
    await gallery.screenshot({ path: 'listing-source/mls/slideshow-preview.png' });
    await gallery.getByRole('button', { name: /^Enlarge photo / }).click();
    await page.getByRole('dialog').screenshot({ path: 'listing-source/mls/slideshow-enlarged-preview.png' });
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/contact?mls=680733#form-heading`, { waitUntil: 'networkidle' });
    await page.locator('form').screenshot({ path: 'listing-source/mls/property-inquiry-preview.png' });
  } finally { await previewBrowser.close(); }
  process.exit(0);
}
const received = [];
let failNext = false;
const receiver = http.createServer(async (request, response) => {
  let body = '';
  for await (const chunk of request) body += chunk;
  received.push(JSON.parse(body));
  response.writeHead(failNext ? 500 : 200, { 'Content-Type': 'application/json' });
  response.end('{}');
  failNext = false;
});
await new Promise(resolve => receiver.listen(3013, '127.0.0.1', resolve));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const showCount = async (region, position, total) => {
    await region.locator('p[aria-live]').filter({ hasText: new RegExp(`^${position} / ${total}$`) }).waitFor();
  };
  const mlsImages = JSON.parse(await fs.readFile('src/config/mls-images.json', 'utf8'));

  for (const [path, count] of [
    ['/available-homes/mls-680733', mlsImages['680733'].length],
    ['/floor-plans/dixie-4-car', 4],
    ['/portfolio/1530-e-appleton-st', null],
  ]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const region = page.locator('main [aria-roledescription="carousel"]').first();
    const total = count ?? await region.getByRole('button', { name: /^Show photo / }).count();
    assert.ok(total > 1);
    await showCount(region, 1, total);
    await region.getByRole('button', { name: 'Next photo', exact: true }).click();
    await showCount(region, 2, total);
    await page.keyboard.press('ArrowLeft');
    await showCount(region, 1, total);
    await region.getByRole('button', { name: `Show photo ${total}`, exact: true }).click();
    await showCount(region, total, total);
    await region.getByRole('button', { name: 'Next photo', exact: true }).click();
    await showCount(region, 1, total);
    await region.getByRole('button', { name: /^Enlarge photo / }).click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor();
    await dialog.getByRole('button', { name: 'Next photo', exact: true }).click();
    assert.ok((await dialog.innerText()).includes(`2 / ${total}`));
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    assert.ok((await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))).startsWith('Enlarge photo'));
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
  }

  await page.setViewportSize({ width: 320, height: 900 });
  for (const index of ['/available-homes', '/floor-plans', '/portfolio']) {
    await page.goto(base + index, { waitUntil: 'networkidle' });
    const region = page.locator('main article [aria-roledescription="carousel"]').first();
    await region.getByRole('button', { name: 'Next photo', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, index, 'card controls must not follow the stretched link');
    await region.getByRole('button', { name: /^Enlarge photo / }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Close slideshow' }).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false);
  }
  await page.goto(`${base}/available-homes/mls-680733`, { waitUntil: 'networkidle' });
  const region = page.locator('main [aria-roledescription="carousel"]');
  await region.evaluate(element => {
    const frame = element.firstElementChild;
    const start = Object.assign(new Event('touchstart', { bubbles: true }), { touches: [{ clientX: 250, clientY: 100 }] });
    const end = Object.assign(new Event('touchend', { bubbles: true }), { changedTouches: [{ clientX: 100, clientY: 105 }] });
    frame.dispatchEvent(start);
    frame.dispatchEvent(end);
  });
  await showCount(region, 2, mlsImages['680733'].length);

  await page.goto(`${base}/available-homes/mls-678333`, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('main [aria-roledescription="carousel"]').getByRole('button', { name: 'Next photo' }).count(), 0);
  await page.locator('main').getByRole('link', { name: 'Ask about this property', exact: true }).click();
  await page.locator('#mlsNumber').waitFor();
  assert.equal(await page.inputValue('#mlsNumber'), '678333');
  assert.ok((await page.inputValue('#details')).includes('5900 S Meridian'));
  // A second property must replace the first prefill on client navigation.
  await page.goto(`${base}/available-homes/mls-680733`, { waitUntil: 'networkidle' });
  const emailHref = await page.getByRole('link', { name: 'Email us', exact: true }).getAttribute('href');
  assert.ok(decodeURIComponent(emailHref).includes('MLS #680733'));
  await page.locator('section[aria-labelledby="cta-heading"]').getByRole('link', { name: 'Start a Conversation', exact: true }).click();
  await page.locator('#mlsNumber').waitFor();
  assert.equal(await page.inputValue('#mlsNumber'), '680733');
  assert.ok((await page.inputValue('#details')).includes('1630 Midway Ct.'));
  await page.fill('#name', 'Gallery Test');
  await page.fill('#email', 'gallery-test@example.com');
  const question = 'Could I arrange a viewing this Saturday afternoon?';
  await page.fill('#details', question); // Intentionally remove the MLS from the editable message.
  await page.waitForTimeout(3300);
  failNext = true;
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.getByText('Something went wrong and your message was not sent.', { exact: true }).waitFor();
  assert.equal(await page.inputValue('#mlsNumber'), '680733');
  assert.equal(await page.inputValue('#details'), question);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.getByText('Thank you — we received your message.', { exact: true }).waitFor();
  assert.equal(received.length, 2);
  for (const payload of received) {
    assert.equal(payload.mlsNumber, '680733');
    assert.ok(payload.details.includes('Property: 1630 Midway Ct., Valley Center, KS 67147'));
    assert.ok(payload.details.includes('MLS #: 680733'));
    assert.ok(payload.details.includes('/available-homes/mls-680733'));
    assert.ok(payload.details.endsWith(question));
  }

  await page.goto(`${base}/contact`, { waitUntil: 'networkidle' });
  assert.equal(await page.inputValue('#mlsNumber'), '');
  assert.equal(await page.inputValue('#details'), '');
  await page.fill('#mlsNumber', '999999');
  await page.fill('#name', 'Gallery Test');
  await page.fill('#email', 'gallery-test@example.com');
  await page.fill('#details', question);
  await page.waitForTimeout(3300);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await page.locator('#mlsNumber-error').waitFor();
  assert.equal(received.length, 2, 'unknown MLS must not be sent');
  assert.deepEqual(errors, []);
  console.log('Slideshows passed: detail pages, cards, arrows, thumbnails, keyboard, swipe, enlarged view, single-photo listings and mobile layout.');
  console.log('MLS inquiries passed: prefill, trusted address/MLS/link in local test payload, failed-delivery retry, general form reset and unknown-MLS rejection.');
  await browser.close();
  await new Promise((resolve, reject) => {
    const smoke = spawn(process.execPath, ['scripts/smoke-test.mjs'], { env: { ...process.env, BASE_URL: base }, stdio: 'inherit' });
    smoke.on('error', reject);
    smoke.on('exit', code => code === 0 ? resolve() : reject(Error(`Smoke test exited ${code}`)));
  });
} finally {
  await browser.close();
  await new Promise(resolve => receiver.close(resolve));
}
