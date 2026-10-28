import { qs, on } from "../../core/dom.js";
import { bus } from "../../core/events.js";
import { ns } from "../../core/storage.js";

export default {
  mount(root) {
    const storage = ns("navbar");
    const pointsEl = qs("#navbar-points", root);
    const logo = qs("#navbar-logo", root);
    const menu = qs("#navbar-menu", root);
    const burger = qs("#navbar-burger", root);
    const themeBtn = qs("#navbar-theme", root);

    let points = storage.get("points", 0);
    pointsEl.textContent = points;

    bus.on("points:award", (n) => {
      points += Number(n) || 0;
      storage.set("points", points);
      pointsEl.textContent = points;
    });

    on(burger, "click", () => menu.classList.toggle("is-open"));
    on(menu, "click", (e) => {
      if (e.target.tagName === "A") menu.classList.remove("is-open");
    });

    const applyTheme = (t) => {
      document.documentElement.setAttribute("data-theme", t);
      themeBtn.textContent = t === "dark" ? "☀" : "🌙";
    };
    applyTheme(storage.get("theme", "light"));
    on(themeBtn, "click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      storage.set("theme", next);
      applyTheme(next);
      bus.emit("theme:changed", next);
    });

    let clicks = 0;
    let resetTimer;
    on(logo, "click", (e) => {
      e.preventDefault();
      clicks++;
      clearTimeout(resetTimer);
      if (clicks >= 5) {
        clicks = 0;
        bus.emit("secret:activated");
      } else {
        resetTimer = setTimeout(() => { clicks = 0; }, 2000);
      }
    });
  }
};