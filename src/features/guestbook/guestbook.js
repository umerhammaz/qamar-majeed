import { ns } from "../../core/storage.js";
import { bus } from "../../core/events.js";

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export default {
  mount(root) {
    const storage = ns("guestbook");
    const form = root.querySelector("#gb-form");
    const nameEl = root.querySelector("#gb-name");
    const msgEl = root.querySelector("#gb-msg");
    const list = root.querySelector("#gb-list");

    const render = () => {
      const msgs = storage.get("messages", []);
      list.innerHTML = msgs.length
        ? msgs
            .slice()
            .reverse()
            .map(
              (m) => `
              <div class="f-gb__msg">
                <strong>${escape(m.name)}</strong>
                <p>${escape(m.text)}</p>
              </div>`
            )
            .join("")
        : `<p class="f-gb__empty">Abhi tak koi message nahi. Pehla tum ho!</p>`;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msgs = storage.get("messages", []);
      msgs.push({ name: nameEl.value.trim(), text: msgEl.value.trim() });
      storage.set("messages", msgs);
      form.reset();
      bus.emit("points:award", 2);
      render();
    });

    render();
  }
};