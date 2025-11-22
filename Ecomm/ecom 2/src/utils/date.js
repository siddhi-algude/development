export function etaRange(daysMin = 2, daysMax = 5) {
  const today = new Date();
  const min = new Date(today); min.setDate(today.getDate() + daysMin);
  const max = new Date(today); max.setDate(today.getDate() + daysMax);
  const fmt = (d) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${fmt(min)} – ${fmt(max)}`;
}
