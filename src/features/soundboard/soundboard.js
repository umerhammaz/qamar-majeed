import * as sound from "../../core/sound.js";

export default {
  mount(root) {
    root.querySelectorAll(".f-sb__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.play(btn.dataset.sound);
        btn.classList.remove("f-sb__hit");
        void btn.offsetWidth;
        btn.classList.add("f-sb__hit");
      });
    });
  }
};