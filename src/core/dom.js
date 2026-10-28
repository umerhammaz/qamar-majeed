export const qs = (s, el = document) => el.querySelector(s);
export const qsa = (s, el = document) => [...el.querySelectorAll(s)];
export const on = (el, evt, fn, opts) => el?.addEventListener(evt, fn, opts);
export function el(tag, attrs = {}, html = "") {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) =>
    k === "class" ? (e.className = v) : e.setAttribute(k, v)
  );
  if (html) e.innerHTML = html;
  return e;
}