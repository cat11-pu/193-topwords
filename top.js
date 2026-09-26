// top.js：取前几名（基线：一律给空表）
import { tally } from "./tally.js";

export function topWords(words, limit) {
  return { top: [], counts: [], unique: 0, biggest: 0 };
}
