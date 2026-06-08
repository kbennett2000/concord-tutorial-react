// A translation that doesn't include a verse comes back as null or as the literal text
// "[verse not included in this translation]" — either way, it's missing.
function isMissing(text) {
  return (
    text === null || text === undefined || text === "[verse not included in this translation]"
  );
}

// The same Column component from Lesson 3, now in its own file and exported by name —
// exactly how songbird keeps each of its components.
export function Column({ name, verses }) {
  return (
    <div className="col">
      <h2 className="colname">{name}</h2>
      {verses.map((verse) => {
        const text = verse.text[name];
        return (
          <p className="verse" key={verse.reference}>
            <span className="vnum">{verse.verse}</span>
            {isMissing(text) ? <span className="missing">not in this translation</span> : text}
          </p>
        );
      })}
    </div>
  );
}
