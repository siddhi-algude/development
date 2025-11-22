// // // src/pages/SearchResults.jsx
// // import { useEffect, useState } from "react";
// // import { getProducts } from "../services/api";
// // import ProductCard from "../components/ProductCard";
// // import Filters from "../components/Filters";
// // import { useSearch } from "../context/SearchContext";

// // export default function SearchResults() {
// //   const { searchQuery } = useSearch();
// //   const [products, setProducts] = useState([]);
// //   const [filter, setFilter] = useState({
// //     category: "",
// //     minPrice: "",
// //     maxPrice: "",
// //     rating: "",
// //   });

// //   useEffect(() => {
// //     getProducts().then(setProducts);
// //   }, []);

// //   const categories = [...new Set(products.map((p) => p.category))];

// //   const filtered = products.filter((p) => {
// //     const q = searchQuery.trim().toLowerCase();

// //     // A: starts-with search on title, case-insensitive
// //     const matchesSearch =
// //       q === "" || p.title.toLowerCase().startsWith(q);

// //     // Filters
// //     const matchesCategory =
// //       !filter.category || p.category === filter.category;

// //     const matchesPrice =
// //       (!filter.minPrice || p.price >= Number(filter.minPrice)) &&
// //       (!filter.maxPrice || p.price <= Number(filter.maxPrice));

// //     const ratingValue =
// //       typeof p.rating === "number" ? p.rating : p.rating?.rate ?? 0;

// //     const matchesRating =
// //       !filter.rating || ratingValue >= Number(filter.rating);

// //     return (
// //       matchesSearch && matchesCategory && matchesPrice && matchesRating
// //     );
// //   });

// //   return (
// //     <div className="container-max py-8">
// //       <h1 className="text-2xl font-bold mb-4">
// //         Search results{searchQuery ? ` for “${searchQuery}”` : ""}
// //       </h1>

// //       <Filters categories={categories} onChange={setFilter} />

// //       {filtered.length === 0 ? (
// //         <p className="text-gray-500 mt-4">
// //           No products match your search.
// //         </p>
// //       ) : (
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
// //           {filtered.map((p) => (
// //             <ProductCard key={p.id} product={p} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { getProducts } from "../services/api";
// import ProductCard from "../components/ProductCard";
// import Filters from "../components/Filters";
// import { useSearch } from "../context/SearchContext";

// export default function SearchResults() {
//   const { searchQuery } = useSearch();
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     category: "",
//     minPrice: "",
//     maxPrice: "",
//     rating: "",
//   });

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []);

//   const categories = [...new Set(products.map((p) => p.category))];

//   const filteredProducts = products.filter((p) => {
//     const q = searchQuery.toLowerCase().trim();

//     const matchesSearch =
//       !q || p.title.toLowerCase().startsWith(q);

//     const matchesCategory =
//       !filters.category || p.category === filters.category;

//     const matchesMin =
//       !filters.minPrice || p.price >= Number(filters.minPrice);

//     const matchesMax =
//       !filters.maxPrice || p.price <= Number(filters.maxPrice);

//     const ratingValue =
//       typeof p.rating === "number"
//         ? p.rating
//         : p.rating?.rate ?? 0;

//     const matchesRating =
//       !filters.rating || ratingValue >= Number(filters.rating);

//     return (
//       matchesSearch &&
//       matchesCategory &&
//       matchesMin &&
//       matchesMax &&
//       matchesRating
//     );
//   });

//   return (
//     <div className="container-max py-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">

//       {/* LEFT SIDEBAR FILTERS */}
//       <aside className="sticky top-20 h-fit">
//         <Filters categories={categories} onChange={setFilters} />
//       </aside>

//       {/* RIGHT PRODUCT GRID */}
//       <main>
//         <h2 className="text-xl font-semibold mb-4">
//           Results {searchQuery && `for “${searchQuery}”`}
//         </h2>

//         {filteredProducts.length === 0 ? (
//           <p className="text-gray-500 mt-10">No matching products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((p) => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useSearch } from "../context/SearchContext";

export default function SearchResults() {
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch = !q || p.title.toLowerCase().startsWith(q);
    const matchesCategory = !filters.category || p.category === filters.category;
    const matchesMin = !filters.minPrice || p.price >= Number(filters.minPrice);
    const matchesMax = !filters.maxPrice || p.price <= Number(filters.maxPrice);

    const ratingValue =
      typeof p.rating === "number" ? p.rating : p.rating?.rate ?? 0;

    const matchesRating =
      !filters.rating || ratingValue >= Number(filters.rating);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMin &&
      matchesMax &&
      matchesRating
    );
  });

  return (
    <div className="container-max py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">

      {/* LEFT FILTER DROPDOWN */}
      <div>
        <Filters categories={categories} onChange={setFilters} />
      </div>

      {/* RIGHT PRODUCT RESULTS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Results {searchQuery && `for “${searchQuery}”`}
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 mt-10">No matching products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
