# CLAUDE.md

Always-on rules for `concord-tutorial-react`. Tight by design — read every session.

**Source of truth for design is `docs/SPEC.md`. Read it before starting any slice.**
This file is the rules summary; the spec carries the full reasoning, the per-lesson contracts,
and the build plan. Work proceeds one slice at a time per **SPEC §9** — smallest reviewable
unit, one PR per slice.

## What this is

**Course 2 of the `concord-tutorial-*` series** — a **bridge**. It takes a reader who finished
[course 1](https://github.com/kbennett2000/concord-tutorial-web) (`concord-tutorial-web`), peeked
at [songbird](https://github.com/kbennett2000/songbird) to see "how the pros do it," and felt
**overwhelmed and discouraged** — and walks them up the short React ladder until songbird's source
reads as *familiar*.

**The success metric is one sentence: "does songbird look approachable now?"** — not "can the
reader write production React." Every decision serves that metric. The course teaches **four React
ideas, one per lesson** (render-from-data, state, components, fetching), and the final lesson
**opens songbird's real source** and shows the reader they can read it.

It assumes a **running Concord** and pins Concord's stable **`/v1`** surface at **v1.1.0** (the
release carrying multi-translation keyword search — Lesson 2 needs it). It **never edits the
Concord repo and never edits the songbird repo** — Lesson 5 *reads* songbird; it modifies neither.

## Audience & voice (load-bearing — this is a teaching repo)

- **Primary reader:** finished course 1. Can write vanilla HTML/CSS/JS and a plain `fetch`. Has
  **never** seen React, JSX, npm, a build step, or a component — and *just felt small* looking at
  songbird. Every line is for them.
- **Not the target:** working React developers — welcome to skim, but they have songbird's source
  and Concord's `docs/API.md`. **Do not** serve two densities in one voice.
- Second person, warm, **builder framing from line one** — "the app you're rebuilding," "your
  component," "when your users…" — never "if you manage to."
- **Plain language first, then the real term** ("a *component* — a reusable piece of UI"). Define
  each piece of jargon once, on first use.
- **Short sections, lots of working code, no walls of text.** If a lesson sprawls, it's carrying
  scope it shouldn't.
- Match course 1's and Concord's documentation voice (warm, precise, honest about limits) so the
  whole family of repos feels like one.

**Write for one real reader — and run every line past them.** Picture that specific person:
curious, just built their first app, never seen React, one frustration from closing the tab.
Before anything ships, hold each sentence and each step up to them and ask three questions —
*Would they know what this means? Would they know how to do it? Would they see why they're doing
it?* Any "no" means cut it, explain it, or move it. Every rule below is an instance of this one.
The sharpest instance: **never ask the reader to perform an action whose only purpose is to
exercise the code** — stopping a server, deliberately breaking something, forcing an error. That
is the builder's job, already done. The reader only ever does what a real user of the finished app
would do naturally; they meet error states through *reassurance* — "if you ever see this, here's
what it means" — never by being told to cause them.

**Formatting — break the wall (a scannable page is itself reassurance).** For this reader, a page
that *looks* easy signals "you can do this"; a dense block signals "this is hard." In every README
and lesson:
- **Every page carries at least one graphical element — a screenshot of the running app, near the
  top.** A page of prose and code with *no* picture reads as a wall to this reader, however well
  broken up — and a shot of the thing actually working is the strongest "you can do this" signal
  there is. Every lesson README *and* the project README shows one (most show two: the happy state
  plus a friendly error/empty state, which doubles as the "if you ever see this" reassurance). The
  shots are produced by **maintainer-only** tooling (`tools/screenshots/`, see SPEC §9) driven
  against a live Concord — learners never run it, and no lesson references it.
- Keep paragraphs to 2–4 sentences, with real whitespace between them.
- Use frequent, plain subheadings so the page scans at a glance.
- Anything sequential is a numbered list (how-to-run is steps, not a paragraph).
- Anything you'd type — a URL, a command — goes in a code block, even one line.
- Set off the prereq check and the how-to-run path as visual callouts, not buried in prose.
- **Bold** at most one key phrase per section — the thing that must not be missed.
- Keep the connective tissue warm and human: short prose between the structure, never an
  all-bullets checklist and never a gray wall. The goal is "warm, broken into scannable pieces."

**No unexplained jargon — especially the tooling.** A word obvious to a developer is a wall to
this reader. The lesson's *topic* (component, state, props, JSX) gets taught as it's introduced —
but the **incidental tooling** is the easy thing to forget and just as alien. The first time you
name any of it, add a one-line plain gloss and a link where one exists — the editor (**VS Code**),
an **extension**, the **terminal**, a **command**, **npm**, **Vite**, **React** itself. Two hard
rules:
- **Never name a scary unknown just to reassure.** Saying "no Redux" to calm someone who's never
  heard of Redux introduces a new fear instead of removing one. Reassure only in words the reader
  already knows.
- **Never make the reader inventory their own machine.** Recommend one friendly default and let an
  "already comfortable with X?" line self-select any alternative.

**The named-wound rule (the one carve-out to "never name a scary unknown").** The no-planting rule
above is about **unknowns**. *This* reader arrives with a **known wound** — they already felt small
looking at songbird. Naming *that shared experience* is the **opposite** of planting a fear: it is
recognition, and it earns trust. Hold the line between the two:
- **Allowed** (names a wound they already have): *"You finished the first course, peeked at
  songbird, and felt the floor drop. That's exactly why this exists."*
- **Not allowed** (names a fear they may not have): *"Don't worry, React isn't as hard as it
  looks"* — that hands "React is hard" to a reader who hadn't decided that yet.
Do not let the no-planting rule muzzle the one acknowledgment that lands.

**Just-in-time, not just-in-case — don't explain anything until the reader needs it.** Everything
true is not everything useful. If a sentence isn't helping the reader do the thing in front of
them *right now*, it's costing attention and confidence. Default to cut, defer, or link.
- **Setup, caveats, and concepts appear in the lesson that needs them**, not earlier.
- **The roadmap is a destination, not a syllabus.** Don't open with a map of all lessons; a
  "what's ahead" list, if it earns a place, goes at the *end* as encouragement.
- **Never answer a question the reader hasn't asked** — especially a reassurance. (The named-wound
  carve-out above is the deliberate exception, and only for the wound they *already carry*.)
- **Motivation is timed, not cut.** Proof-it's-real and you-could-build-this beats land hardest
  right *after* a win, at a lesson's close — never as front-door preamble.

**Working first, explanation second — the win before the why.** A beginner needs to see it run
before they care how it runs. A code lesson opens by getting the reader to a *running, working
result* as fast as possible — open the page, see it work — and only *then* explains how it works,
for the reader who's now curious. Structure: callback → what we're building (a sentence or two) →
**get it running and watch it work (the win)** → how it works, piece by piece → the closers. The
reader is looking at a working page inside the first minute.

**Setup happens once; lessons assume it's done.** The reader sets up a single time — getting the
files and starting a local preview (SETUP.md), and confirming Concord is on (the README's
front-door check). From Lesson 1 on, lessons *assume* setup is done: they link to SETUP.md instead
of re-explaining it, and do NOT re-gate the Concord check atop each lesson. Setup reappears only as
symptom-tied troubleshooting ("page blank? make sure Concord's still running"). Establish it once,
trust the reader, surface it again only when something breaks.

## The three principles (they drive decisions — see SPEC §1)

- **Commitment & Consistency:** every lesson is numbered and completable; **no lesson ever ends on
  broken**; each opens with a callback to the prior win and closes with a "you can now ___." Most
  lessons rebuild an app the reader *already built in course 1*, so the cost of a lesson is the one
  new React idea, never the domain.
- **Reciprocity:** ship a **complete, runs-as-is file** every lesson (never fill-in-the-blank);
  give `recipes.md` ("steal these") and `ideas.md` ("what could you build?").
- **Unity / Identity:** talk to the reader as a builder; the capstone is **reading songbird's real
  source and recognizing it**; the repo closes by inducting them ("you can read real code now").

## Hard constraints

- **No build step, no npm, no `node_modules` through Lesson 4.** Lessons 1–4 load **React 18 +
  ReactDOM 18 + Babel-standalone from a CDN** (three `<script>` tags) and write real JSX in
  `<script type="text/babel">`. **Pin React 18** (match songbird, `18.3.1`). **Lesson 5 — and only
  Lesson 5 — introduces npm + Vite** as its single new idea; that's the one place the no-npm rule
  is lifted, by design, and it's last.
  - **Babel-standalone over `htm`, on purpose:** songbird is full of JSX, and the course's whole
    job is that songbird reads as familiar at the end. JSX-in-the-browser keeps lesson code looking
    almost identical to songbird's `.tsx`. The brief Babel pause on load is **curriculum** — it's
    the motivation for Lesson 5's build step. (SPEC §5.1.)
  - **Flag the offline tradeoff** (like course 1's Leaflet): Lessons 1–4 fetch React/Babel from a
    CDN, so they need an internet connection to load — and Lesson 5's Vite build *resolves* it
    (React bundled locally).
- **Every fetch is a plain, header-free `GET`** (`fetch(url)`), so it stays a CORS "simple request"
  and Concord's `Access-Control-Allow-Origin: *` is honored with no preflight. No custom headers.
  **Concord needs no change** for anything this course does.
- **Teach fetching as event-handler → `setState`.** Use `useEffect` **only** for the one
  genuinely-on-load case (loading the translation list once), introduced gently and late. Avoid the
  dependency-array tarpit. (SPEC §5.5.)
- **Render `<mark>` highlights by splitting the snippet into React `<mark>` elements — never
  `dangerouslySetInnerHTML`.** Matches songbird's `highlight.ts` safety stance and reinforces "UI
  is built from data, not injected HTML." The splitter is a *given* helper in Lesson 2. (SPEC §5.7.)
- **One blessed way to run a lesson: serve it over `http://localhost`** (VS Code Live Server, or
  `python3 -m http.server`). **Opening a file via `file://` does NOT work** — browsers treat local
  files as opaque origins, so `fetch` fails. State this plainly; no "might work" hedge.
- Each lesson file carries the **base-URL one-liner** at the top of its script, clearly commented
  ("change this only if Concord runs on another computer"). Repeat it per file; no shared config.
- **Build display logic against the real response shapes in Concord's `docs/API.md` (v1.1.0) —
  never invent field names.** The verified shapes are in SPEC §7. Note `/v1/search`'s `matches`
  carries only the translations that contain the word, and a hit's `snippet` may be a different
  translation than the top-level `translation` — render from `matches`.
- Lesson text lives in each lesson's **own folder `README.md`**; the lesson's file(s) sit beside
  it. Self-contained per lesson. Structure in SPEC §8.

## Git workflow

Each slice gets its own branch off `main`:

```
git checkout main && git pull
git checkout -b slice/T1-verse   # T0, T1, … per SPEC §9
```

All work on that branch — **never commit directly to `main`, never push to `main`.** Conventional,
scoped commits (`docs:`, `feat:`, `chore:`). When a slice is complete and verified, open a PR with
`gh pr create`; the PR title is the slice name, the body summarizes what landed and links SPEC §9.
**PRs are merged by Kris after review — do not self-merge.**

If `git push` or `gh pr create` fails (auth, conflict, network), surface the full error
immediately. No `--force`, no resetting branches, no rebasing shared history. Never commit secrets
or anything matching `.gitignore`.

## "Done" means it actually runs

There is no automated test suite here — the proof is that the lesson **works**. Before declaring a
slice done: serve the lesson via the blessed path, open it, and confirm the feature works end to
end on **Chrome and Firefox** against a **live Concord v1.1.0** (a real verse renders; the search
results render and replace on a new query; the three columns line up and handle omitted verses
honestly; cross-references render and jump; the Vite project runs). Honor the **no-broken-ending**
rule — a lesson that doesn't run is not done.

**Read it back as the reader, not the author.** Before opening the PR, walk the lesson top to
bottom as that nervous first-timer following it literally — not as its writer confirming the code
works. Every noun explained or obvious; every step has a how and a why; nothing asks them to break,
stop, inventory, or pre-learn. If you wouldn't follow it comfortably with zero React background,
fix it before the PR. The whole-course test is the success metric: at Lesson 5, a course-1 graduate
opens songbird's source and can read it.

## Taste & restraint

Smallest reviewable, load-bearing unit per slice. Reuse patterns across lessons rather than
inventing new ones. Resist adding a dependency, a config option, or cleverness the lesson doesn't
need — restraint is the house style, in the code *and* the prose. When in doubt about scope or a
new React concept creeping in, ask whether it earns its place against the four-ideas ladder
(SPEC §4); if it doesn't, it's a later course or a `recipes.md` note.
