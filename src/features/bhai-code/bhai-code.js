import { bhaiCode } from "../../data/bhaicode.data.js";

export default {
  mount(root) {
    const list = root.querySelector(".f-code__list");
    list.innerHTML = bhaiCode.map((rule) => `<li>${rule}</li>`).join("");
  }
};