// app.js：渲染结果
import { tally } from "./tally.js";
import { topWords } from "./top.js";

export function render(spec) {
  const words = spec.words || [];
  const limit = spec.limit || 1;
  const pairs = tally(words);
  const view = topWords(words, limit);
  return { top: view.top || [], counts: view.counts || [], unique: view.unique || 0,
           biggest: view.biggest || 0, count: words.length,
           ranked: pairs.length, limit: limit };
}
