export default function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center border rounded-xl overflow-hidden">
      <button className="px-3 py-2" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Decrease">-</button>
      <input
        type="number"
        className="w-14 text-center focus:outline-none"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Math.min(max, Math.max(min, parseInt(e.target.value || 0))))}
      />
      <button className="px-3 py-2" onClick={() => onChange(Math.min(max, value + 1))} aria-label="Increase">+</button>
    </div>
  );
}
