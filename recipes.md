# Recipes — steal these

You built five real apps. Underneath them was a small set of moves you used again and again. Here
they are on their own, ready to lift straight into whatever you make next. Copy one, change the
parts that are yours, keep going.

These snippets assume React's hooks are in scope — however you got them: from the CDN with
`const { useState } = React;` (Lessons 1–4), or `import { useState } from "react";` (Lesson 5).
And like every lesson, one line says where Concord lives:

```jsx
const CONCORD = "http://localhost:8000"; // change only if Concord runs on another computer
```

---

## Show one verse

The smallest building block: ask Concord for a verse, hand it to a component. *(Lesson 1.)*

```jsx
function Verse({ reference, text }) {
  return (
    <article>
      <h2>{reference}</h2>
      <p>{text}</p>
    </article>
  );
}

const res = await fetch(`${CONCORD}/v1/verses/${encodeURIComponent("John 3:16")}?translations=KJV`);
const data = await res.json();
const verse = data.verses[0];
// use it:  <Verse reference={verse.reference} text={verse.text.KJV} />
```

Concord keeps each translation's words under its own name, so the King James text is `verse.text.KJV`.

## A text box wired to state

The box always shows what's in state; every keystroke updates it. *(Lesson 2.)*

```jsx
const [query, setQuery] = useState("");

<input value={query} onChange={(event) => setQuery(event.target.value)} />
```

## Search when the reader submits

Ask for a word, drop the results into state, let React redraw. *(Lesson 2.)*

```jsx
const [hits, setHits] = useState([]);

async function search(event) {
  event.preventDefault();
  const res = await fetch(`${CONCORD}/v1/search?q=${encodeURIComponent(query)}&translations=*`);
  const data = await res.json();
  setHits(data.hits);
}
// each hit looks like:
//   { reference, snippet, matches: { ASV: "his <mark>lovingkindness</mark> endures forever" } }
// matches holds ONLY the translations whose text contains the word — render from it.
```

## One component, used many times

Write a piece once; stamp it out across a list with `.map`. *(Lesson 3.)*

```jsx
function Row({ item }) {
  return <li><strong>{item.reference}</strong> — {item.text}</li>;
}

<ul>
  {items.map((item) => <Row key={item.reference} item={item} />)}
</ul>
```

The `key` is React's way of telling the items apart — a unique value per row (a reference works well).

## Fetch in response to a click

An event runs a function, the function fetches, the result goes into state. The backbone of
anything interactive. *(Lesson 4.)*

```jsx
const [crossRefs, setCrossRefs] = useState([]);

async function goTo(ref) {
  const res = await fetch(`${CONCORD}/v1/cross-references/${encodeURIComponent(ref)}?include_text=true&limit=20`);
  const data = await res.json();
  setCrossRefs(data.cross_references);
}
// each entry:  { to: { reference }, text, votes }  — ranked by votes, strongest first
// wire it:  <button onClick={() => goTo("Romans 5:8")}>Romans 5:8</button>
```

## Do one thing the moment the page loads

The single job for `useEffect` — run once, when the page first appears, so there's something to
see before the reader touches anything. *(Lesson 4.)*

```jsx
useEffect(() => {
  goTo("John 3:16");
}, []);   // the empty [] means: run once, on first load
```

Everything else stays driven by what the reader does — this is the one on-load case.

## Highlight a match — as text, never raw HTML

Concord marks the matched word with `<mark>` tags inside the snippet. Split on them into real
React pieces, so the word is highlighted *as text* — never injected as HTML. *(Lesson 2; songbird
keeps the grown-up version in `highlight.ts`.)*

```jsx
function markSegments(snippet) {
  return snippet.split(/(<mark>.*?<\/mark>)/g).map((part, i) => {
    const match = part.match(/^<mark>(.*?)<\/mark>$/);
    return match ? <mark key={i}>{match[1]}</mark> : part;
  });
}
// use it:  <p>{markSegments(hit.matches[translation])}</p>
```

## Handle a verse a translation doesn't include

Some translations omit a verse. Concord signals that with `null` *or* a literal placeholder string —
this checks both, so your UI can say so honestly. *(Lesson 3.)*

```jsx
function isMissing(text) {
  return text === null || text === undefined
    || text === "[verse not included in this translation]";
}
// use it:  {isMissing(text) ? <em>not in this translation</em> : text}
```

## A friendly loading-and-error state

One little `status` value covers the whole life of a request — and lets you greet a problem calmly
instead of with a blank page. (The lessons kept this quiet to stay focused; here's the pattern when
you want it.)

```jsx
const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ok" | "error"

async function load() {
  setStatus("loading");
  try {
    const res = await fetch(`${CONCORD}/v1/verses/${encodeURIComponent("John 3:16")}?translations=KJV`);
    if (!res.ok) throw new Error("request failed");
    const data = await res.json();
    setVerse(data.verses[0]);
    setStatus("ok");
  } catch (err) {
    setStatus("error");
  }
}

// in your JSX:
{status === "loading" && <p>Loading…</p>}
{status === "error" && <p>Couldn’t reach Concord — is it running?</p>}
{status === "ok" && <p>{verse.text.KJV}</p>}
```

---

## A stretch: search by *meaning*

You built keyword search in Lesson 2 — type a word, find the verses that contain it. Concord can
also search by **idea**. Give it `verses about anxiety` and it finds the closest verses in meaning,
ranked — even ones that never use the word "anxiety."

It's the same moves you already know, pointed at one different endpoint:

```jsx
const res = await fetch(`${CONCORD}/v1/semantic-search?q=${encodeURIComponent("do not be anxious")}&limit=10`);
const data = await res.json();
setResults(data.results);
// each result:  { reference, text, score }   — already ranked, score closer to 1 = closer in meaning
```

Notice this is *simpler* than the keyword search you handled: `data.results` comes back already
ranked, each with a `reference` and the verse `text` — no `matches` map, no `<mark>` to split.

**Your challenge:** build a little "find verses about…" box. It's your Lesson 2 search, almost
exactly — a box wired to state, a fetch on submit, a list of results — but calling
`/v1/semantic-search` and rendering `data.results`. You already know every piece. Go wire them
together.

---

Want a fuller, real-world example of all of this at once? That's [songbird](https://github.com/kbennett2000/songbird) —
and after this course, you can read it. For the full menu of what Concord can do, its
[`docs/API.md`](https://github.com/kbennett2000/concord/blob/main/docs/API.md) is right there.
