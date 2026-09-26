// top.js：取前几名（复用 tally 的有序结果，截前 limit 名）
import { tally } from "./tally.js";

export function topWords(words, limit) {
  if (typeof limit !== "number" || !Number.isFinite(limit) || limit < 1) {
    const error = new Error("E_BAD_WORD: 取几名的数字必须大于等于一");
    error.code = "E_BAD_WORD";
    throw error;
  }
  const pairs = tally(words);
  const picked = pairs.slice(0, Math.floor(limit));
  return {
    top: picked.map(function (pair) { return pair.word; }),
    counts: picked.map(function (pair) { return pair.count; }),
    unique: pairs.length,
    biggest: pairs.length > 0 ? pairs[0].count : 0
  };
}
