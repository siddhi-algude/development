import { WidgetBase } from "./widget-base.js";

export class WeatherWidget extends WidgetBase {
  constructor(){ super(); this.attachShadow({ mode:"open" }); }
  // async init(config){ 
  //   super.init(config);
  //   this.shadowRoot.innerHTML = `<div id="box">Loading weather…</div>`;
  //   this.refresh();
  // }
  async init(config, store, save){
  super.init(config, store);
  this._save = save;
  this.config = config || {};
  this.shadowRoot.innerHTML = `<div id="box">Loading weather…</div>`;
  // If we already have a snapshot, render it. Else fetch and snapshot.
  if (this.config.snapshot) this.renderSnapshot();
  else this.refresh(); // will fetch and then snapshot
}

renderSnapshot(){
  const box = this.shadowRoot.getElementById("box");
  const s = this.config?.snapshot;
  if (!box) return;
  if (s) {
    const when = new Date(s.capturedAt).toLocaleString();
    box.textContent = `🌡 ${s.temperature}°C • 💨 ${s.windspeed} km/h • 📅 ${when}`;
  } else {
    box.textContent = "No snapshot";
  }
}

async refresh(){
  // fetch ONLY to create/update snapshot; this keeps each widget independent
  const box = this.shadowRoot.getElementById("box");
  try {
    const geo = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 7000 }));
    const { latitude, longitude } = geo.coords;

    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 7000);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const json = await fetch(url, { signal: ac.signal }).then(r => r.json());
    clearTimeout(t);

    const w = json.current_weather;
    const snap = {
      temperature: w?.temperature ?? null,
      windspeed: w?.windspeed ?? null,
      capturedAt: Date.now()
    };
    const next = { ...(this.config||{}), snapshot: snap };
    this.config = next;
    this._save?.(next);  // persist snapshot to IDB
    this.renderSnapshot();
  } catch (e) {
    if (box) box.textContent = "Weather unavailable";
  }
}

  // async refresh(){
  //   const box = this.shadowRoot.getElementById("box");
  //   try {
  //     const geo = await new Promise((res, rej) =>
  //       navigator.geolocation.getCurrentPosition(res, rej, { timeout: 7000 }));
  //     const { latitude, longitude } = geo.coords;
  //     const ac = new AbortController();
  //     const t = setTimeout(() => ac.abort(), 7000);
  //     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  //     const json = await fetch(url, { signal: ac.signal }).then(r => r.json());
  //     clearTimeout(t);
  //     const w = json.current_weather;
  //     box.textContent = `🌡 ${w.temperature}°C • 💨 ${w.windspeed} km/h`;
  //   } catch (e) {
  //     box.textContent = "Weather unavailable";
  //   }
  // }
}
customElements.define("weather-widget", WeatherWidget);
