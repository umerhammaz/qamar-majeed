const PREFIX = "qm";

export function ns(featureId) {
  const key = (k) => `${PREFIX}:${featureId}:${k}`;
  return {
    get(k, fallback = null) {
      try {
        const v = localStorage.getItem(key(k));
        return v == null ? fallback : JSON.parse(v);
      } catch { return fallback; }
    },
    set(k, v) {
      try { localStorage.setItem(key(k), JSON.stringify(v)); } catch {}
    },
    remove(k) {
      try { localStorage.removeItem(key(k)); } catch {}
    }
  };
}