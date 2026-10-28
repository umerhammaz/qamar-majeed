import { site } from "../../config/site.config.js";
import { features } from "../../config/features.config.js";
import { loadFeatures } from "./loader.js";
import { bus } from "./events.js";

async function boot() {
  document.title = `${site.name} — ${site.tagline}`;
  const root = document.documentElement;
  root.style.setProperty("--brand", site.colors.brand);
  root.style.setProperty("--brand-2", site.colors.brand2);
  root.style.setProperty("--bg", site.colors.bg);
  root.style.setProperty("--fg", site.colors.fg);
  await loadFeatures(features, { events: bus });
}

boot();