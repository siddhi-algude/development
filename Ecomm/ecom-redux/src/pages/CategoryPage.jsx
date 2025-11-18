// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getProducts } from "../services/api";
// import ProductCard from "../components/ProductCard";

// export default function CategoryPage() {
//   const { name } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const all = await getProducts();
//       const filtered = all.filter(
//         (p) => p.category.toLowerCase() === name.toLowerCase()
//       );
//       setProducts(filtered);
//     }
//     load();
//   }, [name]);

//   return (
//     <div className="container-max py-10">
//       <h2 className="text-2xl font-bold mb-6">
//         {decodeURIComponent(name)}
//       </h2>

//       {products.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { useSearch } from "../context/SearchContext";

export default function CategoryPage() {
  const { name } = useParams();
  const { searchQuery } = useSearch();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    getProducts().then((all) => {
      const filtered = all.filter(
        (p) => p.category.toLowerCase() === name.toLowerCase()
      );
      setProducts(filtered);
    });
  }, [name]);

  const filtered = products.filter((p) => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      q === "" || p.title.toLowerCase().startsWith(q);

    const matchesPrice =
      (!filter.minPrice || p.price >= Number(filter.minPrice)) &&
      (!filter.maxPrice || p.price <= Number(filter.maxPrice));

    const matchesRating =
      !filter.rating || p.rating >= Number(filter.rating);

    return matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="container-max py-10">
      <h2 className="text-2xl font-bold mb-3">{name}</h2>

      <Filters
        categories={[name]} // only current category
        onChange={setFilter}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
