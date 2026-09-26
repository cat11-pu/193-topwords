import assert from "node:assert";
import { tally } from "../tally.js";
import { topWords } from "../top.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("tally returns a list", () => {
  assert.ok(Array.isArray(tally(["a"])));
});

check("topWords returns top list", () => {
  assert.ok(Array.isArray(topWords(["a"], 1).top));
});

check("topWords returns counts", () => {
  assert.ok(Array.isArray(topWords(["a"], 1).counts));
});

check("render counts words", () => {
  assert.strictEqual(typeof render({ words: ["a"], limit: 1 }).count, "number");
});

check("render exposes unique", () => {
  assert.strictEqual(typeof render({ words: ["a"], limit: 1 }).unique, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
