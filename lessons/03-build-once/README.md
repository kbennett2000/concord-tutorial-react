# Lesson 3 — Build a piece once, use it everywhere

Last lesson, your search showed a *list* of different verses. This one does something else: it takes
**one** verse and shows it three ways at once — the same passage in three translations, side by
side.

And here's the move you're here for. You'll build those three columns out of a **single piece of
code, used three times**. Write it once; stamp it out as often as you like. That's a *reusable
component* — and it's the answer to why songbird has all those files.

## See it work first

1. Open this lesson's folder, `lessons/03-build-once/`, in VS Code and click **Go Live** (or
   `python3 -m http.server 5500` from the folder). *(Setup reminder lives in
   [SETUP.md](../../SETUP.md).)*
2. The box opens filled with **Psalm 23:1**. Click **Compare**.
3. Three columns appear — the same verse in KJV, WEB, and ASV.

Look across them. *The LORD* is my shepherd. *Yahweh* is my shepherd. *Jehovah* is my shepherd. One
verse, three translators, three different ways of writing the name of God — lined up where you can
see it at a glance. Try another reference (say, `John 1:1`) and watch all three columns change
together.

## How it works

The search box, the fetching, the state — that's all the machinery you already built in Lesson 2,
working the same way here (one piece of state for the box, one for the verses). What's new is what
draws the columns.

### One component, used three times

Look near the bottom of the file:

```jsx
<Column name="KJV" verses={verses} />
<Column name="WEB" verses={verses} />
<Column name="ASV" verses={verses} />
```

There it is: **`Column` is written once, then used three times** — each time with a different
`name`. That's *reuse*, and it's the whole lesson. You don't write three columns; you write one
column and ask for it three times.

Remember the result block you wrote in Lesson 2? A reusable component is exactly that idea, given a
name so you can use it again and again.

### What's inside Column

`Column` is a component like the ones before — a function that takes data and returns what to show.
Two small things are worth a look:

```jsx
function Column({ name, verses }) {
  return (
    <div className="col">
      <h2 className="colname">{name}</h2>
      ...
    </div>
  );
}
```

- **`{ name, verses }`** is a tidier way to take props. In the earlier lessons we wrote `props` and
  reached in with `props.reference`. Here we pull the two values we want straight out, by name, in
  the parentheses. Same idea, less typing — and it's exactly how songbird writes its components.
- Inside, it picks out *its own* translation's text with `verse.text[name]` — so the KJV column reads
  `verse.text.KJV`, the WEB column reads `verse.text.WEB`, all from the one component.

### Asking for three translations at once

The fetch is the familiar shape, with three translations named on the end:

```jsx
const response = await fetch(`${CONCORD}/v1/verses/${encodeURIComponent(ref)}?translations=KJV,WEB,ASV`);
```

Concord sends back each verse with its text under every translation's name — `verse.text.KJV`,
`verse.text.WEB`, `verse.text.ASV` — which is exactly what each `Column` reaches for.

> If a translation simply doesn't include a verse, that column says so honestly — *"not in this
> translation"* — using the same `isMissing` check you wrote in your first course. (And as always,
> the `CONCORD` line at the top is the only thing to change if Concord runs elsewhere.)

## You can now…

…build a component once and use it as many times as you need, handing each one different data. Three
columns from one definition — no copy-paste, no repetition.

Open songbird's `frontend/src/components/` folder sometime and you'll see a stack of files —
`VerseText`, `CrossReferences`, and more. **Every one of them is a `Column`**: a piece written once,
reused wherever it's needed. That wall of files that made the project look impossible? You just
learned what each file *is*.

**Next:** every verse points to others — cross-references that say "see also…". Let's show them, and
let the reader click to follow the thread. → [Lesson 4](../04-follow-the-thread/)
