// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let limit = spec.limit || 3;
  parts.log.textContent = "词 " + (spec.words || []).length + " 个，取前 " + limit + " 名。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { limit: limit }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.top.forEach(function (word, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 名";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, view.counts[spot] * 25) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = word + "（" + view.counts[spot] + " 次）";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "不同词 " + view.unique + " 个，最多 " + view.biggest + " 次";
    parts.log.textContent = "取前 " + limit + " 名";
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计前三";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个词";
  addButton.addEventListener("click", function () {
    spec.words = (spec.words || []).concat(["gamma"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.words = (spec.words || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个词";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "beta";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { limit: limit, words: (spec.words || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 现在的名次是第 " + (view.top.indexOf(box.value) + 1) + " 名";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看不同词数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { limit: limit }));
    parts.out.textContent = "不同词 " + view.unique + " 个，最多 " + view.biggest + " 次";
  });
  parts.controls.appendChild(readButton);

  draw();
}
