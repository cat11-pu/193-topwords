// tally.js：计数（映射一次扫描，按次数降序、词升序排列）
export function tally(words) {
  const counts = new Map();
  for (const raw of words) {
    const word = String(raw).trim();
    if (word === "") {
      const error = new Error("E_BAD_WORD: 词去空白后为空");
      error.code = "E_BAD_WORD";
      throw error;
    }
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return Array.from(counts, function (entry) {
    return { word: entry[0], count: entry[1] };
  }).sort(function (a, b) {
    if (b.count !== a.count) return b.count - a.count;
    return a.word < b.word ? -1 : a.word > b.word ? 1 : 0;
  });
}
