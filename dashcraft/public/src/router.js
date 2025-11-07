// public/src/router.js

/**
 * Tiny hash router.
 * Usage:
 *  initRouter([
 *    { pattern: '#/',           handler: () => renderHome() },
 *    { pattern: '#/settings',   handler: () => renderSettings() }
 *  ]);
 */
export function initRouter(routes, onNotFound = () => {}) {
  function match() {
    const h = location.hash || "#/";
    const r = routes.find(x => h.startsWith(x.pattern));
    return r ? r.handler(h) : onNotFound(h);
  }
  window.addEventListener("hashchange", match);
  return { start: match };
}
