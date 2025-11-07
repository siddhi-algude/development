self.onmessage = async (e) => {
  const { cmd, url } = e.data || {};
  if (cmd !== "fetch" || !url) return;
  try {
    post({ type: "progress", payload: "Fetching feed…" });
    const ac = new AbortController();
    const to = setTimeout(()=>ac.abort(), 10000);
    const res = await fetch(url, { signal: ac.signal });
    clearTimeout(to);
    const text = await res.text();

    const doc = new DOMParser().parseFromString(text, "application/xml");

    // Try RSS first
    let items = [...doc.querySelectorAll("item")].map(item => ({
      title: txt(item, "title"),
      link: txt(item, "link"),
      pubDate: txt(item, "pubDate") || txt(item, "updated")
    }));

    // If no <item>, try Atom
    if (items.length === 0) {
      items = [...doc.querySelectorAll("entry")].map(e => ({
        title: e.querySelector("title")?.textContent?.trim() || "",
        link: e.querySelector("link")?.getAttribute("href") || "",
        pubDate: e.querySelector("updated")?.textContent?.trim() || e.querySelector("published")?.textContent?.trim() || ""
      }));
    }

    post({ type: "ok", payload: { items } });
  } catch (err) {
    post({ type: "error", error: (err && err.message) || "Network/parse error" });
  }
};

function txt(parent, sel){
  return parent.querySelector(sel)?.textContent?.trim() || "";
}
function post(msg){ self.postMessage(msg); }
