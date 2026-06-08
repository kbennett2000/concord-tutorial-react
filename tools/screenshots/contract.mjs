// Contract check: assert the EXACT /v1 response shapes each lesson parses, against a live
// Concord v1.1.0. MAINTAINER / CI tooling only — learners never run it.
// Usage: npm run contract   (needs Concord on :8000)
//
// This is the fail-fast gate: if Concord's /v1 shapes drift from what the lessons read, the
// lessons would silently break in a browser. Catch it here, before the browser smoke runs.
// Every check below is tagged with the lesson that depends on it; the shapes mirror SPEC §7.
const CONCORD = "http://localhost:8000";

let passed = 0;
const failures = [];

function check(where, what, ok) {
  if (ok) passed++;
  else failures.push(`${where} → ${what}`);
}

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isNumber = (v) => typeof v === "number" && !Number.isNaN(v);
// A translation that omits a verse comes back as null OR the literal marker — both mean "missing".
// (Mirrors the lessons' isMissing().)
const isMissingOrString = (v) =>
  v === null ||
  v === undefined ||
  typeof v === "string"; // the literal "[verse not included in this translation]" is a string

async function get(path) {
  const res = await fetch(`${CONCORD}${path}`);
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* leave null */
  }
  return { res, data };
}

const ref = (r) => encodeURIComponent(r);

// ---- baseline: Concord is up and speaking JSON ----
{
  const { res, data } = await get("/healthz");
  check("/healthz", "responds 200", res.status === 200);
  check("/healthz", "returns a JSON object", isObject(data));
}

// ---- Lesson 1: GET /v1/verses/{ref}?translations=KJV ----
// The lesson renders verse.text.KJV — text is a map keyed by translation even when one is asked.
{
  const { res, data } = await get(`/v1/verses/${ref("John 3:16")}?translations=KJV`);
  check("/v1/verses?translations=KJV (L1)", "responds 200", res.status === 200);
  const verses = data && data.verses;
  check("/v1/verses?translations=KJV (L1)", "verses is a non-empty array", Array.isArray(verses) && verses.length > 0);
  const v = Array.isArray(verses) ? verses[0] : null;
  check("/v1/verses?translations=KJV (L1)", "verses[0].reference is a string", v && typeof v.reference === "string");
  check("/v1/verses?translations=KJV (L1)", "verses[0].text is a translation-keyed object", v && isObject(v.text));
  check("/v1/verses?translations=KJV (L1)", "verses[0].text has a KJV key", v && isObject(v.text) && "KJV" in v.text);
  check("/v1/verses?translations=KJV (L1)", "verses[0].text.KJV is a string", v && isObject(v.text) && typeof v.text.KJV === "string");
}

// ---- Lesson 2: GET /v1/search?q=…&translations=* ----
// The lesson renders hits[].reference and hits[].matches (a translation-keyed map). SPEC §7:
//   - `matches` carries ONLY the translations whose text contains the word (not all 13).
//   - each match value is a <mark>-highlighted snippet string.
//   - the response carries a top-level `translation` (the query's default); a hit's `snippet` may
//     be drawn from a DIFFERENT translation than that top-level one — which is exactly why the
//     lesson renders from `matches`, never from `snippet`.
{
  const { res, data } = await get(`/v1/search?q=${ref("love")}&translations=*`);
  check("/v1/search (L2)", "responds 200", res.status === 200);
  check("/v1/search (L2)", "total is a number", data && isNumber(data.total));
  check("/v1/search (L2)", "top-level translation is a string (snippet may differ from it)", data && typeof data.translation === "string");
  const hits = data && data.hits;
  check("/v1/search (L2)", "hits is a non-empty array", Array.isArray(hits) && hits.length > 0);
  const h = Array.isArray(hits) ? hits[0] : null;
  check("/v1/search (L2)", "hits[0].reference is a string", h && typeof h.reference === "string");
  check("/v1/search (L2)", "hits[0].matches is a translation-keyed object", h && isObject(h.matches));
  const keys = h && isObject(h.matches) ? Object.keys(h.matches) : [];
  check("/v1/search (L2)", "hits[0].matches has at least one translation", keys.length > 0);
  check("/v1/search (L2)", "every hits[0].matches value is a string", keys.length > 0 && keys.every((k) => typeof h.matches[k] === "string"));
  check("/v1/search (L2)", "a match snippet carries a <mark> highlight", keys.some((k) => h.matches[k].includes("<mark>")));
  check("/v1/search (L2)", "hits[0].snippet is a string", h && typeof h.snippet === "string");
}

// ---- Lesson 3: GET /v1/verses/{ref}?translations=KJV,WEB,ASV ----
// The lesson renders three columns from verses[].text[name]; an omitted verse is null or the
// literal "[verse not included in this translation]" — both handled honestly by isMissing().
{
  const { res, data } = await get(`/v1/verses/${ref("Psalm 23:1")}?translations=KJV,WEB,ASV`);
  check("/v1/verses?translations=KJV,WEB,ASV (L3)", "responds 200", res.status === 200);
  const verses = data && data.verses;
  check("/v1/verses?translations=KJV,WEB,ASV (L3)", "verses is a non-empty array", Array.isArray(verses) && verses.length > 0);
  const v = Array.isArray(verses) ? verses[0] : null;
  const text = v && v.text;
  check("/v1/verses?translations=KJV,WEB,ASV (L3)", "verses[0].text has all three requested keys (KJV/WEB/ASV)",
    isObject(text) && ["KJV", "WEB", "ASV"].every((t) => t in text));
  check("/v1/verses?translations=KJV,WEB,ASV (L3)", "each translation's text is a string or the honest-missing form",
    isObject(text) && ["KJV", "WEB", "ASV"].every((t) => isMissingOrString(text[t])));
}

// ---- Lesson 4: GET /v1/cross-references/{ref}?include_text=true&limit=20 ----
// The lesson renders cross_references[].to.reference, .text, and .votes.
{
  const { res, data } = await get(`/v1/cross-references/${ref("John 3:16")}?include_text=true&limit=20`);
  check("/v1/cross-references (L4)", "responds 200", res.status === 200);
  const xrefs = data && data.cross_references;
  check("/v1/cross-references (L4)", "cross_references is a non-empty array", Array.isArray(xrefs) && xrefs.length > 0);
  const x = Array.isArray(xrefs) ? xrefs[0] : null;
  check("/v1/cross-references (L4)", "cross_references[0].to is an object", x && isObject(x.to));
  check("/v1/cross-references (L4)", "cross_references[0].to.reference is a string", x && isObject(x.to) && typeof x.to.reference === "string");
  check("/v1/cross-references (L4)", "cross_references[0].text is a string when present", x && (x.text === null || x.text === undefined || typeof x.text === "string"));
  check("/v1/cross-references (L4)", "cross_references[0].votes is a number when present", x && (x.votes === null || x.votes === undefined || isNumber(x.votes)));
}

// ---- report ----
const total = passed + failures.length;
if (failures.length === 0) {
  console.log(`PASS  contract  (${passed}/${total} shape checks against ${CONCORD})`);
} else {
  console.log(`FAIL  contract  (${passed}/${total} passed) — /v1 shapes drifted from what the lessons parse:`);
  for (const f of failures) console.log(`  ❌ ${f}`);
  process.exit(1);
}
