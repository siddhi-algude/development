export function createStore(initial) {
  const subs = new Set();
  const state = structuredClone(initial);
  return {
    get state() { return structuredClone(state); },
    subscribe(fn){ subs.add(fn); return () => subs.delete(fn); },
    setState(patch) {
      Object.assign(state, patch);
      for (const fn of subs) fn(structuredClone(state));
    }
  };
}
