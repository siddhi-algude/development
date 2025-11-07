import { WidgetBase } from "./widget-base.js";

export class NotesWidget extends WidgetBase {
  constructor(){ super(); this.attachShadow({ mode:"open" }); }
  // connectedCallback(){
  //   this.shadowRoot.innerHTML = `
  //     <style>
  //       textarea{ width:100%; min-height:120px; background:#0f1422; color:#e6edf3;
  //         border:1px solid #2b3242; border-radius:8px; padding:8px; resize:vertical }
  //     </style>
  //     <textarea id="ta" placeholder="Type notes..."></textarea>`;
  //   const ta = this.shadowRoot.getElementById("ta");
  //   ta.value = (this.config?.text)||"";
  //   ta.addEventListener("input", () => this.config.text = ta.value);
  // }
  // inside class NotesWidget extends WidgetBase
connectedCallback(){
  this.shadowRoot.innerHTML = `
    <style>
      textarea{ width:100%; min-height:120px; background:#0f1422; color:#e6edf3;
        border:1px solid #2b3242; border-radius:8px; padding:8px; resize:vertical }
    </style>
    <textarea id="ta" placeholder="Type notes..."></textarea>`;

  const ta = this.shadowRoot.getElementById("ta");
  ta.value = (this.config?.text) || "";
  // Save on every input
  ta.addEventListener("input", () => {
    const next = { ...(this.config||{}), text: ta.value, updatedAt: Date.now() };
    this.config = next;
    // If a save function was provided via init, call it
    this._save?.(next);
  });
}

// override init to capture save function
init(config, store, save){
  super.init(config, store);
  this._save = save;              // <-- keep reference
  this.config = config || {};
}

  copyText(){ return this.config?.text || ""; } 
}
customElements.define("notes-widget", NotesWidget);
