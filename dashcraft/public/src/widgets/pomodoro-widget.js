import { WidgetBase } from "./widget-base.js";

export class PomodoroWidget extends WidgetBase {
  constructor(){ super(); this.attachShadow({ mode:"open" }); this.seconds = 25*60; this.timer = null; }
  connectedCallback(){
    this.shadowRoot.innerHTML = `
      <style> .row{display:flex;gap:8px;align-items:center}
      button{background:#1f2430;color:#e6edf3;border:1px solid #2b3242;border-radius:8px;padding:6px 10px;cursor:pointer}
      .time{font-size:24px;font-weight:700} </style>
      <div class="row"><span class="time" id="t">25:00</span>
        <button id="start">Start</button><button id="pause">Pause</button><button id="reset">Reset</button>
      </div>`;
    this.shadowRoot.getElementById("start").onclick = () => this.start();
    this.shadowRoot.getElementById("pause").onclick = () => this.pause();
    this.shadowRoot.getElementById("reset").onclick = () => this.reset();
  }
  tick(){ if (this.seconds>0){ this.seconds--; this.draw(); } else { this.pause(); this.notify(); } }
  draw(){ const m = String(Math.floor(this.seconds/60)).padStart(2,"0"); const s = String(this.seconds%60).padStart(2,"0"); this.shadowRoot.getElementById("t").textContent = `${m}:${s}`; }
  start(){ if (this.timer) return; this.timer = setInterval(()=>this.tick(),1000); }
  pause(){ clearInterval(this.timer); this.timer = null; }
  reset(){ this.pause(); this.seconds = 25*60; this.draw(); }
  notify(){
    if (Notification.permission === "default") Notification.requestPermission();
    if (Notification.permission === "granted") new Notification("Pomodoro finished!");
    else alert("Pomodoro finished!");
  }
  copyText(){ return `Remaining: ${this.shadowRoot.getElementById("t").textContent}`; }
}
customElements.define("pomodoro-widget", PomodoroWidget);
