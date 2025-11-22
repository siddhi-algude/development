// export default function RatingStars({ value = 0 }) {
//   const v = Math.round(value);
//   return (
//     <div className="text-amber-500" aria-label={`Rating ${v} of 5`}>
//       {"★★★★★".slice(0, v)}
//       <span className="text-gray-300">{"★★★★★".slice(v)}</span>
//     </div>
//   );
// }
// src/components/RatingStars.jsx
export default function RatingStars({ value = 0, count }) {
  const rounded = Math.round(value * 2) / 2; // allow half-stars later if you want
  return (
    <div className="inline-flex items-center gap-1 text-xs">
      <span className="bg-green-600 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
        <span className="font-semibold text-xs">{rounded.toFixed(1)}</span>
        <span>★</span>
      </span>
      {typeof count === "number" && (
        <span className="text-gray-500 text-[10px]">({count})</span>
      )}
    </div>
  );
}
