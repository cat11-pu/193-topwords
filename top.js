// top.js：取前几名（基线：一律给空表）
import { tally, badWord } from "./tally.js";

export function topWords(words, limit) {
  if (!Number.isInteger(limit) || limit < 1) throw badWord();
  const pairs = tally(words);
  const chosen = pairs.slice(0, limit);
  const counts = chosen.map((pair) => pair.count);
  return {
    top: chosen.map((pair) => pair.word),
    counts,
    unique: pairs.length,
    biggest: counts.length ? counts[0] : 0,
  };
}
