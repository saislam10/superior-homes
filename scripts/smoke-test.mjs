/**
 * Browser smoke test against a running production build.
 *
 * Checks every page at several viewport widths for horizontal overflow and
 * console errors, then exercises the mobile menu, skip link and contact form.
 *
 * Setup (one time, not a project dependency):
 *   npm install --no-save playwright-core
 * Run:
 *   npm run build && npm start            # in one terminal (port 3000)
 *   node scripts/smoke-test.mjs           # in another
 *
 * Env:
 *   BASE_URL     default http://localhost:3000
 *   CHROME_PATH  path to a local Chrome/Edge executable. Defaults to the
 *                standard Windows Chrome location; on macOS use
 *                "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome".
 *
 * Exits non-zero if any check fails.
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const pages = [
  "/", "/custom-homes", "/floor-plans", "/available-homes", "/communities", "/our-process",
  "/specs-and-finishes", "/cost-to-build", "/finance", "/warranty", "/agents", "/portfolio",
  "/service-areas", "/about", "/contact", "/privacy", "/terms",
];
const widths = [320, 390, 768, 1024, 1440];

const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log("FAIL", msg);
};

const browser = await chromium.launch({ executablePath: CHROME });

// Detail pages: pick up the first link of each listing type from its index.
{
  const page = await browser.newPage();
  for (const index of ["/floor-plans", "/available-homes", "/communities", "/portfolio"]) {
    await page.goto(BASE + index);
    const href = await page.locator(`main a[href^="${index}/"]`).first().getAttribute("href");
    if (href) pages.push(href);
  }
  await page.close();
}

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  page.on("console", (m) => m.type() === "error" && fail(`console error @${w}px ${page.url()}: ${m.text()}`));
  page.on("pageerror", (e) => fail(`page error @${w}px ${page.url()}: ${e.message}`));
  for (const p of pages) {
    const res = await page.goto(BASE + p, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) fail(`HTTP ${res?.status()} ${p}`);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    if (overflow) fail(`horizontal overflow @${w}px ${p}`);
    const h1s = await page.locator("h1").count();
    if (w === 1440 && h1s !== 1) fail(`${p} has ${h1s} <h1> elements`);
  }
  await ctx.close();
}

// Mobile menu: opens, closes on Escape.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu" }).click();
  if (!(await page.locator("nav[aria-label=Mobile]").isVisible())) fail("mobile menu did not open");
  await page.keyboard.press("Escape");
  if (!(await page.locator("nav[aria-label=Mobile]").isHidden())) fail("mobile menu did not close on Escape");
  await page.close();
}

// Skip link is the first tab stop.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const text = await page.evaluate(() => document.activeElement?.textContent?.trim());
  if (text !== "Skip to main content") fail(`first tab stop is "${text}"`);
  await page.close();
}

// Contact form: invalid submit shows errors and focuses first field;
// a valid submit returns an honest delivery result.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Send message" }).click();
  if ((await page.locator("#name").getAttribute("aria-invalid")) !== "true") fail("empty form: name not invalid");
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("name"));
  if (focused !== "name") fail(`empty form: focus on "${focused}", expected "name"`);

  await page.waitForTimeout(3200); // pass the anti-spam time trap
  await page.fill("#name", "Smoke Test");
  await page.fill("#email", "smoke-test@example.com");
  await page.fill("#details", "Automated smoke test submission — please ignore.");
  await page.getByRole("button", { name: "Send message" }).click();
  const result = page.getByText(/was not sent|received your message|went wrong/);
  try {
    await result.first().waitFor({ timeout: 10000 });
    console.log("form result:", (await result.first().textContent())?.trim().slice(0, 100));
  } catch {
    fail("contact form: no result message after valid submit");
  }
  await page.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s)` : `\nAll checks passed (${pages.length} pages × ${widths.length} widths).`);
process.exit(failures.length ? 1 : 0);
