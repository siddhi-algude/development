// // import { useEffect, useState } from "react";
// // import { getProducts } from "../services/api";
// // import ProductCard from "../components/ProductCard";
// // import Filters from "../components/Filters";
// // import { useSearch } from "../context/SearchContext";

// // export default function Home() {
// //   const [products, setProducts] = useState([]);
// //   const { searchQuery } = useSearch();
// //   const [filter, setFilter] = useState({});
  
// //   useEffect(() => {
// //     getProducts().then(setProducts);
// //   }, []);

// //   const categories = [...new Set(products.map((p) => p.category))];

// //   const filtered = products.filter((p) => {
// //     const query = searchQuery.trim().toLowerCase();

// //     // Search
// //     const matchesSearch =
// //       query === "" || p.title.toLowerCase().startsWith(query);

// //     // Category
// //     const matchesCategory =
// //       !filter.category || p.category === filter.category;

// //     // Price
// //     const matchesPrice =
// //       (!filter.minPrice || p.price >= Number(filter.minPrice)) &&
// //       (!filter.maxPrice || p.price <= Number(filter.maxPrice));

// //     // Rating
// //     const matchesRating =
// //       !filter.rating || p.rating >= Number(filter.rating);

// //     return (
// //       matchesSearch &&
// //       matchesCategory &&
// //       matchesPrice &&
// //       matchesRating
// //     );
// //   });

// //   return (
// //     <div className="container-max py-6">

// //       {/* Filters */}
// //       <Filters categories={categories} onChange={setFilter} />

// //       {/* Product Grid */}
// //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
// //         {filtered.map((p) => (
// //           <ProductCard key={p.id} product={p} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { getProducts } from "../services/api";
// import ProductCard from "../components/ProductCard";
// import Filters from "../components/Filters";
// import HorizontalCarousel from "../components/HorizontalCarousel";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     category: "",
//     minPrice: "",
//     maxPrice: "",
//     rating: "",
//   });

//   useEffect(() => {
//     getProducts().then(setProducts);
//   }, []);

//   // categories for dropdown
//   const categories = [...new Set(products.map((p) => p.category))];

//   // apply filters to products
//   const filteredProducts = products.filter((p) => {
//     const matchesCategory =
//       !filters.category || p.category === filters.category;

//     const matchesMin =
//       !filters.minPrice || p.price >= Number(filters.minPrice || 0);

//     const matchesMax =
//       !filters.maxPrice || p.price <= Number(filters.maxPrice || 0);

//     const ratingValue =
//       typeof p.rating === "number" ? p.rating : p.rating?.rate ?? 0;

//     const matchesRating =
//       !filters.rating || ratingValue >= Number(filters.rating);

//     return matchesCategory && matchesMin && matchesMax && matchesRating;
//   });

//   // simple "sections" from filtered list
//   const featured = filteredProducts.slice(0, 8);
//   const trending = filteredProducts.slice(2, 10);
//   const newArrivals = [...filteredProducts].reverse().slice(0, 8);

//   const renderCarousel = (items) => {
//     if (!items.length) return <p className="text-sm text-gray-500">No items to show.</p>;

//     return (
//       <HorizontalCarousel>
//         {items.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </HorizontalCarousel>
//     );
//   };

//   return (
//     <div className="container-max py-6">
//       {/* Filters toggle button */}
//       <div className="mb-4">
//         <button
//           type="button"
//           onClick={() => setFiltersOpen((open) => !open)}
//           className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200"
//         >
//           Filters {filtersOpen ? "▴" : "▾"}
//         </button>
//       </div>

//       {/* Layout: when filtersOpen -> sidebar + main; otherwise full-width main */}
//       <div
//         className={`grid gap-8 ${
//           filtersOpen ? "md:grid-cols-[260px_1fr]" : "md:grid-cols-1"
//         }`}
//       >
//         {/* LEFT SIDEBAR – only when open */}
//         {filtersOpen && (
//           <aside className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit md:h-auto">
//             <Filters categories={categories} onChange={setFilters} />
//           </aside>
//         )}

//         {/* RIGHT – main content with carousels */}
//         <main className="space-y-10">
//           {/* Featured */}
//           <section>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-xl font-semibold">Featured Products</h2>
//             </div>
//             {renderCarousel(featured)}
//           </section>

//           {/* Trending */}
//           <section>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-xl font-semibold">Trending Now</h2>
//             </div>
//             {renderCarousel(trending)}
//           </section>

//           {/* New Arrivals */}
//           <section>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-xl font-semibold">New Arrivals</h2>
//             </div>
//             {renderCarousel(newArrivals)}
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import HorizontalCarousel from "../components/HorizontalCarousel";

// ⭐ Helmet
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  // ⭐ Helmet FIRST — does not break render
  const seo = (
    <Helmet>
      <title>SwiftKart – Best Deals, Trending & New Arrivals</title>
      <meta
        name="description"
        content="Shop trending products, best deals, new arrivals, fashion, electronics, and more at SwiftKart."
      />
      <link rel="canonical" href="http://localhost:5173/" />
    </Helmet>
  );

  // Load products
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data || []);
    });
  }, []);

  // Categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      !filters.category || p.category === filters.category;

    const matchesMin =
      !filters.minPrice || p.price >= Number(filters.minPrice || 0);

    const matchesMax =
      !filters.maxPrice || p.price <= Number(filters.maxPrice || 0);

    const ratingValue =
      typeof p.rating === "number" ? p.rating : p.rating?.rate ?? 0;

    const matchesRating =
      !filters.rating || ratingValue >= Number(filters.rating);

    return (
      matchesCategory && matchesMin && matchesMax && matchesRating
    );
  });

  // Sections
  const featured = filteredProducts.slice(0, 8);
  const trending = filteredProducts.slice(2, 10);
  const newArrivals = [...filteredProducts].reverse().slice(0, 8);

  // Carousel renderer
  const renderCarousel = (items) => {
    if (!items.length)
      return (
        <p className="text-sm text-gray-500">No items to show.</p>
      );

    return (
      <HorizontalCarousel>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </HorizontalCarousel>
    );
  };

  return (
    <>
      {seo}

      <div className="container-max py-6">
        {/* Filters Toggle */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Filters {filtersOpen ? "▴" : "▾"}
          </button>
        </div>

        {/* Layout */}
        <div
          className={`grid gap-8 ${
            filtersOpen ? "md:grid-cols-[260px_1fr]" : "md:grid-cols-1"
          }`}
        >
          {/* Sidebar */}
          {filtersOpen && (
            <aside className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit md:h-auto">
              <Filters
                categories={categories}
                onChange={setFilters}
              />
            </aside>
          )}

          {/* Main Content */}
          <main className="space-y-10">
            {/* Featured */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">
                  Featured Products
                </h2>
              </div>
              {renderCarousel(featured)}
            </section>

            {/* Trending */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Trending Now</h2>
              </div>
              {renderCarousel(trending)}
            </section>

            {/* New Arrivals */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">New Arrivals</h2>
              </div>
              {renderCarousel(newArrivals)}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

 