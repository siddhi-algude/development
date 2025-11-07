import { WidgetBase } from "./widget-base.js";

export class CryptoWidget extends WidgetBase {
  constructor(){ 
    super(); 
    this.attachShadow({ mode:"open" }); 
    this._int = null; 
    this._io = null; 
    this.price = null;
  }
  connectedCallback(){
    this.shadowRoot.innerHTML = `
      <style>
        .row{display:flex;align-items:center;gap:10px}
        .big{font-size:22px;font-weight:800}
        small{opacity:.7}
        button{background:#1f2430;color:#e6edf3;border:1px solid #2b3242;border-radius:8px;padding:4px 8px;cursor:pointer}
      </style>
      <div class="row">
        <div>
          <div class="big" id="price">Loading BTC…</div>
          <small id="ts"></small>
        </div>
        <button id="now">Refresh</button>
      </div>`;
    this.shadowRoot.getElementById("now").onclick = () => this.pollOnce();
    // pause polling when not visible
    this._io = new IntersectionObserver((entries)=>{
      entries.forEach(e => e.isIntersecting ? this.start() : this.stop());
    });
    this._io.observe(this);
  }

  start(){ if (this._int) return; this.pollOnce(); this._int = setInterval(()=>this.pollOnce(), 30_000); }
  stop(){ clearInterval(this._int); this._int = null; }

  async pollOnce(){
    const ac = new AbortController(); const to = setTimeout(()=>ac.abort(), 8000);
    try {
      // Coindesk free endpoint (no key). You can swap to any other public price API.
      const j = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json", { signal: ac.signal })
        .then(r => r.json());
      clearTimeout(to);
      const price = j?.bpi?.USD?.rate_float ?? null;
      this.price = price;
      this.shadowRoot.getElementById("price").textContent = price ? `BTC $${price.toFixed(2)}` : "N/A";
      this.shadowRoot.getElementById("ts").textContent = new Date().toLocaleTimeString();
    } catch (e) {
      this.shadowRoot.getElementById("price").textContent = "Price unavailable";
    }
  }

  refresh(){ this.pollOnce(); }
  copyText(){ return this.price ? `BTC $${this.price.toFixed(2)}` : "BTC price unavailable"; }

  disconnectedCallback(){ this.stop(); this._io?.disconnect(); }
}
customElements.define("crypto-widget", CryptoWidget);
