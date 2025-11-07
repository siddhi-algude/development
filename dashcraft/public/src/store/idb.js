const DB = "dashcraft-db", VER = 1, KEY = "state";
let dbPromise;

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((res, rej) => {
    const req = indexedDB.open(DB, VER);
    req.onupgradeneeded = () => req.result.createObjectStore("kv");
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
  return dbPromise;
}

export async function saveState(state) {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").put(state, KEY);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function loadState() {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction("kv", "readonly");
    const req = tx.objectStore("kv").get(KEY);
    req.onsuccess = () => res(req.result || null);
    req.onerror = () => rej(req.error);
  });
}
