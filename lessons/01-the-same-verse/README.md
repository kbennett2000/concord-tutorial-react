# Lesson 1 — The same verse, the React way

Last course, your very first app fetched a verse from Concord and built it onto the page by hand —
making elements, setting their text, attaching them one by one. It worked, and you understood every
line.

This lesson does the **exact same thing** — show a verse on the page — but lets a tool called
*React* build it for you. Same result, far less wiring. That's the idea you came here for, and
we'll meet it gently.

## See it work first

1. Open this lesson's folder, `lessons/01-the-same-verse/`, in VS Code. *(First time, or a new
   machine? [Set up the editor and preview](../../SETUP.md) — a couple of minutes, just once.)*
2. Click **Go Live** in the bar at the bottom of the window to start your local preview. *(Using
   Python instead? Run `python3 -m http.server 5500` from this folder.)*
3. Your browser opens `verse.html`, and **John 3:16 appears.**

That's a React app, and you just ran one. Now let's see how a handful of lines pulled it off — it's
less than it looks.

## How it works

### The three lines at the top

Open `verse.html` and look at the top, inside the `<head>`. Three `<script>` lines load the tools
straight from the internet — nothing to install:

- **React** — the library that builds a page out of your data.
- **ReactDOM** — puts what React builds onto the screen.
- **Babel** — lets you write React's friendly syntax (next section) and translates it in your
  browser as the page loads. *(That's the brief blink you may have seen before the verse showed
  up — Babel, doing that translation. The last lesson makes the blink disappear, and you'll know
  exactly why.)*

### JSX — HTML, written right inside your code

Here's the piece that's genuinely new. Look at this part of the file:

```jsx
function Verse(props) {
  return (
    <article className="verse">
      <h2>{props.reference}</h2>
      <p>{props.text}</p>
    </article>
  );
}
```

That HTML-looking markup, sitting *inside* a JavaScript function, is **JSX** — and it's the heart
of React. Instead of creating elements one at a time the way you did last course, you simply
*describe what the page should look like*, and React builds the real elements for you.

Two small things to notice:

- The curly braces `{ }` are how you drop your data in. `{props.reference}` means "put the reference
  here"; `{props.text}` means "put the verse text here."
- It says `className`, not `class` — React's one little spelling difference. Same thing you already
  know from HTML.

### A component is a function of your data

`Verse` is a **component**: a function that takes some data and returns what to show for it. The
data arrives as a single bundle called **props** (think *properties* — the values you hand it). Give
`Verse` a reference and some text, and it hands back the page for that verse. *Your page is a
function of your data* — that one sentence is most of React.

### The familiar part: fetching

The rest is what you already did last course — ask Concord for a verse and read the JSON it sends
back:

```jsx
const reference = "John 3:16";
const response = await fetch(`${CONCORD}/v1/verses/${encodeURIComponent(reference)}?translations=KJV`);
const data = await response.json();
const verse = data.verses[0];
```

Then one new line hands that verse to React to draw:

```jsx
root.render(<Verse reference={verse.reference} text={verse.text.KJV} />);
```

`root.render(...)` is ReactDOM putting your `Verse` on the screen — you call the component like a
tag, `<Verse ... />`, and feed it the data. The verse Concord sent back keeps each translation's
text under its name, so the King James text is `verse.text.KJV` — exactly what we pass in.

> Like every lesson here, the file has one line near the top — `const CONCORD = "..."` — that says
> where Concord lives. If yours runs on a different computer, that's the only line you'd change
> ([the details are in SETUP](../../SETUP.md#the-one-setting-each-lesson-carries)).

## You can now…

…write a React component, hand it data, and put it on the page. You did the very same job as your
first-course app — show a verse — with the fiddly DOM-building handed off to React. That's the trade
React makes, and you just felt it for yourself.

**Next:** a verse shows up once. Real apps respond to what you *type* — and you're about to build one
that does. → [Lesson 2](../02-type-and-watch/)
