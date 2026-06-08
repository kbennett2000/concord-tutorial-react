# Lesson 5 — The real thing

You've built four real things now — a verse, a search, a side-by-side compare, a thread you can
follow across Scripture. Every one started the same way: three `<script>` tags, and a tiny pause on
load while Babel translated your JSX in the browser.

That pause was training wheels. It let you learn React with nothing to install — open a file and go.
It's done its job. This lesson swaps it for the real thing, and the first thing you'll notice is that
the pause is gone.

It's also the lesson where you open **songbird** — the app that made you want to close the tab, back
at the start — and find you can read it.

## Part 1 — A real build

### What this fixes

Three things have been quietly true the whole time:

- That blink on load — Babel translating your code in the browser, every single time.
- Your page fetches React from the internet each time it loads, so it can't work offline.
- Everything lives in one big file.

A **build step** fixes all three. The idea: a tool translates your JSX *once, ahead of time*, and
bundles everything — React included — into files a browser just runs. No translating in the browser,
no internet needed, and your code can spread across tidy files.

### The tools (you install one)

- **Node** — a program that runs JavaScript on your computer, not just in a browser. You install it
  once, and it's what the build tool runs on. [Get it here](https://nodejs.org/); the version it
  offers by default is fine.
- **npm** comes *with* Node. It installs the libraries a project needs (React, the build tool) into a
  folder called `node_modules`.
- **Vite** is the build tool. It runs a fast local preview while you work, and does the JSX
  translation ahead of time — so there's no blink.

This is the one lesson that needs npm, which is exactly why it's last. Everything before it, you ran
with nothing installed.

### See it run

We've set up your Lesson 3 compare app as a real project so you can see it the moment you're ready.
*(In real life you'd start one with `npm create vite`; we've done that part for you.)*

1. Open a terminal in the `lessons/05-the-real-thing/compare-app/` folder. *(VS Code has one built
   in: the **Terminal** menu → **New Terminal**, then make sure it's pointed at that folder.)*
2. Run `npm install`. This downloads React and Vite into `node_modules`. It takes a minute — and
   it's the last setup in the whole course.

   ```
   npm install
   ```

3. Run `npm run dev`. Vite prints a local address (usually `http://localhost:5173`). Open it.

   ```
   npm run dev
   ```

There's your compare app — Psalm 23:1 in three translations, divine-name contrast and all. **And no
blink.** Type a new reference; it's instant.

### What changed — and what didn't

Open the `compare-app` folder. The component code is the **same code you wrote in Lesson 3** — your
`App` and your `Column`. What changed is the shape around it:

- **No `<script>` tags.** Look at `src/main.jsx`: instead of loading three tools from a CDN, it
  *imports* what it needs at the top — `import ReactDOM from "react-dom/client"`. But that
  `render(<App />)` line? The very one you've written since Lesson 1.
- **Components live in their own files.** `Column` sits in `src/Column.jsx`, which `export`s it;
  `App.jsx` `import`s it back. Each piece in its own file, joined by name. *(That's the answer to
  "why does songbird have so many files" — and it's next.)*
- **The blink and the CDN are gone.** Vite translated your JSX ahead of time and bundled React right
  in, so the app no longer reaches out to the internet to load. It'd run on a plane.

That's the whole build step: one tool, doing once-and-for-all what Babel was doing live.

## Part 2 — Open the real thing

Now the moment this whole course was pointed at.

Get songbird's code: on [its GitHub page](https://github.com/kbennett2000/songbird), click the green
**Code** button → **Download ZIP**, and unzip it. You don't need to run it — we're just going to
read. Open the folder in VS Code and find `frontend/src`.

Take a breath. This is the project that made you want to close the tab. Look what's inside.

### You've seen all of this

- **`src/main.tsx`** — the very first file. There's your line: `ReactDOM.createRoot(...).render(<App
  />)`. (It's wrapped in a couple of extra tags — ignore them for now; the heart is the line you
  know.)
- **`src/components/VerseText.tsx`** — your Lesson 1: a verse, drawn from data.
- **`src/routes/SearchView.tsx`** — your Lesson 2 search. Scroll down and you'll find `markSegments` —
  the *exact same* highlight helper you used.
- **`src/components/CrossReferences.tsx`** — your Lesson 4, nearly line for line: a list of
  cross-references, each clickable, jumping you to the verse.
- **`src/components/MapView.tsx`** — the map you built in your *first* course, wearing React.

It isn't a different planet. It's the things you built, each in its own file.

### The four new things — named, not feared

Open `CrossReferences.tsx` and you'll meet four things you haven't seen. Here's each one — and every
one is the grown-up version of something you already did:

1. **The build step** — you just learned it. songbird is a bigger Vite project, exactly like your
   `compare-app`.
2. **react-query** — the line `const query = useQuery({ ... })`. It's the polished version of the
   *fetch-then-`setState`* you did by hand in Lesson 4: it fetches, remembers the answer, and tracks
   loading and errors for you.
3. **Tailwind** — `className="text-sm text-gray-500"`. That's just CSS, written as small prebuilt
   class names instead of a separate stylesheet.
4. **TypeScript** — `interface CrossReferencesProps { ... }`, and the `: string` notes. They spell
   out the *shape* of the data. Underneath them, the React is exactly what you learned.

You don't know these yet, and that's fine — they're the next small steps, each one learnable on its
own. But not one of them is the wall. The wall was never really there.

## You did it

You finished the first course and songbird looked impossible. Read `CrossReferences.tsx` one more
time. It's your code — your Lesson 4 — with a few tools layered on that you can now *name*, and learn
when you're ready.

That's what being a builder is: not knowing everything, but being able to open a real project,
recognize the bones, and find your way in. You can do that now.

You're a Concord builder. Go build something — [a few ideas to start from](../../ideas.md), or
[snippets to steal](../../recipes.md). And songbird's whole source is right there whenever you want
it, waiting to be read.
