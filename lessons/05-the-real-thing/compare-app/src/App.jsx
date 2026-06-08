import { useState } from "react";

import { Column } from "./Column.jsx";

// Where Concord lives. Change this ONLY if Concord runs on another computer.
const CONCORD = "http://localhost:8000";

// This is your Lesson 3 compare app — the exact same code, now living in a real project file.
export function App() {
  const [reference, setReference] = useState("Psalm 23:1");
  const [verses, setVerses] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | ok | error

  async function compare(event) {
    event.preventDefault();
    const ref = reference.trim();
    if (!ref) return;
    try {
      const response = await fetch(
        `${CONCORD}/v1/verses/${encodeURIComponent(ref)}?translations=KJV,WEB,ASV`
      );
      if (!response.ok) throw new Error("not found or unreachable");
      const data = await response.json();
      setVerses(data.verses);
      setStatus("ok");
    } catch (err) {
      setVerses([]);
      setStatus("error");
    }
  }

  return (
    <div className="app">
      <h1>Compare translations</h1>
      <p className="sub">Read a verse side by side in three translations — KJV, WEB, and ASV.</p>

      <form className="searchbar" onSubmit={compare}>
        <input
          value={reference}
          onChange={(event) => setReference(event.target.value)}
          placeholder="try: Psalm 23:1"
          aria-label="verse reference"
        />
        <button type="submit">Compare</button>
      </form>

      {status === "error" && (
        <p className="note error">
          Couldn’t find that — check the reference, and that Concord is running.
        </p>
      )}

      {status === "ok" && verses.length > 0 && (
        <div className="columns">
          <Column name="KJV" verses={verses} />
          <Column name="WEB" verses={verses} />
          <Column name="ASV" verses={verses} />
        </div>
      )}
    </div>
  );
}
