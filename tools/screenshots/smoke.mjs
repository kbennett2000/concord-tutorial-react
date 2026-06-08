// Three-engine DOM smoke: drive every lesson in Chromium, Firefox, AND WebKit against a live
// Concord v1.1.0, and assert the real feature renders. MAINTAINER / CI tooling only.
// Usage: npm run smoke   (needs Concord on :8000, the lessons served locally, and — for Lesson 5 —
//        a prior `npm run build` in compare-app so `vite preview` has a dist/ to serve).
//
// Key difference from course 1's smoke: Lessons 1–4 compile JSX in the browser with
// Babel-standalone, so right after page.goto() the #root div is still EMPTY — Babel has to compile
// first. Every assertion therefore waits (waitForSelector / waitForFunction) for React to mount;
// we never read textContent immediately. Each lesson runs on a fresh page so a route-abort used to
// test one lesson's offline state never leaks into the next.
import { chromium, firefox, webkit } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { startServer } from "./server.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", ".."); // repo root — served so /lessons/... resolves
const CONCORD = "http://localhost:8000";
const PORT = 8099; // maintainer server port — unrelated to the learner's :5500

const VERSE_URL = `http://localhost:${PORT}/lessons/01-the-same-verse/verse.html`;
const SEARCH_URL = `http://localhost:${PORT}/lessons/02-type-and-watch/search.html`;
const COMPARE_URL = `http://localhost:${PORT}/lessons/03-build-once/compare.html`;
const XREFS_URL = `http://localhost:${PORT}/lessons/04-follow-the-thread/crossrefs.html`;

// A word no translation contains — keyword search returns zero hits, exercising the empty state.
const NONSENSE_Q = "qwxzjkvbnm";

const offline = (page) => page.route(`${CONCORD}/**`, (r) => r.abort());

async function runEngine(launcher, name, launchOpts, viteUrl) {
  const browser = await launcher.launch(launchOpts);
  const checks = {};
  try {
    // ---- Lesson 1: verse.html (renders on load) ----
    {
      const p = await browser.newPage();
      await p.goto(VERSE_URL, { waitUntil: "load" });
      await p.waitForSelector(".verse");
      await p.waitForFunction(() => /For God so loved/.test(document.body.textContent));
      checks["L1 verse renders on load"] = true;
      await p.close();
    }
    {
      // Offline: abort Concord BEFORE load so the one on-load fetch fails into the calm message.
      const p = await browser.newPage();
      await offline(p);
      await p.goto(VERSE_URL, { waitUntil: "load" });
      await p.waitForSelector(".problem");
      checks["L1 friendly is-it-running"] = (await p.textContent(".problem")).includes("is it running");
      await p.close();
    }

    // ---- Lesson 2: search.html (fill + click; default query is prefilled) ----
    {
      const p = await browser.newPage();
      await p.goto(SEARCH_URL, { waitUntil: "load" });
      await p.getByRole("button", { name: "Search" }).click(); // searches the prefilled "lovingkindness"
      await p.waitForSelector(".hit mark");
      checks["L2 results with highlighted matches"] = (await p.locator(".hit mark").count()) > 0;

      await p.fill("input", NONSENSE_Q);
      await p.getByRole("button", { name: "Search" }).click();
      await p.waitForFunction(() => /No verses found/.test(document.body.textContent));
      checks["L2 empty state teaches"] = true;

      await offline(p);
      await p.fill("input", "love");
      await p.getByRole("button", { name: "Search" }).click();
      await p.waitForFunction(() => {
        const n = document.querySelector(".note.error");
        return n && n.textContent.includes("is it running");
      });
      checks["L2 friendly is-it-running"] = true;
      await p.close();
    }

    // ---- Lesson 3: compare.html (fill + click; default "Psalm 23:1") ----
    {
      const p = await browser.newPage();
      await p.goto(COMPARE_URL, { waitUntil: "load" });
      await p.getByRole("button", { name: "Compare" }).click();
      // The three columns must carry the divine-name contrast from real Concord data.
      await p.waitForFunction(() => {
        const cols = document.querySelectorAll(".col");
        if (cols.length !== 3) return false;
        const t = document.querySelector(".columns").textContent;
        return t.includes("LORD") && t.includes("Yahweh") && t.includes("Jehovah");
      });
      checks["L3 three columns, divine-name contrast"] = (await p.locator(".columns .col").count()) === 3;

      await offline(p);
      await p.getByRole("button", { name: "Compare" }).click();
      await p.waitForFunction(() => {
        const n = document.querySelector(".note.error");
        return n && n.textContent.includes("Couldn’t find that");
      });
      checks["L3 friendly not-found / is-it-running"] = true;
      await p.close();
    }

    // ---- Lesson 4: crossrefs.html (loads its own start verse via useEffect) ----
    {
      const p = await browser.newPage();
      await p.goto(XREFS_URL, { waitUntil: "load" });
      await p.waitForFunction(
        () =>
          document.querySelector(".here-ref") &&
          document.querySelector(".here-ref").textContent === "John 3:16" &&
          [...document.querySelectorAll(".xref")].some((b) => /Romans 5:8/.test(b.textContent))
      );
      checks["L4 cross-refs load on open"] = true;

      await p.locator(".xref", { hasText: "Romans 5:8" }).first().click();
      await p.waitForFunction(
        () => document.querySelector(".here-ref").textContent === "Romans 5:8" &&
          document.querySelectorAll(".xref").length > 0
      );
      checks["L4 click-to-jump replaces the thread"] = true;
      await p.close();
    }
    {
      const p = await browser.newPage();
      await offline(p); // abort before load so the on-load useEffect fetch fails calmly
      await p.goto(XREFS_URL, { waitUntil: "load" });
      await p.waitForFunction(() => {
        const n = document.querySelector(".note.error");
        return n && n.textContent.includes("is it running");
      });
      checks["L4 friendly is-it-running"] = true;
      await p.close();
    }

    // ---- Lesson 5: the real build — drive compare-app served by `vite preview` (the built dist/) ----
    {
      const p = await browser.newPage();
      await p.goto(viteUrl, { waitUntil: "load" });
      await p.getByRole("button", { name: "Compare" }).click();
      await p.waitForFunction(() => document.querySelectorAll(".col").length === 3);
      checks["L5 built Vite app renders three columns"] = (await p.locator(".col").count()) === 3;
      await p.close();
    }
  } finally {
    await browser.close();
  }
  return checks;
}

// Build compare-app's dist (if needed) and start `vite preview`, resolving its local URL.
// Reuses the detached-process pattern from screenshot.mjs's startVite, but serves the BUILT output
// so the smoke proves the one build-step lesson actually builds and runs.
function startPreview() {
  const cwd = join(ROOT, "lessons", "05-the-real-thing", "compare-app");
  const proc = spawn("npm", ["run", "preview"], { cwd, stdio: ["ignore", "pipe", "pipe"], detached: true });
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("vite preview did not start in time — did you run `npm run build` in compare-app?")), 30000);
    proc.stdout.on("data", (d) => {
      const m = String(d).match(/Local:\s+(http:\/\/\S+)/);
      if (m) { clearTimeout(t); resolve({ proc, url: m[1].replace(/\/$/, "") }); }
    });
    proc.on("error", reject);
  });
}

async function main() {
  const server = await startServer(ROOT, PORT);
  const { proc: viteProc, url: viteUrl } = await startPreview();
  const chromeOpts = process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {};
  const engines = [[chromium, "Chromium", chromeOpts], [firefox, "Firefox", {}], [webkit, "WebKit", {}]];
  let allPass = true;
  try {
    for (const [launcher, label, opts] of engines) {
      const checks = await runEngine(launcher, label, opts, viteUrl);
      const pass = Object.values(checks).every(Boolean);
      allPass = allPass && pass;
      const detail = Object.entries(checks).map(([k, v]) => `${v ? "✅" : "❌"} ${k}`).join("  ");
      console.log(`${pass ? "PASS" : "FAIL"}  ${label.padEnd(9)} ${detail}`);
    }
  } finally {
    server.close();
    try {
      process.kill(-viteProc.pid, "SIGTERM"); // kill the whole group (npm + vite)
    } catch {
      viteProc.kill("SIGTERM");
    }
  }
  if (!allPass) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
