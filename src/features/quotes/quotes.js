import { quotes } from "../../data/quotes.data.js";
import { pick } from "../../core/random.js";

export default {
  mount(root) {
    const box = root.querySelector("#quotes-box");
    const btn = root.querySelector("#quotes-btn");
    btn.addEventListener("click", () => {
      box.textContent = pick(quotes);
    });
  }
};