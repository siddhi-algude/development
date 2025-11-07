// export class WidgetBase extends HTMLElement {
//   connectedCallback(){ /* hook for lifecycle */ }
//   init(config, store){ this.config = config; this.store = store; }
//   refresh(){ /* override */ }
//   copyText(){ return ""; }
// }


export class WidgetBase extends HTMLElement {
  connectedCallback(){ }
  init(config, store, save){
    this.config = config;
    this.store = store;
    this._save = save; // may be undefined; widgets check before calling
  }
  refresh(){ }
  copyText(){ return ""; }
}
