// src/pages/SearchResult.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function SearchResult() {
  const dispatch = useDispatch();

  const { list: products, loading, error } = useSelector(
    (state) => state.products
  );
  const searchQuery = useSelector((state) => state.search.query);

  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchProducts());
    }
  }, [products.length, loading, dispatch]);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !q || p.title.toLowerCase().startsWith(q);

    const matchesCategory =
      !filter.category || p.category === filter.category;

    const matchesMin =
      !filter.minPrice || p.price >= Number(filter.minPrice);

    const matchesMax =
      !filter.maxPrice || p.price <= Number(filter.maxPrice);

    const ratingValue =
      typeof p.rating === "number" ? p.rating : p.rating?.rate ?? 0;

    const matchesRating =
      !filter.rating || ratingValue >= Number(filter.rating);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMin &&
      matchesMax &&
      matchesRating
    );
  });

  return (
    <div className="container-max py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
      {/* LEFT FILTERS (collapsible inside Filters component) */}
      <aside className="md:sticky md:top-24 h-fit">
        <Filters categories={categories} onChange={setFilter} />
      </aside>

      {/* RIGHT RESULTS */}
      <main>
        <h2 className="text-xl font-semibold mb-4">
          Results{searchQuery && ` for “${searchQuery}”`}
        </h2>

        {loading && <p className="text-gray-500">Loading…</p>}
        {error && (
          <p className="text-red-500 mt-4">
            Failed to load products.
          </p>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="text-gray-500 mt-10">
            No matching products found.
          </p>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
