import { bus } from "../../core/events.js";
import { qs, on } from "../../core/dom.js";

export default {
  mount(root) {
    const overlay = qs("#secret-overlay", root);
    const close = qs("#secret-close", root);

    bus.on("secret:activated", () => {
      overlay.hidden = false;
      confetti(root);
    });

    on(close, "click", () => { overlay.hidden = true; });
  }
};

function confetti(parent) {
  const wrap = document.createElement("div");
  wrap.className = "f-secret__confetti";
  parent.appendChild(wrap);
  const colors = ["#f9d923", "#f10c45", "#1e90ff", "#4caf50", "#ff6b00"];
  for (let i = 0; i < 60; i++) {
    const s = document.createElement("span");
    s.style.background = colors[i % colors.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 1.2 + "s";
    s.style.animationDuration = 1.5 + Math.random() * 1.5 + "s";
    wrap.appendChild(s);
  }
  setTimeout(() => wrap.remove(), 4000);
}