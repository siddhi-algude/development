// // public/src/main.js

// import { createStore } from "./store/store.js";
// import { loadState, saveState } from "./store/idb.js";
// import { registry } from "./core/widget-registry.js";
// import { attachDragDrop } from "./core/dnd.js";
// import { bc } from "./store/channel.js";
// import { initGrid } from "./core/grid.js";

// let gridEl, addBtn, addDialog, addConfirm, kindSel, saveBtn, tabsEl;
// let store;
// let filterKind = "all";

// // Background images (no crypto)
// const BG_IMAGES = {
//   default: "/assets/bg/default.jpg",
//   weather: "/assets/bg/weather.jpg",
//   pomodoro: "/assets/bg/pomodoro.jpg",
//   rss: "/assets/bg/rss.jpg", 
//   notes: "/assets/bg/notes.jpg", 
// };

// // Save a widget's config by id (immutably) so it persists to IDB.
// function saveConfig(widgetId, newConfig) {
//   const widgets = store.state.widgets.map(w =>
//     w.id === widgetId ? { ...w, config: { ...newConfig } } : w
//   );
//   store.setState({ widgets }); // triggers IDB save via subscribe()
// }

// function setBackground(kind = "default"){
//   const url = BG_IMAGES[kind] || BG_IMAGES.default;
//   const img = new Image();
//   img.onload  = () => document.documentElement.style.setProperty("--bg-image", `url("${url}")`);
//   img.onerror = () => document.documentElement.style.setProperty("--bg-image", `url("${BG_IMAGES.default}")`);
//   img.src = url;
// }

// document.readyState === "loading" ? window.addEventListener("DOMContentLoaded", ready) : ready();

// function ready() {
//   gridEl     = document.getElementById("grid");
//   addBtn     = document.getElementById("add-widget");
//   addDialog  = document.getElementById("add-dialog");
//   addConfirm = document.getElementById("add-confirm");
//   kindSel    = document.getElementById("widget-kind");
//   saveBtn    = document.getElementById("save-layout");
//   tabsEl     = document.querySelector(".tabs");

//   if (!gridEl || !addBtn || !addDialog || !addConfirm || !kindSel || !saveBtn || !tabsEl) {
//     console.error("Missing UI elements");
//     return;
//   }

//   initGrid(gridEl, { density: "comfortable", gap: 16, minColWidth: 320, snapWhileDragging: true });

//   store = createStore({ widgets: [] });

//   bootstrap();

//   addBtn.addEventListener("click", () => {
//     document.documentElement.style.setProperty("--bg-opacity","0.25");
//     addDialog.showModal();
//   });
//   addDialog.addEventListener("close", () => {
//     document.documentElement.style.setProperty("--bg-opacity","0.35");
//   });
//   addDialog.addEventListener("cancel", () => {
//     document.documentElement.style.setProperty("--bg-opacity","0.35");
//   });

//   addConfirm.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (!kindSel.value) return;
//     const id = crypto.randomUUID();
//     const kind = kindSel.value;
//     const title = kind[0].toUpperCase() + kind.slice(1);
//     if (!registry[kind]) { console.warn(`Unknown widget kind: ${kind}`); return; }

//     store.setState({ widgets: [...store.state.widgets, { id, kind, title, config: {} }] });
//     addDialog.close();
//     setFilter(kind);
//     broadcast();
//     render();
//   });

//   saveBtn.addEventListener("click", async () => {
//     await saveState(store.state);
//     toast("Layout saved");
//   });

//   tabsEl.addEventListener("click", (e) => {
//     const a = e.target.closest(".tab");
//     if (!a) return;
//     e.preventDefault();
//     const k = a.dataset.filter || "all";
//     setFilter(k);
//     render();
//   });

//   attachDragDrop(gridEl, (newOrder) => {
//     const map = new Map(newOrder.map((id, i) => [id, i]));
//     const widgets = [...store.state.widgets].sort((a, b) => (map.get(a.id) ?? 0) - (map.get(b.id) ?? 0));
//     store.setState({ widgets });
//     broadcast();
//   });
// }

// function setFilter(kind="all"){
//   filterKind = kind;
//   document.querySelectorAll(".tabs .tab").forEach(el => {
//     el.classList.toggle("is-active", el.dataset.filter === kind || (kind==="all" && el.dataset.filter==="all"));
//   });
//   setBackground(kind === "all" ? (store.state.widgets[0]?.kind || "default") : kind);
// }

// async function bootstrap() {
//   try {
//     const persisted = await loadState();
//     if (persisted) {
//       // Strip any legacy crypto widgets from old state
//       persisted.widgets = (persisted.widgets || []).filter(w => w.kind !== "crypto");
//       store.setState(persisted);
//     }
//   } catch (e) {
//     console.warn("Failed to load persisted state:", e);
//   }

//   setFilter("all");
//   render();

//   bc.onmessage = (e) => {
//     if (e.data?.type === "state:update") {
//       const incoming = { ...e.data.payload };
//       incoming.widgets = (incoming.widgets || []).filter(w => w.kind !== "crypto");
//       store.setState(incoming);
//       render();
//     }
//   };

//   if ("serviceWorker" in navigator) {
//     try { await navigator.serviceWorker.register("/sw.js"); }
//     catch (e) { console.warn("SW registration failed:", e); }
//   }
// }

// function render() {
//   gridEl.replaceChildren();
//   const list = filterKind === "all"
//     ? store.state.widgets
//     : store.state.widgets.filter(w => w.kind === filterKind);

//   for (const w of list) {
//     const frame = mountWidgetFrame(w);
//     gridEl.appendChild(frame);
//   }
// }

// function mountWidgetFrame(widget) {
//   const tpl = document.getElementById("widget-frame");
//   if (!tpl) { console.error("Missing #widget-frame template"); return document.createElement("div"); }

//   const node = tpl.content.firstElementChild.cloneNode(true);
//   node.dataset.id = widget.id;

//   const titleEl = node.querySelector(".w-title");
//   if (titleEl) titleEl.textContent = widget.title;

//   const body = node.querySelector(".w-body");
//   const Ctor = registry[widget.kind];
//   if (!Ctor) { body.textContent = `Unknown widget: ${widget.kind}`; return node; }

//   const wc = new Ctor();
//   wc.setAttribute("data-id", widget.id);
//   wc.init?.(widget.config || {}, store);
//   body.appendChild(wc);

//   node.addEventListener("click", async (e) => {
//     document.querySelectorAll(".widget.selected").forEach(n => n.classList.remove("selected"));
//     node.classList.add("selected");
//     setBackground(widget.kind);

//     const act = e.target?.dataset?.act;
//     if (!act) return;

//     if (act === "remove") {
//       store.setState({ widgets: store.state.widgets.filter(x => x.id !== widget.id) });
//       broadcast();
//       render();
//       setBackground((store.state.widgets[0]?.kind) || "default");
//     } else if (act === "refresh") {
//       wc.refresh?.();
//     } else if (act === "copy") {
//       const t = wc.copyText?.();
//       if (t) { try { await navigator.clipboard.writeText(t); toast("Copied"); } catch {} }
//     }
//   });

//   return node;
// }

// function broadcast() {
//   bc.postMessage({ type: "state:update", payload: store.state });
// }

// function toast(msg) {
//   const d = document.createElement("div");
//   d.className = "toast";
//   d.textContent = msg;
//   document.body.appendChild(d);
//   setTimeout(() => d.remove(), 1200); 
// }

// ---- TEMP HEALER: ensure required DOM exists ----
(function ensureRequiredDom() {
  const reqIds = ["content", "choose-kind", "choose-select", "choose-label", "add-in-tab", "tile-frame",
                  "tab-all","tab-notes","tab-weather","tab-pomodoro","tab-rss","tab-crypto"];
  const made = [];
  const byId = (id) => document.getElementById(id);

  function ensureMain() {
    if (!byId("content")) {
      const m = document.createElement("main");
      m.id = "content"; m.className = "content";
      document.body.appendChild(m);
      made.push("#content");
    }
  }
  function ensureDialog() {
    if (!byId("choose-kind")) {
      const d = document.createElement("dialog");
      d.id = "choose-kind";
      d.innerHTML = `
        <form method="dialog" id="choose-form" class="chooser">
          <h3>Add widget</h3>
          <div class="row">
            <label class="opt"><span class="ico">📝</span>
              <select id="choose-select">
                <option value="notes">Notes</option>
                <option value="weather">Weather</option>
                <option value="pomodoro">Pomodoro</option>
                <option value="rss">RSS</option>
                <option value="crypto">Crypto</option>
              </select>
            </label>
            <label class="opt"><span class="ico">🏷️</span>
              <input id="choose-label" placeholder="Label (optional)" maxlength="40"/>
            </label>
          </div>
          <menu><button value="cancel">Cancel</button><button value="default">Add</button></menu>
        </form>`;
      document.body.appendChild(d);
      made.push("#choose-kind (+ children)");
    }
  }
  function ensureAddButton() {
    if (!byId("add-in-tab")) {
      const btn = document.createElement("button");
      btn.id = "add-in-tab"; btn.textContent = "+ Add";
      // put it in header if present, else body
      const header = document.querySelector(".topbar") || document.body;
      header.appendChild(btn);
      made.push("#add-in-tab");
    }
  }
  function ensureTemplate() {
    if (!byId("tile-frame")) {
      const t = document.createElement("template"); t.id = "tile-frame";
      t.innerHTML = `
        <section class="tile accent-rot">
          <header class="tile-head">
            <span class="tile-title"></span>
            <div class="tile-actions">
              <button data-act="refresh" title="Refresh">↻</button>
              <button data-act="copy" title="Copy">📋</button>
              <button data-act="remove" class="danger" title="Remove">✖</button>
            </div>
          </header>
          <div class="tile-body"></div>
          <footer class="tile-foot"></footer>
        </section>`;
      document.body.appendChild(t);
      made.push("#tile-frame");
    }
  }
  function ensureTabs() {
    const ids = ["tab-all","tab-notes","tab-weather","tab-pomodoro","tab-rss","tab-crypto"];
    const haveAll = ids.every(id => byId(id));
    if (!haveAll) {
      const header = document.querySelector(".topbar") || document.body.prepend(document.createElement("header"));
      let nav = document.querySelector(".tabs");
      if (!nav) {
        nav = document.createElement("nav"); nav.className = "tabs"; header.appendChild(nav);
      }
      const map = {
        "tab-all":"#/all","tab-notes":"#/notes","tab-weather":"#/weather",
        "tab-pomodoro":"#/pomodoro","tab-rss":"#/rss","tab-crypto":"#/crypto"
      };
      for (const [id, href] of Object.entries(map)) {
        if (!byId(id)) {
          const a = document.createElement("a");
          a.id = id; a.href = href; a.textContent = a.id.replace("tab-","").replace(/^\w/, c => c.toUpperCase());
          nav.appendChild(a); made.push(`#${id}`);
        }
      }
    }
  }

  // Run once DOM is ready
  const run = () => { ensureMain(); ensureDialog(); ensureAddButton(); ensureTemplate(); ensureTabs();
    if (made.length) console.warn("[DashCraft] Injected missing elements:", made.join(", ")); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once:true }); else run();
})();

// public/src/main.js
import { initRouter } from "./router.js";
import { createStore } from "./store/store.js";
import { loadState, saveState } from "./store/idb.js";
import { registry } from "./core/widget-registry.js";
import { safeId } from "./core/utils.js";

const TABS = ["all", "notes", "weather", "pomodoro", "rss", "crypto"];
const DEFAULT_TAB = "all";

// DOM refs (resolved after DOM is ready)
let contentEl = null;
let addInTabBtn = null;

// app state
const store = createStore({ widgets: [] });
let currentTab = DEFAULT_TAB;

console.log("[DashCraft] booting…");

/* ---------------------------
   DOM readiness (defensive)
----------------------------*/
function ensureDomRefs() {
  if (!contentEl) contentEl = document.getElementById("content");
  if (!addInTabBtn) addInTabBtn = document.getElementById("add-in-tab");
  return Boolean(contentEl && addInTabBtn);
}

/* ---------------------------
   Persist a widget's config
----------------------------*/
function saveConfig(widgetId, newConfig) {
  const widgets = store.state.widgets.map((w) =>
    w.id === widgetId ? { ...w, config: { ...newConfig } } : w
  );
  store.setState({ widgets }); // triggers IDB save via subscription
}

/* ---------------------------
   Bootstrap
----------------------------*/
(async function bootstrap() {
  // Wait for DOM nodes if needed
  if (!ensureDomRefs()) {
    await new Promise((res) => {
      if (document.readyState === "loading") {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            ensureDomRefs();
            res();
          },
          { once: true }
        );
      } else {
        // DOM is already interactive/complete, give it a tick
        setTimeout(() => {
          ensureDomRefs();
          res();
        }, 0);
      }
    });
  }

  if (!ensureDomRefs()) {
    console.error(
      "[DashCraft] Required DOM nodes not found. Expect <main id='content'> and #add-in-tab."
    );
    return;
  }

  // Load persisted state (if any)
  const persisted = await loadState().catch(() => null);
  if (persisted) store.setState(persisted);

  // Router: #/tab → setTab
  const router = initRouter(
    TABS.map((tab) => ({
      pattern: `#/${tab}`,
      handler: () => setTab(tab),
    })),
    () => setTab(DEFAULT_TAB)
  );
  router.start();

  // First render
  render();

  // Persist to IDB on any state change
  store.subscribe(async (s) => {
    try {
      await saveState(s);
    } catch {}
  });

  // Add button
  addInTabBtn.addEventListener("click", onAddInTab);

  console.log("[DashCraft] ready.");
})();

/* ---------------------------
   Tabs
----------------------------*/
function setTab(tab) {
  if (!TABS.includes(tab)) tab = DEFAULT_TAB;
  currentTab = tab;

  // Highlight active tab
  for (const t of TABS) {
    const a = document.getElementById(`tab-${t}`);
    if (a) a.classList.toggle("active", t === currentTab);
  }

  render();
}

/* ---------------------------
   Add flow
----------------------------*/
function onAddInTab() {
  if (currentTab === "all") {
    // Use the chooser dialog with label
    const dlg = document.getElementById("choose-kind");
    const sel = document.getElementById("choose-select");
    const lab = document.getElementById("choose-label");

    if (!dlg || !sel) {
      console.warn("[DashCraft] chooser dialog missing; adding Notes.");
      return addWidget("notes", "");
    }

    dlg.showModal();

    // When dialog closes, read values and add
    const onClose = () => {
      const kind = sel.value;
      const label = lab?.value?.trim() || "";
      if (kind) addWidget(kind, label);
      dlg.removeEventListener("close", onClose);
    };
    dlg.addEventListener("close", onClose, { once: true });
    return;
  }

  // For a specific tab, add that kind; optionally prompt for label later
  addWidget(currentTab, "");
}

function addWidget(kind, label = "") {
  if (!(kind in registry)) {
    console.warn("Unknown widget kind:", kind);
    return;
  }
  const id = safeId();
  const title =
    label && label.length ? label : kind[0].toUpperCase() + kind.slice(1);
  const widgets = [
    ...store.state.widgets,
    { id, kind, title, config: {} },
  ];
  store.setState({ widgets });
  render();
}

/* ---------------------------
   Rendering
----------------------------*/
function render() {
  // Re-resolve in case of hot-reload / external edits
  if (!contentEl) contentEl = document.getElementById("content");
  if (!contentEl) {
    console.error("[DashCraft] #content not found at render()");
    return;
  }

  // Filter by current tab
  let items = store.state.widgets;
  if (currentTab !== "all") items = items.filter((w) => w.kind === currentTab);

  // Build one horizontal row
  const row = document.createElement("div");
  row.className = "hrow";

  // Create tiles
  items.forEach((w, idx) => row.appendChild(mountTile(w, idx)));

  // Swap
  contentEl.replaceChildren(row);
}

function mountTile(widget, idx) {
  const tpl = document.getElementById("tile-frame");
  if (!tpl) {
    console.error("[DashCraft] #tile-frame template missing.");
    const fallback = document.createElement("section");
    fallback.textContent = `${widget.title} (template missing)`;
    return fallback;
  }

  const node = tpl.content.firstElementChild.cloneNode(true);

  // Accent rotation for visual variety
  node.classList.remove("accent-rot");
  node.classList.add(`accent-${(idx % 6) + 1}`);

  // Title
  const titleEl = node.querySelector(".tile-title");
  if (titleEl) titleEl.textContent = widget.title;

  // Widget web component
  const body = node.querySelector(".tile-body");
  const Ctor = registry[widget.kind];
  const wc = new Ctor();
  wc.setAttribute("data-id", widget.id);

  // Pass config, store, and a save function the widget can call
  wc.init?.(widget.config || {}, store, (newCfg) =>
    saveConfig(widget.id, newCfg)
  );

  body?.appendChild(wc);

  // Actions: remove / refresh / copy
  node.addEventListener("click", async (e) => {
    const act = e.target?.dataset?.act;
    if (!act) return;

    if (act === "remove") {
      const widgets = store.state.widgets.filter((x) => x.id !== widget.id);
      store.setState({ widgets });
      render();
    } else if (act === "refresh") {
      wc.refresh?.();
    } else if (act === "copy") {
      const t = wc.copyText?.();
      if (t) {
        try {
          await navigator.clipboard.writeText(t);
        } catch {}
      }
    }
  });

  return node;
}

