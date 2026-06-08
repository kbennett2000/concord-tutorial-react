# Screenshot generator (maintainers only)

**This folder is for maintainers of this course. It is NOT part of the lessons. Learners never
need Node, npm, Playwright, or anything in here — the lessons use only a browser and the one-time
[SETUP.md](../../SETUP.md). Do not reference this folder from any lesson.**

It regenerates the screenshots embedded in the READMEs by driving the real lesson pages with
[Playwright](https://playwright.dev/) against a **live Concord**, so every shot shows real
Scripture and real responses.

## Prerequisites

- **Node** (18 or newer).
- **A running Concord at `http://localhost:8000`** — the screenshots use its real responses, so it
  must be up before you generate them.
- For the Lesson 5 shot, the Vite app's dependencies installed once:
  `cd lessons/05-the-real-thing/compare-app && npm install`.
- songbird checked out next to this repo (`../songbird`) — the Lesson 5 `songbird-reader.png` is
  copied verbatim from `songbird/docs/screenshots/reader.png`.

## Install

```
cd tools/screenshots
npm install
npx playwright install
```

`npx playwright install` downloads the browser engines. It's a one-time step.

## Regenerate all screenshots

One command — it writes the PNGs into `docs/hero.png` and each lesson's `images/` folder:

```
npm run shots
```

If Playwright's bundled Chromium won't install on your OS, drive your *system* Google Chrome
instead:

```
PW_CHANNEL=chrome npm run shots
```

## Keep screenshots honest (the staleness contract)

When a lesson's page or UI changes, **regenerate its screenshot in the same change**, so the
pictures never drift from what a learner actually sees. A screenshot that lies is worse than none.
