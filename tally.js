// tally.js：计数（基线：一律给空表）
export function badWord(message) {
  const error = new Error(message || "E_BAD_WORD");
  error.code = "E_BAD_WORD";
  return error;
}

export function tally(words) {
  const counts = new Map();
  for (const raw of words) {
    const word = String(raw).trim();
    if (word === "") throw badWord();
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || (a.word < b.word ? -1 : a.word > b.word ? 1 : 0));
}
