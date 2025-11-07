import { WidgetBase } from "./widget-base.js";

export class RSSWidget extends WidgetBase {
  constructor(){ 
    super(); 
    this.attachShadow({ mode:"open" });
    this.worker = new Worker(new URL("../workers/rss.worker.js", import.meta.url), { type: "module" });
    this.items = [];
  }

  connectedCallback(){
    this.shadowRoot.innerHTML = `
      <style>
        form{display:flex;gap:6px;margin-bottom:8px}
        input,button{background:#0f1422;color:#e6edf3;border:1px solid #2b3242;border-radius:8px;padding:6px 8px}
        ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;max-height:220px;overflow:auto}
        a{color:#7cc7ff;text-decoration:none}
        a:hover{text-decoration:underline}
        .err{color:#ff6b6b}
      </style>
      <form id="f">
        <input id="url" placeholder="Feed URL (e.g. https://hnrss.org/frontpage)" required />
        <button>Load</button>
      </form>
      <div id="status"></div>
      <ul id="list"></ul>
    `;
    const f = this.shadowRoot.getElementById("f");
    const url = this.shadowRoot.getElementById("url");
    url.value = this.config?.url || "";
    f.addEventListener("submit", (e)=>{ e.preventDefault(); this.load(url.value.trim()); });

    this.worker.onmessage = (e) => {
      const { type, payload, error } = e.data || {};
      const status = this.shadowRoot.getElementById("status");
      if (type === "ok") {
        this.items = payload.items || [];
        status.textContent = `Fetched ${this.items.length} items`;
        this.renderList();
      } else if (type === "error") {
        status.innerHTML = `<span class="err">${error||"Failed to load feed"}</span>`;
      } else if (type === "progress") {
        status.textContent = payload || "Loading…";
      }
    };

    if (url.value) this.load(url.value);
  }

  load(url){
    this.config = this.config || {};
    this.config.url = url;
    this.shadowRoot.getElementById("status").textContent = "Loading…";
    this.worker.postMessage({ cmd: "fetch", url });
  }

  renderList(){
    const ul = this.shadowRoot.getElementById("list");
    ul.replaceChildren(...this.items.slice(0, 20).map(it => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${it.link}" target="_blank" rel="noopener">${escapeHtml(it.title)}</a><br><small>${it.pubDate||""}</small>`;
      return li;
    }));
  }

  refresh(){ if (this.config?.url) this.load(this.config.url); }
  copyText(){ return (this.items[0]?.title || "") + (this.items[0]?.link ? ` — ${this.items[0].link}` : ""); }

  disconnectedCallback(){ this.worker?.terminate(); }
}
customElements.define("rss-widget", RSSWidget);

function escapeHtml(s=""){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
