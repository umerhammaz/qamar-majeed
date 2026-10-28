import { qs, on } from "../../core/dom.js";
import { bus } from "../../core/events.js";
import * as sound from "../../core/sound.js";

export default {
  mount(root) {
    const bhBtn = qs("#hero-bhai", root);
    const roastBtn = qs("#hero-roast", root);
    const floats = qs(".f-hero__floats", root);
    const emojis = ["🤝", "😂", "🏆", "☕", "📱", "🔥"];

    emojis.forEach((e, i) => {
      const s = document.createElement("span");
      s.className = "f-hero__float";
      s.textContent = e;
      s.style.left = 10 + i * 14 + "%";
      s.style.top = 15 + (i % 3) * 25 + "%";
      s.style.animationDelay = i * 0.4 + "s";
      floats.appendChild(s);
    });

    on(bhBtn, "click", () => {
      bus.emit("points:award", 5);
      sound.play("bhai");
      bhBtn.textContent = "Bhai Confirmed ✓";
    });

    on(roastBtn, "click", () => {
      document.getElementById("f-roast-generator")?.scrollIntoView({ behavior: "smooth" });
    });
  }
};