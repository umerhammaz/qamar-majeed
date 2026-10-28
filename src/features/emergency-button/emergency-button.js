import { qs, on } from "../../core/dom.js";
import { bus } from "../../core/events.js";
import { pick } from "../../core/random.js";
import * as sound from "../../core/sound.js";

const msgs = [
  "Qamar bhai ko message bhej diya gaya: 'Bhai, emergency hai — meme bhej.'",
  "Bhai 2 business days me reply karenge.",
  "Bhai ka status: 'typing...' (12 minutes se).",
  "Bhai ne seen kar diya. Ab dua karo.",
  "Emergency escalate to Group Chat. Good luck."
];

export default {
  mount(root) {
    const btn = qs("#emergency-btn", root);
    const popup = qs("#emergency-popup", root);
    const msg = qs("#emergency-msg", root);
    const close = qs("#emergency-close", root);

    on(btn, "click", () => {
      msg.textContent = pick(msgs);
      popup.hidden = false;
      bus.emit("points:award", 1);
      sound.play("bhai");
    });
    on(close, "click", () => { popup.hidden = true; });
  }
};