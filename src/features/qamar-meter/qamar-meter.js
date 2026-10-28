import { moods } from "../../data/moods.data.js";
import { pick } from "../../core/random.js";
import * as sound from "../../core/sound.js";

export default {
  mount(root) {
    const display = root.querySelector("#meter-display");
    const btn = root.querySelector("#meter-btn");
    btn.addEventListener("click", () => {
      display.textContent = pick(moods);
      display.classList.remove("f-meter__flash");
      void display.offsetWidth;
      display.classList.add("f-meter__flash");
      sound.play("hmm");
    });
  }
};