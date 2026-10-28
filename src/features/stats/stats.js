import { stats } from "../../data/stats.data.js";

export default {
  mount(root) {
    const grid = root.querySelector(".f-stats__grid");
    grid.innerHTML = stats
      .map((s) => `
        <div class="f-stats__card">
          <div class="f-stats__value">${s.value}</div>
          <div class="f-stats__label">${s.label}</div>
        </div>
      `)
      .join("");
  }
};