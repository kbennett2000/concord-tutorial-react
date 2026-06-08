// Regenerate every README screenshot against a LIVE Concord. MAINTAINER tooling only.
// Usage: npm run shots   (needs: npm install, npx playwright install, Concord on :8000)
// Drives the real lesson pages with Playwright so every shot shows real Scripture and real
// responses — the same approach as course 1's tools/screenshots/.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import { startServer } from "./server.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", ".."); // repo root
const LESSONS = join(ROOT, "lessons");
const DOCS = join(ROOT, "docs");
const PORT = 8099; // maintainer server port — unrelated to the learner's :5500
const VIEWPORT = { width: 760, height: 600 };

const img = (lesson, name) => join(LESSONS, lesson, "images", name);

// PW_CHANNEL lets a maintainer drive a system browser (e.g. PW_CHANNEL=chrome) when Playwright's
// bundled Chromium isn't available; default is Playwright's own Chromium.
const launchOpts = process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {};

// Wait until the three compare columns carry the divine-name contrast (real Concord data).
const columnsReady = () => {
  const cols = document.querySelectorAll(".col");
  if (cols.length !== 3) return false;
  const text = document.querySelector(".columns").textContent;
  return text.includes("LORD") && text.includes("Yahweh") && text.includes("Jehovah");
};

async function shotCompare(browser, base) {
  // Lesson 3 compare.html → hero.png AND lessons/03-build-once/images/compare.png (same view).
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(`${base}/lessons/03-build-once/compare.html`, { waitUntil: "load" });
  await page.getByRole("button", { name: "Compare" }).click();
  await page.waitForFunction(columnsReady);
  await page.screenshot({ path: img("03-build-once", "compare.png"), fullPage: true });
  await mkdir(DOCS, { recursive: true });
  await copyFile(img("03-build-once", "compare.png"), join(DOCS, "hero.png"));
  await ctx.close();
}

async function shotVerse(browser, base) {
  // Lesson 1 verse.html → renders on load.
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(`${base}/lessons/01-the-same-verse/verse.html`, { waitUntil: "load" });
  await page.waitForSelector(".verse");
  await page.waitForFunction(() => /For God so loved/.test(document.body.textContent));
  await page.screenshot({ path: img("01-the-same-verse", "verse.png"), fullPage: true });
  await ctx.close();
}

async function shotSearch(browser, base) {
  // Lesson 2 search.html → click Search, wait for highlighted hits.
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(`${base}/lessons/02-type-and-watch/search.html`, { waitUntil: "load" });
  await page.getByRole("button", { name: "Search" }).click();
  await page.waitForSelector(".hit mark");
  await page.screenshot({ path: img("02-type-and-watch", "search-results.png"), fullPage: true });
  await ctx.close();
}

async function shotCrossRefs(browser, base) {
  // Lesson 4 crossrefs.html → on-load (useEffect) then click-to-jump.
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(`${base}/lessons/04-follow-the-thread/crossrefs.html`, { waitUntil: "load" });
  await page.waitForFunction(
    () =>
      document.querySelector(".here-ref") &&
      document.querySelector(".here-ref").textContent === "John 3:16" &&
      [...document.querySelectorAll(".xref")].some((b) => /Romans 5:8/.test(b.textContent))
  );
  await page.screenshot({ path: img("04-follow-the-thread", "on-load.png"), fullPage: true });

  await page
    .locator(".xref", { hasText: "Romans 5:8" })
    .first()
    .click();
  await page.waitForFunction(
    () => document.querySelector(".here-ref").textContent === "Romans 5:8" &&
      document.querySelectorAll(".xref").length > 0
  );
  await page.screenshot({ path: img("04-follow-the-thread", "jumped.png"), fullPage: true });
  await ctx.close();
}

// Start the Vite dev server in compare-app and resolve its local URL.
function startVite() {
  const cwd = join(LESSONS, "05-the-real-thing", "compare-app");
  // detached so we can kill the whole process group (npm → vite) on cleanup.
  const proc = spawn("npm", ["run", "dev"], { cwd, stdio: ["ignore", "pipe", "pipe"], detached: true });
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("Vite did not start in time")), 30000);
    proc.stdout.on("data", (d) => {
      const m = String(d).match(/Local:\s+(http:\/\/\S+)/);
      if (m) { clearTimeout(t); resolve({ proc, url: m[1].replace(/\/$/, "") }); }
    });
    proc.on("error", reject);
  });
}

async function shotVite(browser) {
  // Lesson 5 compare-app through a real Vite build.
  const { proc, url } = await startVite();
  try {
    const ctx = await browser.newContext({ viewport: VIEWPORT });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "load" });
    await page.getByRole("button", { name: "Compare" }).click();
    await page.waitForFunction(columnsReady);
    await page.screenshot({ path: img("05-the-real-thing", "vite-app.png"), fullPage: true });
    await ctx.close();
  } finally {
    try {
      process.kill(-proc.pid, "SIGTERM"); // kill the whole group (npm + vite)
    } catch {
      proc.kill("SIGTERM");
    }
  }
}

async function copySongbird() {
  // Lesson 5 songbird-reader.png — copied verbatim from songbird's own screenshot, not captured.
  const src = join(ROOT, "..", "songbird", "docs", "screenshots", "reader.png");
  const dest = img("05-the-real-thing", "songbird-reader.png");
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(src, dest);
}

async function main() {
  const server = await startServer(ROOT, PORT);
  const base = `http://localhost:${PORT}`;
  const browser = await chromium.launch(launchOpts);
  try {
    await shotCompare(browser, base);
    await shotVerse(browser, base);
    await shotSearch(browser, base);
    await shotCrossRefs(browser, base);
    await shotVite(browser);
    await copySongbird();
  } finally {
    await browser.close();
    server.close();
  }
  console.log("Saved screenshots to docs/hero.png and lessons/*/images/");
  process.exit(0); // a lingering dev-server child can otherwise keep the event loop alive
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
