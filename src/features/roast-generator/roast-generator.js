import { roasts } from "../../data/roasts.data.js";
import { pick } from "../../core/random.js";
import { bus } from "../../core/events.js";
import * as sound from "../../core/sound.js";

export default {
  mount(root) {
    const out = root.querySelector("#roast-output");
    const btn = root.querySelector("#roast-btn");
    btn.addEventListener("click", () => {
      out.textContent = '"' + pick(roasts) + '"';
      out.classList.remove("f-roast__pop");
      void out.offsetWidth;
      out.classList.add("f-roast__pop");
      bus.emit("points:award", 2);
      sound.play("lol");
    });
  }
};