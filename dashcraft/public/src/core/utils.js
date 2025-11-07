// public/src/core/utils.js

export const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

export function throttle(fn, wait = 300) {
  let last = 0, timer;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      clearTimeout(timer);
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

/** fetch with timeout + JSON guard */
export async function safeFetchJSON(url, { timeout = 8000, ...init } = {}) {
  const ac = new AbortController();
  const id = setTimeout(() => ac.abort(), timeout);
  try {
    const res = await fetch(url, { ...init, signal: ac.signal });
    const text = await res.text();
    try { return JSON.parse(text); }
    catch { return text; }
  } finally {
    clearTimeout(id);
  }
}

/** format seconds => "MM:SS" */
export function mmss(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
