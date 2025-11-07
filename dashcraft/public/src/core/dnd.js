export function attachDragDrop(container, onOrderChange){
  let dragId = null;
  container.addEventListener("dragstart", (e) => {
    const w = e.target.closest(".widget"); if (!w) return;
    dragId = w.dataset.id; e.dataTransfer.effectAllowed = "move";
  });
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const over = e.target.closest(".widget"); if (!over || over.dataset.id === dragId) return;
    const siblings = [...container.querySelectorAll(".widget")];
    const from = siblings.findIndex(x => x.dataset.id === dragId);
    const to = siblings.findIndex(x => x === over);
    if (from < 0 || to < 0) return;
    const ids = siblings.map(x => x.dataset.id);
    const [m] = ids.splice(from, 1);
    ids.splice(to, 0, m);
    // Visual move
    const frag = document.createDocumentFragment();
    ids.map(id => siblings.find(x => x.dataset.id === id)).forEach(n => frag.appendChild(n));
    container.appendChild(frag);
  });
  container.addEventListener("dragend", () => {
    const ids = [...container.querySelectorAll(".widget")].map(n => n.dataset.id);
    onOrderChange?.(ids);
    dragId = null;
  });
}
