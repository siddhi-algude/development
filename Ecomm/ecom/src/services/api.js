// // src/services/api.js
// // Local-first API with guaranteed fallback.
// // 1) Try local /products.json
// // 2) If that fails, use an embedded fallback array
// // 3) (Optional) You can switch PROVIDER to fakestore/dummyjson later if you want

// const FALLBACK = [
//   { id: 1001, title: "Fallback Tee", price: 18.99, description: "Local fallback tee", image: "https://picsum.photos/seed/fallbacktee/600/600", category: "Fashion" },
//   { id: 1002, title: "Fallback Headphones", price: 79.0, description: "Local fallback audio", image: "https://picsum.photos/seed/fallbackhp/600/600", category: "Electronics" },
//   { id: 1003, title: "Fallback Lamp", price: 21.99, description: "Local fallback decor", image: "https://picsum.photos/seed/fallbacklamp/600/600", category: "Home & Furniture" }
// ];

// let CACHE = null;

// async function loadLocal() {
//   try {
//     if (CACHE) return CACHE;
//     const res = await fetch("/products.json", { cache: "no-store" });
//     console.log("data obtained from product json ",res.json)
//     if (!res.ok) throw new Error("local /products.json not found");
//     CACHE = await res.json();
//     return CACHE;
//   } catch (e) {
//     console.warn("[api] Using embedded FALLBACK:", e.message);
//     CACHE = FALLBACK;
//     return CACHE;
//   }
// }


// export async function getProducts() {
//   return loadLocal();
// }

// export async function getProduct(id) {
//   const all = await loadLocal();
//   const item = all.find(p => String(p.id) === String(id));
//   if (!item) throw new Error("Product not found");
//   return item;
// }

// export async function getCategories() {
//   const all = await loadLocal();
//   return [...new Set(all.map(p => p.category))];
// }

// export async function getProductsByCategory(category) {
//   const all = await loadLocal();
//   return all.filter(p => p.category === category);
// }

// src/services/api.js
// Local data only: reads from public/products.json

let CACHE = null;

async function loadAll() {
  if (CACHE) return CACHE;

  const res = await fetch("/products.json", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load public/products.json");
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("products.json must be an array");
  }

  CACHE = data;
  return CACHE;
}

export async function getProducts() {
  return loadAll();
}

export async function getProduct(id) {
  const all = await loadAll();
  const item = all.find((p) => String(p.id) === String(id));
  if (!item) throw new Error("Product not found");
  return item;
}

export async function getCategories() {
  const all = await loadAll();
  return [...new Set(all.map((p) => p.category))];
}

export async function getProductsByCategory(category) {
  if (!category) return getProducts();
  const all = await loadAll();
  return all.filter((p) => p.category === category);
}
