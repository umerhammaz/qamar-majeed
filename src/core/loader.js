import * as storage from "./storage.js";
import { bus } from "./events.js";
import * as dom from "./dom.js";
import * as random from "./random.js";
import * as sound from "./sound.js";

export async function loadFeatures(features, deps = {}) {
  const sorted = features
    .filter((f) => f.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  for (const f of sorted) {
    try {
      if (f.css) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = new URL(f.css, document.baseURI).href;
        document.head.appendChild(link);
      }
      const target = document.querySelector(f.target || "#app");
      let root;
      if (f.html) {
        const res = await fetch(new URL(f.html, document.baseURI));
        if (!res.ok) throw new Error(`HTML ${f.html} → ${res.status}`);
        const html = await res.text();
        const wrap = document.createElement("section");
        wrap.id = "f-" + f.id;
        wrap.className = "feature feature--" + f.id;
        wrap.innerHTML = html;
        target.appendChild(wrap);
        root = wrap;
      } else {
        root = target;
      }
      if (f.module) {
        const mod = await import(new URL(f.module, document.baseURI).href);
        const instance = mod.default || mod;
        const ctx = {
          events: bus,
          storage: storage.ns(f.id),
          dom,
          random,
          sound
        };
        if (instance.mount) instance.mount(root, ctx);
      }
    } catch (err) {
      console.warn("[loader] feature failed:", f.id, err);
    }
  }
}