# Setup — get the files and run them

This is the one-time setup: getting the lesson files onto your computer, and starting a local
preview to run them in your browser. You'll use it **from Lesson 1** — unlike the first course, the
very first lesson is already a page you run.

**Did the first course?** This is the same setup, start to finish. If you still have VS Code and the
Live Server extension from then, you're already there — skip to [The one setting each lesson
carries](#the-one-setting-each-lesson-carries). New machine, or want a refresher? The full
walkthrough is right here.

## Get the files

Right now you're looking at this course on GitHub, in your web browser. First, get your own copy
onto your computer:

1. On this repo's page on GitHub, click the green "Code" button, then "Download ZIP."
2. Unzip it — on most computers, just double-click the downloaded file. You'll get a folder named
   `concord-tutorial-react`.

That unzipped folder holds everything — every lesson and its files. When a lesson says "this folder"
or "the lesson's folder," it means one of the folders inside `lessons/`, like
`lessons/01-the-same-verse/`.

Already use git? `git clone https://github.com/kbennett2000/concord-tutorial-react` works too.

## How to run a lesson

Each lesson is a real file you open in a web browser. There's one way to open it that works, and the
friendly setup below gets you there in a few minutes — you only do it once, and then it's the same
every lesson. Here's the easy path.

### The easy way: VS Code + Live Server

[VS Code](https://code.visualstudio.com/) is a free code editor from Microsoft — a program for
opening and editing the lesson files. If you don't have it yet, download and install it from that
link; it's free and takes a couple of minutes.

Inside VS Code you'll add one *extension* — a small add-on you install with a single click. The one
we want is **Live Server**: it shows your lesson page in the browser at `http://localhost` and
quietly refreshes it every time you save, so your changes appear instantly.

Once VS Code is installed:

1. Open the lesson's folder in VS Code.
2. Install the Live Server extension once: open the Extensions panel, search for "Live Server," and
   click "Install."
3. Click "Go Live" in the bar at the bottom of the window.

Your lesson page opens at `http://localhost:5500`. That's it — you're running.

### Already comfortable with a terminal? Use Python instead

If you'd rather not install VS Code and you've used a *terminal* before — the text window where you
type commands to your computer directly — you can serve a lesson with Python instead. *Python* is a
programming language; we use it here only to run a tiny local web server, nothing more.

Open a terminal inside the lesson's folder and check whether Python is already there:

```
python3 --version
```

If you see a version number, you're set. If not, install it from
[python.org/downloads](https://www.python.org/downloads/).

Then run this command to serve the lesson:

```
python3 -m http.server 5500
```

and visit `http://localhost:5500` in your browser.

**Opening the file by double-clicking it does not work.** When you double-click an `.html` file,
your browser loads it from a `file://` address, and browsers refuse to let a `file://` page talk to
Concord — so the page sits there blank or broken. This isn't a maybe. Always serve the lesson over
`http://localhost` using one of the two methods above.

### The one setting each lesson carries

Every lesson file has a single line near the top of its code that tells it where to find Concord:

```js
const CONCORD = "http://localhost:8000"; // ← change this only if Concord runs on another computer
```

There are **two different addresses** in play, on purpose:

- `http://localhost:5500` — where *your page* lives (the one Live Server or Python serves).
- `http://localhost:8000` — where *Concord* lives (the one your page talks to).

If Concord runs on the same computer as you, leave that line exactly as it is.

If Concord runs on another computer on your network, change only that one line to that machine's
address (for example `http://192.168.1.62:8000`). Concord's
[Deployment docs](https://github.com/kbennett2000/concord#deployment) show how to find it.

## When it won't connect

If a lesson page sits blank, or you see "Couldn't reach Concord," don't worry — it's almost always
one of a few small things, each with a quick fix. The fastest way to tell which is to open Concord's
own check in your browser:

```
http://localhost:8000/healthz
```

That asks Concord directly (your browser talks to it straight, so it works even before any lesson
page does). If a short line of data comes back, Concord is on, and the trouble is on the page side.
If nothing comes back, Concord itself is the thing to start. Find your symptom below:

| What you see | What it means | What to do |
|---|---|---|
| The lesson page is blank, or `http://localhost:5500` won't open | Your local preview isn't running — or you opened the file by double-clicking it (a `file://` address, which can't talk to Concord) | Start the preview again — in VS Code, click **Go Live**; with Python, re-run `python3 -m http.server 5500` — and open the page through `http://localhost`, not by double-clicking |
| `http://localhost:8000/healthz` doesn't load at all | Concord isn't running. Concord runs inside **Docker** — the free program that runs it on your computer — so Docker has to be started first | Open Docker, then start Concord the way Concord's [Quick start](https://github.com/kbennett2000/concord#quick-start) shows |
| The page loads but shows **"Couldn't reach Concord"** | The page reached your screen fine, but can't find Concord at the address in its `CONCORD` line | Open `http://localhost:8000/healthz` to confirm Concord is on, then check that the `CONCORD` line points to where it actually runs |
