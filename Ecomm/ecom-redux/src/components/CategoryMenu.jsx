import { useEffect, useState } from "react";
import { getCategories } from "../services/api";

export default function CategoryMenu({ value, onChange }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const c = await getCategories();
        setCats(c);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-600">Category</label>
      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value || null)}
        className="input w-56"
      >
        <option value="">All</option>
        {!loading && cats.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
