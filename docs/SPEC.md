# concord-tutorial-react — the bridge from your first app to a real codebase (design spec)

> **Status:** design, pre-build. This is **course 2** of the `concord-tutorial-*` series, the
> sequel to [`concord-tutorial-web`](https://github.com/kbennett2000/concord-tutorial-web)
> (course 1). It is a **bridge course**: it takes a reader who finished course 1, peeked at
> [songbird](https://github.com/kbennett2000/songbird), and felt overwhelmed — and walks them up
> to the point where songbird's source reads as *familiar*.
>
> **The success metric is one sentence: "does songbird look approachable now?"** Not "can the
> reader write production React." Every decision below serves that metric.
>
> **Upstream dependency:** the course pins Concord **v1.1.0** — the release that carries
> multi-translation keyword search (`/v1/search?translations=`), which Lesson 2 requires. That
> endpoint is on Concord `main` but is **not yet in any published image** (Concord's image
> publish is gated to version tags, and there is no tag past v1.0.2). **The v1.1.0 release is a
> hard prerequisite** and is tracked in the Concord repo — see §12. Until it ships, this course
> cannot be built or run against a pullable Concord.
>
> Like course 1, this repo **never edits Concord and never edits songbird** — it *reads* songbird
> in the final lesson, and pins Concord's stable `/v1` surface.

---

## 1. The three principles (they drive every decision)

Carried from course 1, recontextualized for a bridge:

- **Commitment & Consistency.** Every lesson is numbered and completable; **no lesson ever ends
  on broken**; each opens with a callback to the prior win and closes with a "you can now ___."
  The bridge twist: most lessons rebuild an app the reader *already built in course 1*, so the
  cognitive cost of each lesson is the **one new React idea**, never the domain.
- **Reciprocity.** Ship a **complete, runs-as-is file** every lesson (never fill-in-the-blank).
  Provide `recipes.md` ("steal these") and `ideas.md` ("what could you build?").
- **Unity / Identity.** Talk to the reader as a builder. The capstone is **reading songbird's
  real source and recognizing it**. The repo closes by inducting them: *"you can read real code
  now — you're a Concord builder, for real."*

## 2. What this is (and is not)

**Is:** a bridge from "I built a thing in plain HTML/JS" to "I can open a real React app and
read it." It re-teaches *building on Concord*, this time in React, by **decomposing React into
one new idea per lesson**, and it terminates **inside songbird's source code**.

**Is not:**
- A from-scratch React tutorial. It **assumes course 1 is done** (the reader can fetch from
  Concord and put results on a page in vanilla JS).
- A comprehensive React reference. It teaches exactly four React ideas (§4) and stops.
- Anything involving **translator's notes** — the public Concord image ships **zero** notes, so a
  notes lesson would strand almost every reader (§11).
- A re-teach of **semantic search**. Course 1 already built it; in React it is the *same* idea as
  keyword search (fetch → state → render), so making it a lesson would violate one-new-idea-per-
  lesson. It survives as an optional `recipes.md` practice instead.

**The wound this addresses (a real person).** Someone ran course 1, enjoyed it, learned a lot —
then opened songbird to see "how the pros do it" and felt the floor drop: overwhelmed, totally,
and discouraged, totally. Preventing exactly that feeling is course 1's whole creed. This course
exists because the wound is real, and naming it is allowed (see §3, the named-wound rule).

## 3. Audience & voice

**Primary reader.** Finished course 1. Can write vanilla HTML/CSS/JS and a plain `fetch`. Has
**never** seen React, JSX, npm, a build step, or a component. One "I'm not smart enough for this"
away from closing the tab — and they *just felt* that at songbird.

**Not the target.** Working React developers. (They have Concord's `docs/API.md` and songbird's
source already.) **Do not** serve two densities in one voice.

**Voice rules — inherit course 1's, verbatim.** The full voice canon lives in course 1's
`CLAUDE.md` and is **reproduced unchanged** in this repo's `CLAUDE.md`: write for one real reader;
working-first-then-explanation (the win before the why); just-in-time, never just-in-case; no
unexplained jargon (especially tooling); break the wall (a scannable page is reassurance);
setup-once; motivation timed to land after a win; and **never ask the reader to perform an action
whose only purpose is to exercise the code** (no break-to-test). These are not re-litigated here.

**The one addition — the named-wound rule (this is new for course 2).** Course 1's rule *"never
name a scary unknown just to reassure"* (saying "no npm" plants a fear in someone who never had
it) is about **unknowns**. This reader arrives with a **known wound** — they already felt small
looking at songbird. Naming *that shared experience* on the front page is the **opposite** of
planting a fear: it is recognition, and it earns trust. The two rules coexist, and the `CLAUDE.md`
must spell out the distinction so the no-planting rule is not misapplied to muzzle the one
acknowledgment that lands. Concretely:
- **Allowed** (names a wound the reader already has): *"You finished the first course, peeked at
  songbird, and felt the floor drop. That's exactly why this exists."*
- **Not allowed** (names a fear the reader may not have): *"Don't worry, React isn't as hard as it
  looks"* — that introduces "React is hard" to a reader who hadn't decided that yet.

## 4. The pedagogical spine

The overwhelm at songbird was **never React-the-library**. It was a dozen ideas arriving in one
breath: npm, a build step, JSX, TypeScript, components, hooks, a router, a data-fetching library,
Tailwind, a test harness. songbird wears all of them at once.

So this course does to **React** what course 1 did to **using an API**: it decomposes the scary
thing into **one idea per lesson, in dependency order**. React, taught this way, is a short
ladder — and the cliff is only meeting all the rungs at once:

1. **Render from data (JSX), via a component.** The page is a function of your data; you describe
   it as a small component that takes its data as **props**, and React builds the DOM. *(Lesson 1 —
   props ride in here on knowledge the reader already has: functions take inputs.)*
2. **State and re-render.** State holds what changes; setting it re-renders — you never clear the
   old DOM by hand. *(Lesson 2 — the heart)*
3. **Reuse — one component, many times.** Because a component takes props (met in Lesson 1), you
   can call it repeatedly with different data; that's the "folder of components" songbird is made
   of. *(Lesson 3)*
4. **Fetching, the React way.** When the user acts, go get data, then store it in state.
   *(Lesson 4)*

Each rung is anchored to a problem the reader **already solved in course 1** (or a **cheap new
Concord endpoint**), so attention is spent on the React idea, never on the domain. The course's
engine is **before/after**: rebuild what they built in vanilla, and let them *feel* the
difference the framework makes. That felt difference is the honest answer to *"why does React
exist?"* — and the final lesson cashes the whole thing in by opening songbird and showing them
they can read it.

## 5. Hard constraints & key decisions

These are load-bearing. The ADR-flavored ones (5.1) capture *why*, the way course 1 captured the
CORS-fix decision in its SPEC.

### 5.1 No-build React via CDN + in-browser JSX (Babel) — **not** `htm`. *(load-bearing)*
- **Decision.** Lessons 1–4 load **React 18 + ReactDOM 18 + Babel-standalone from a CDN** (three
  `<script>` tags) and write **real JSX** inside `<script type="text/babel">`. Pin **React 18** to
  match songbird (`react` `18.3.1`).
- **Why not `htm`.** Buildless React has two flavors: `htm` (tagged-template syntax, transform-
  free) and React-UMD-plus-Babel (real JSX, transformed in the browser). `htm` is more elegant to
  set up — but the **entire point of this course is that songbird reads as familiar at the end**,
  and songbird is full of JSX. If we taught `` html`<div/>` `` syntax, songbird's JSX would look
  foreign and we'd rebuild the exact wall we're tearing down. **Fidelity to songbird's JSX beats
  setup elegance.** Lesson code should look almost identical to songbird's `.tsx` (minus
  TypeScript, Tailwind, and react-query).
- **The Babel pause is curriculum, not a cost.** With Babel-standalone the page pauses for a beat
  on load while JSX is translated live. That visible wobble is the **setup for Lesson 5's build
  step**: *"remember that pause? a build step does that translation once, ahead of time."* The
  training wheels visibly wobble, which is exactly why taking them off later feels earned.
- **Offline tradeoff — flag it (same as course 1's Leaflet).** Lessons 1–4 fetch React/Babel from
  a CDN, so they need an internet connection to load (unlike course 1's offline Lessons 1–4). This
  is the **same tradeoff course 1 made for Leaflet in Lesson 5**, flagged the same honest way —
  **and Lesson 5's Vite build resolves it** (React is bundled locally; no CDN), which is one more
  concrete payoff of the build step.

### 5.2 Same run model as course 1.
VS Code + **Live Server**, one file served at `http://localhost:5500`, talking to Concord at
`http://localhost:8000`. **No npm, no `node_modules`, no build step through Lesson 4.** `SETUP.md`
is the *same setup* as course 1; from Lesson 1 on, lessons **assume it's done** (the setup-once
rule). **The only thing that changes between courses is the idea, never the machinery** — that
continuity is itself reassurance.

### 5.3 The build step is Lesson 5's single new idea.
npm + **Vite** are introduced **only** in Lesson 5, motivated by felt pain (the Babel pause, the
one giant file, the CDN dependency). This is the **one place** the no-npm rule is deliberately
lifted — because the build step *is* the lesson — and it is last, so everything before stays
npm-free.

### 5.4 Every fetch is a plain, header-free `GET`.
Same CORS "simple request" discipline as course 1; Concord's `Access-Control-Allow-Origin: *` is
honored with no preflight. **Concord needs no change** for anything this course does. (Loading
React/Babel via cross-origin `<script src>` is not subject to fetch-CORS.)

### 5.5 `useEffect` is minimized.
Teach fetching as **event-handler → `setState`** ("when they click, go get it, then store it") —
the intuitive, footgun-free model. Use `useEffect` **only** for the one genuinely-on-load case
(loading the translation list once when the app opens), introduced gently and late. Effect-based
data loading plus the dependency-array tarpit is React's classic beginner trap; deferring it keeps
the ladder clean. Lesson 5 *names* react-query (songbird's real approach) as "the grown-up version
of the fetch-then-`setState` you did by hand."

### 5.6 The map is dropped from the build path.
Re-doing Leaflet in React (react-leaflet / effect-wrapping) is fiddly and off-point. Instead,
Lesson 5 points at songbird's `MapView.tsx` as *"the map you built in course 1, wearing React —
go read it."* The map becomes a **recognition moment**, not a burden.

### 5.7 Render highlights by **splitting `<mark>`**, never `dangerouslySetInnerHTML`. *(load-bearing fidelity call)*
Concord's keyword snippets wrap matches in `<mark>…</mark>`. songbird **deliberately avoids**
`dangerouslySetInnerHTML`: `frontend/src/lib/highlight.ts` splits the snippet into typed segments
and renders each as a React `<mark>` element or a plain (escaped) text node. The course does the
**same** — Lesson 2 ships a small **given** helper (so the lesson's new idea stays *state*, not
string-parsing) that splits on the tags; later lessons reuse it. Two payoffs: it reinforces Lesson
1's "UI is built from data, not injected HTML," and opening `SearchView.tsx` in Lesson 5 (where
`markSegments` + `<mark className="…">` appear) is a direct recognition.

### 5.8 Base-URL one-liner per file.
Each lesson file carries the base-URL line at the top of its script, clearly commented ("change
this only if Concord runs on another computer"). Repeat it per file; **no shared `config.js`.**

### 5.9 Build against the **real** response shapes — never invent field names.
Carried verbatim from course 1. The verified v1.1.0 shapes are in §7. Concord's `docs/API.md` is
the human reference; its `docs/openapi.json` is the machine artifact (note: the `/v1/search` and
`/v1/verses` *bodies* are untyped in OpenAPI, so those shapes come from `docs/API.md` plus
Concord's response code — both were read directly for §7).

### 5.10 Pin Concord **v1.1.0**.
The release carrying `/v1/search?translations=` (Lesson 2). See §12.

## 6. Per-lesson contracts

Five lessons, mirroring course 1's count and rhythm. Each: **callback → what we're building →
get-it-running (the win) → how it works → the closers.** The reader is looking at a working page
inside the first minute (working-first rule). Folder names below are suggestions (kebab, verb-y,
rhyming with course 1) — confirm in planning.

### Lesson 1 — "The same verse, the React way" · `lessons/01-the-same-verse/` (`verse.html`)
- **Callback.** Course 1, Lesson 2: *"you fetched a verse and put it on the page by hand. Let's do
  the exact same thing the way React does it."*
- **What the reader does.** Open the page (pre-set to John 3:16); the verse appears.
- **New mechanical setup (not the idea).** The three CDN `<script>` tags + `<div id="root">` +
  `<script type="text/babel">`. Introduced as *"three lines, then you build,"* each glossed once:
  **React** (a library for building a page from your data), **ReactDOM** (puts it on the screen),
  **Babel** (translates the friendly JSX syntax, right in your browser — that's the brief pause on
  load).
- **Endpoint.** `GET /v1/verses/{ref}` (single translation, e.g. `?translations=KJV`).
  Shape: `{ reference, translations: ["KJV"], verses: [ { book, chapter, verse, reference,
  text: { "KJV": "…" } } ] }`. Render `verses[0].text.KJV`. (`text` is a map keyed by translation
  **even for one** translation.)
- **The new idea.** **JSX / the page is a function of your data.** You describe what the page
  should look like for a given verse; React builds the DOM. Contrast with course 1's manual
  `createElement`/`innerHTML`.
- **Win.** Identical output to what they already built — with far less display code.
- **Closer.** *"You just wrote your first React component. It's the same verse from course 1, with
  the DOM-building handed off."*

### Lesson 2 — "Type, and watch it change" · `lessons/02-type-and-watch/` (`search.html`) — **the heart**
- **Callback.** Lesson 1: *"your verse shows up once. Real apps respond to what the reader types."*
- **What the reader does.** A search box over **multi-translation keyword search**. Type
  `lovingkindness`: find the verses where translators reached for *that* word — and see that it's
  **not unanimous** (where one translation says "lovingkindness," another says "mercy" and simply
  isn't in the hit). Type a new word — the results **replace themselves**. *(Ready-made demo:
  Psalms 118 / 136 — `matches` shows only ASV's "lovingkindness," because AKJV/KJV say "mercy" in
  the same verse. That gap **is** the lesson's hook.)*
- **Endpoint.** `GET /v1/search?q={q}&translations=*` (all loaded; or a CSV such as
  `KJV,WEB,ASV,YLT`). Multi-mode shape: `{ query, translation, translations: [...], total,
  hits: [ { book, chapter, verse, reference, snippet, matches: { "ASV": "…<mark>…</mark>…" } } ] }`.
  Render each hit's `reference` plus its `matches` map (translation → highlighted snippet, via the
  §5.7 helper).
- **Two facts about the real shape — render from `matches`, nothing else** *(verified against the
  v1.1.0 image; see §7):*
  - **`matches` contains only the translations whose text actually has the word** — *not* all
    loaded translations. A verse where only ASV uses "lovingkindness" returns `matches: {"ASV": …}`
    alone. So the lesson presents *"who reached for this word here,"* not a fixed N-column grid.
    (The true per-verse, all-translations side-by-side is **Lesson 3's** job, via
    `/v1/verses?translations=` — so this shape actually sharpens the L2→L3 handoff.)
  - **The top-level `translation` and a hit's `snippet` may be *different* translations.**
    `translation` is just the alphabetically-first of the searched set (e.g. `AKJV`); `snippet` is
    the top-ranked *matcher* (e.g. ASV's). So the lesson **must not** print anything like "results
    in {translation}" — it renders straight from the `matches` map (and may treat `snippet` as the
    one-line preview), never assuming `snippet` is in `translation`.
- **The new idea.** **State and re-render.** `useState` holds the query and the results; calling
  the setter re-renders; you **never** clear the old results by hand — React does. The single
  biggest "oh, *that's* why" beat in the course.
- **Win.** The list updates itself; all the manual DOM-clearing you'd have written in vanilla is
  simply gone.
- **Why this content (it does triple duty).** It is the **cheapest new endpoint to host** (keyword,
  no model), the **most visually state-driven** thing in Concord, and **new since course 1**.
- **Closer (motivation, timed).** *"This is the thing React is *for*. You just felt it."*

### Lesson 3 — "Build a piece once, use it everywhere" · `lessons/03-build-once/` (`compare.html`)
- **Callback.** Lesson 2: *"you wrote that result row's markup once. What if you could reuse it?"*
- **What the reader does.** (a) Refactor Lesson 2's result into a `<TranslationMatch>` component;
  (b) rebuild **course 1 Lesson 4's three-column compare** as a `<Column>` component used three
  times (`KJV` / `WEB` / `ASV` — the divine-name contrast, as in course 1).
- **Endpoint.** `GET /v1/verses/{ref}?translations=KJV,WEB,ASV`. Parallel shape; `verses[].text`
  is the per-translation map. **Reuse course 1's `isMissing()`** to handle an omitted verse — it
  comes back as the placeholder string `"[verse not included in this translation]"` **or** `null`
  — a deliberate callback that quietly carries course 1's honesty lesson forward.
- **The new idea.** **Reuse — one component, many times.** Props were met in Lesson 1 (a component
  takes its data); here that pays off — call the *same* component repeatedly with *different* data
  (and meet the `{ }` destructuring shorthand for pulling props out, matching songbird).
- **Win.** *"songbird has a whole **folder** of these — now you know what they are."* The mystery
  of all those files evaporates.
- **Closer.** *"The thing that made songbird look like a wall — dozens of component files — is now
  the thing you understand best."*

### Lesson 4 — "Follow the thread" · `lessons/04-follow-the-thread/` (`crossrefs.html`)
- **Callback.** Lesson 3: *"you can show a verse. Every verse points at others — let's let the
  reader follow them."*
- **What the reader does.** Show a verse; beneath it, its **cross-references**; click one to jump
  (re-fetch that verse). Reuses Lesson 1's verse rendering and Lesson 3's component habit.
- **Endpoint.** `GET /v1/cross-references/{ref}?include_text=true&limit=20`. Shape:
  `{ cross_references: [ { to: { book, chapter, verse_start, verse_end, reference }, votes,
  text } ] }`. Render each `to.reference` + `text` (the target snippet) + `votes`; clicking sets
  state to that reference.
- **The new idea.** **Fetching, the React way** — event-handler → fetch → `setState`. Plus the
  **one** `useEffect`: load the translation list once when the app opens (introduced gently,
  §5.5).
- **Win.** *"You just built a feature songbird ships"* — and it's nearly the same code as
  songbird's `CrossReferences.tsx`.
- **Closer.** *"Remember opening songbird and not knowing where to start? You just built one of its
  features."*

### Lesson 5 — "The training wheels come off" · `lessons/05-the-real-thing/` (`README.md` + a Vite project)
- **Callback.** All of it: *"you've built a real app, four ideas deep. Time to meet the tools the
  pros use — starting with the one that fixes that little pause."*
- **The new idea.** **The build step (npm + Vite).** Gloss **npm** (the package manager — installs
  libraries into `node_modules`; why it exists) and **Vite** (the dev server + build tool — does
  the JSX translation **once, ahead of time**, instead of in the browser on every load). Convert
  the app to a real Vite project: `npm create vite`, move the component code into `.jsx` files,
  `npm install`, `npm run dev`. **Same code, real project.** The Babel pause is gone; offline works
  again (React is bundled, no CDN). *(This lesson requires Node/npm — gloss + link the install
  like any tool, and keep it last so all prior lessons stayed npm-free.)*
- **The induction — open songbird's real `frontend/src`.** Walk `VerseText.tsx` /
  `SearchView.tsx` / `CrossReferences.tsx` / `MapView.tsx`: *"This is your Lesson 1, your Lesson 2,
  your Lesson 4, and your course-1 map — with types and polish. You can **read** this now."*
- **Name (do NOT teach) the four upgrades**, each pointed at in real code, each *"the production
  version of something you already did or saw"* (just-in-time: name them at the moment the reader
  sees them and would wonder):
  1. **The build step** (Vite) — just learned. ✓
  2. **react-query** (`useQuery` in `CrossReferences.tsx`) — the grown-up version of the
     fetch-then-`setState` you did by hand; it caches and tracks loading/error for you.
  3. **Tailwind** (`className="text-sm text-gray-500"`) — CSS, written as little class names.
  4. **TypeScript** (`: string`, the props interface) — annotations that say what shape the data
     is; the React underneath is exactly what you learned.
- **Win + induction close.** *"You finished course 1 and songbird looked like a different planet.
  Read that file again — it's your code, grown up. You can build on songbird now. You're a Concord
  builder, for real."*

## 7. Endpoints used & their shapes (the contract — pin v1.1.0)

| Lesson | Endpoint | Key fields the lesson renders |
|---|---|---|
| 1 | `GET /v1/verses/{ref}?translations=KJV` | `verses[].text["KJV"]` (text map, keyed by translation even when there's one) |
| 2 | `GET /v1/search?q=…&translations=*` | `hits[].reference`; `hits[].matches` = `{TRANSLATION: snippet}` **only for translations that contain the word** (not all loaded), `<mark>`-highlighted; `hits[].snippet` = top-ranked matcher's text (**may be a different translation than the top-level `translation`** — render from `matches`, never assume `snippet`'s translation); `total` |
| 3 | `GET /v1/verses/{ref}?translations=KJV,WEB,ASV` | `verses[].text` (per-translation map; omitted verse → `"[verse not included in this translation]"` **or** `null`) |
| 4 | `GET /v1/cross-references/{ref}?include_text=true&limit=20` | `cross_references[].to.reference`, `.text`, `.votes` |

**Why these endpoints.** They are **new since course 1** (multi-translation search, v5-S2),
**new to the learner** (cross-references — older in Concord, but a direct echo of a songbird
feature), need **no translator's notes**, and need **no semantic model** — so they're cheap to
host, fast, and run on the same modest hardware course 1 assumed. Each also best teaches **one**
React idea.

**Explicitly excluded.** Translator's notes (public image ships none — §11). A re-teach of
semantic search (course 1 covered it; in React it's the same idea as Lesson 2 — it lives in
`recipes.md` as optional practice instead).

> All shapes above were read directly from Concord `main` (the v1.1.0 surface): `bible-api`
> response code + `docs/API.md`. Per §5.9, **never invent field names** — build against
> `docs/API.md`, and if a field looks different at runtime, fix the lesson, not reality.

## 8. Repo structure

```
concord-tutorial-react/
  README.md            # front door: the named wound, the "is Concord on?" check, start at Lesson 1
  SETUP.md             # the SAME setup as course 1 (VS Code + Live Server / python http.server)
  CLAUDE.md            # always-on rules: course 1's voice canon, verbatim, + the §3 named-wound addition
  LICENSE              # MIT © 2026 Kris Bennett (parity with Concord & course 1)
  docs/
    SPEC.md            # this file
    banner.svg
    hero.png           # README hero: the compare app, three columns (captured by tools/screenshots)
  lessons/
    01-the-same-verse/      README.md + verse.html      + images/
    02-type-and-watch/      README.md + search.html     + images/
    03-build-once/          README.md + compare.html    + images/
    04-follow-the-thread/   README.md + crossrefs.html  + images/
    05-the-real-thing/      README.md + compare-app/ (runnable Vite project) + images/
  recipes.md           # "steal these" — incl. an optional semantic-search-in-React practice
  ideas.md             # "what could you build?"
  tools/
    screenshots/       # MAINTAINER-ONLY (mirrors course 1's tools/screenshots): Playwright drives each
                       #   lesson page + the Vite app against a live Concord and writes the PNGs into
                       #   each lessons/NN/images/ and docs/hero.png. Learners never touch it; no lesson
                       #   references it (parity with course 1's wall around its screenshot tool).
```

Self-contained per lesson: lesson prose in each folder's own `README.md`, the lesson file beside
it (course 1's structure, so the two repos feel like one family).

## 9. Build plan — sliced for Claude Code

Smallest reviewable, load-bearing unit; **one PR per slice**; branch off `main`; Kris reviews and
merges (**Claude Code never self-merges, never pushes to `main`, never `--force`**); conventional
scoped commits (`docs:`, `feat:`, `chore:`).

| # | Slice | Delivers | Depends on |
|---|---|---|---|
| **T0** | Repo skeleton | README (front door + named wound + Concord-on check), `SETUP.md` (adapted from course 1), `CLAUDE.md`, `LICENSE`, `docs/SPEC.md`, `banner.svg`, `.gitignore` (`node_modules`, `.DS_Store`, editor cruft). No lessons yet. | — |
| **T1** | Lesson 1 (verse · JSX) | The CDN-React skeleton every later lesson reuses (3 script tags + `text/babel`), fetching a verse and rendering it. **Verify the served page on Chrome + Firefox against a live Concord v1.1.0** before later lessons lean on it (mirrors course 1's T2 gate). | T0, Concord v1.1.0 |
| **T2** | Lesson 2 (search · state) — the heart | Search box over `?translations=*`, the `matches` map rendered via the §5.7 helper, results replacing on new query. | T1, Concord v1.1.0 |
| **T3** | Lesson 3 (compare · components/props) | `<TranslationMatch>` + three-column `<Column>`; `isMissing()` carried from course 1. | T2 |
| **T4** | Lesson 4 (cross-refs · fetching) | Verse + its cross-references; click-to-jump (event→`setState`); the one on-load `useEffect`. | T1, T3 |
| **T5** | Lesson 5 (build step + songbird) | npm/Vite conversion (`npm run dev`), then the songbird source walkthrough + naming the four upgrades. **Verify the Vite project runs and the referenced songbird file paths exist at write time.** | T1–T4 |
| **T6** | Screenshots (every page gets a graphical element) | Maintainer-only `tools/screenshots/` (mirrors course 1's: Playwright + `server.mjs`, driven against a **live Concord v1.1.0**) capturing the shot list below into each `lessons/NN/images/` and `docs/hero.png`; the `![…]()` insertions into all six READMEs; the CLAUDE.md graphical-element rule. Interaction-driven where needed (search/compare/Vite need fill+click; cross-refs loads on its own); `songbird-reader.png` is **copied** from songbird's `docs/screenshots/reader.png`. **Lands before T7, so the read-back reviews finished, image-bearing pages.** | T1–T5, Concord v1.1.0 |
| **T7** | `recipes.md` + `ideas.md` + final read-back | "Steal these" (incl. the semantic-search practice), "what could you build?", and the final read-back-as-the-reader pass over the whole course — now with images in place and the closing links resolving. | T1–T6 |
| **T8** | CI: workflow + contract check | `.github/workflows/ci.yml` (Concord **v1.1.0** service + `/healthz` wait, node 20), `tools/screenshots/contract.mjs` asserting the §7 `/v1` shapes each lesson parses (tagged per lesson — notably L2's `matches` map and the `snippet`-may-differ-from-`translation` note), `"contract"` script. The fail-fast schema-drift gate, no browsers. **Proof: CI green against a live v1.1.0 Concord.** | T1–T4, Concord v1.1.0 |

**Screenshot shot list (T6).** Filenames are fixed so the README refs and the tool's output line
up; all use fixed refs/queries so shots stay stable and match the prose. Every shot is the
*running app* against real Concord data:

- **`docs/hero.png`** — the compare app, Psalm 23:1 in three columns (rides under the banner in the README).
- **L1 `images/verse.png`** — John 3:16 (KJV) rendered.
- **L2 `images/search-results.png`** — a search for "lovingkindness" (fill + click + wait), several hits with highlighted matches.
- **L3 `images/compare.png`** — Psalm 23:1 across KJV/WEB/ASV (fill + click), the divine-name contrast.
- **L4 `images/on-load.png`** — John 3:16's cross-refs on load (Romans 5:8 at top) · **`images/jumped.png`** — after clicking Romans 5:8, list replaced.
- **L5 `images/vite-app.png`** — the `compare-app` running through Vite (`npm run dev` up first) · **`images/songbird-reader.png`** — *copied* from songbird's `docs/screenshots/reader.png`.

Placement: the primary shot rides high (top of the lesson's "see it work / run"); secondary shots
sit beside the section that discusses that state. Rich, descriptive alt text on every image (course
1's style) — both the accessibility story and the fallback if an image fails to load. The
search/compare/Vite apps start idle, so the tool fills + clicks + waits before snapping; only
cross-refs populates on its own.

*Deferred:* the originally-planned error/empty secondary shots (L1's "Couldn't reach Concord,"
L2's "no matches") have no home — the lesson READMEs carry no error/empty-state prose to anchor
them. Adding that brief "if you ever see this" reassurance (course 1 has it; this course doesn't
yet) is a separate prose change, not part of a screenshots slice. Every page still carries a
graphical element without them.

**Spec-first per slice (course 1 rhythm):** each slice opens in Plan Mode against this spec; Kris
approves the plan before implementation.

## 10. "Done" means it actually runs

No automated test suite — it's a teaching repo; the proof is that the lesson **works** when served.
Before a slice is done: serve the lesson via the blessed path, open it, and confirm the feature
works end to end on **Chrome and Firefox** against a **live Concord v1.1.0** (a verse appears; the
search results render and replace; the three columns line up and handle omissions honestly;
cross-references render and jump; the Vite project runs). Honor the **no-broken-ending** rule.

**Read it back as the reader, not the author.** Before each PR, walk the lesson top to bottom as
the nervous first-timer following it literally. Every noun explained or obvious; every step has a
how and a why; nothing asks them to break, stop, inventory, or pre-learn. The **whole-course**
test is §2's metric: at Lesson 5, a course-1 graduate opens songbird's source and can read it.

## 11. Out of scope (no build without an explicit scope decision)

- **Translator's notes** — the public Concord image ships none; a notes lesson strands the reader.
- **A from-scratch React tutorial / a comprehensive React reference** — this is a bridge; it
  assumes course 1 and teaches four ideas.
- **Teaching** TypeScript, Tailwind, react-query, routing, or testing — they are **named** in
  Lesson 5 as recognition, **never taught** (they're later courses or self-study).
- **Re-doing the Leaflet map in React** — recognition moment (§5.6), not a build.
- **State-management libraries** (Redux/Zustand), **SSR/Next**, **deployment/hosting** — beyond the
  bridge.
- **Editing the Concord repo or the songbird repo** — course 2 *reads* songbird in Lesson 5; it
  never modifies either (parity with course 1's "never edits the main Concord repo").

## 12. Dependency: the Concord v1.1.0 release (hard prerequisite)

Lesson 2 requires `/v1/search?translations=` (Concord milestone v5-S2, multi-translation keyword
search). That code is merged on Concord `main`, but **no published image carries it**: Concord's
image publish runs only on a version-tag push, and there is **no tag past v1.0.2** — so even
`:latest` predates v5. The course therefore cannot pin a working Concord until a **v1.1.0** release
ships:

1. Bump `bible_api.__version__` `1.0.2 → 1.1.0` (additive `/v1` features ⇒ semver **minor**;
   the `/v1` contract is unbroken).
2. `make openapi` (regenerates `docs/openapi.json`, whose `info.version` flows from
   `__version__`); `make openapi-check` + `make check` green.
3. Update the README's published-image examples to `:v1.1.0`; add a `docs/dev-notes.md` release
   entry (notes keyword search + multi-translation keyword search ship in 1.1.0).
4. PR → Kris merges → **Kris** pushes the `v1.1.0` tag → `publish-image.yml` builds and pushes
   `ghcr.io/kbennett2000/concord:v1.1.0` (`+ :latest + :sha-…`).

This is a **Concord-repo task**, tracked there — not in this repo. This course's README and
`docker`/run guidance pin `:v1.1.0` once it exists.

## Decisions to confirm in planning

- **React CDN + Babel-standalone over `htm`** (§5.1) — strong recommendation; pin React **18.3.1**
  to match songbird. Capture the call in a one-line note when T1 lands.
- **Lesson folder names** (§6/§8) — suggestions above; rhyme with course 1, rename freely.
- **`useEffect` deferred** to the single on-load case (§5.5) — confirm you're good teaching fetching
  primarily as event-handler → `setState`.
- **Highlights via `<mark>`-splitting, never `dangerouslySetInnerHTML`** (§5.7) — matches songbird;
  the helper is *given* in Lesson 2 so the new idea stays *state*.
