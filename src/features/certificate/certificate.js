import { qs, on } from "../../core/dom.js";
import { bus } from "../../core/events.js";
import { ns } from "../../core/storage.js";

export default {
  mount(root) {
    const input = qs("#cert-name", root);
    const out = qs("#cert-name-out", root);
    const genBtn = qs("#cert-generate", root);
    const printBtn = qs("#cert-print", root);
    const storage = ns("certificate");

    const saved = storage.get("name", "");
    if (saved) { input.value = saved; out.textContent = saved; }

    on(genBtn, "click", () => {
      const name = input.value.trim() || "Dost";
      out.textContent = name;
      storage.set("name", name);
      bus.emit("points:award", 3);
    });

    on(printBtn, "click", () => window.print());
  }
};