// // // // // import { useEffect, useState } from "react";
// // // // // import withErrorBoundary from "../hoc/withErrorBoundary";
// // // // // import withPageTitle from "../hoc/withPageTitle";
// // // // // import { getProducts, getProductsByCategory } from "../services/api";
// // // // // import ProductCard from "../components/ProductCard";
// // // // // import SkeletonCard from "../components/SkeletonCard";
// // // // // import HorizontalCarousel from "../components/HorizontalCarousel";
// // // // // import Section from "../components/Section";
// // // // // import CategoryMenu from "../components/CategoryMenu";

// // // // // function HomePage() {
// // // // //   const [selectedCat, setSelectedCat] = useState(null);

// // // // //   const [all, setAll] = useState(null);
// // // // //   const [allLoading, setAllLoading] = useState(true);
// // // // //   const [allError, setAllError] = useState(null);

// // // // //   const [catItems, setCatItems] = useState([]);
// // // // //   const [catLoading, setCatLoading] = useState(false);
// // // // //   const [catError, setCatError] = useState(null);

// // // // //   // Load all products
// // // // //   useEffect(() => {
// // // // //     let mounted = true;
// // // // //     (async () => {
// // // // //       try {
// // // // //         setAllLoading(true);
// // // // //         const data = await getProducts();
// // // // //         if (mounted) setAll(data);
// // // // //       } catch (e) {
// // // // //         if (mounted) setAllError(e);
// // // // //       } finally {
// // // // //         if (mounted) setAllLoading(false);
// // // // //       }
// // // // //     })();
// // // // //     return () => {
// // // // //       mounted = false;
// // // // //     };
// // // // //   }, []);

// // // // //   // Load selected category items
// // // // //   useEffect(() => {
// // // // //     if (!selectedCat) return;
// // // // //     let mounted = true;
// // // // //     (async () => {
// // // // //       try {
// // // // //         setCatLoading(true);
// // // // //         const data = await getProductsByCategory(selectedCat);
// // // // //         if (mounted) setCatItems(data);
// // // // //       } catch (e) {
// // // // //         if (mounted) setCatError(e);
// // // // //       } finally {
// // // // //         if (mounted) setCatLoading(false);
// // // // //       }
// // // // //     })();
// // // // //     return () => {
// // // // //       mounted = false;
// // // // //     };
// // // // //   }, [selectedCat]);

// // // // //   // Use first few items as "Top Deals"
// // // // //   const topDeals = Array.isArray(all) ? all.slice(0, 8) : [];

// // // // //   return (
// // // // //     <div className="space-y-8">
// // // // //       {/* Hero banner like Flipkart */}
// // // // //       <section className="card overflow-hidden">
// // // // //         <div className="flex flex-col md:flex-row">
// // // // //           <div className="flex-1 p-6 md:p-10 flex flex-col justify-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
// // // // //             <p className="uppercase text-xs tracking-[0.2em]">SwiftKart Travel</p>
// // // // //             <h2 className="text-2xl md:text-3xl font-bold leading-snug">
// // // // //               Flight bookings up to <span className="text-yellow-300">35% Off</span>
// // // // //             </h2>
// // // // //             <p className="text-sm text-blue-100 max-w-md">
// // // // //               Grab exclusive offers on flights, hotels and more with SwiftKart Travel.
// // // // //             </p>
// // // // //             <button className="btn-primary rounded-full text-sm w-max">
// // // // //               Book Now
// // // // //             </button>
// // // // //           </div>
// // // // //           <div className="flex-1 bg-cover bg-center min-h-[180px] md:min-h-[220px]"
// // // // //                style={{ backgroundImage: "url('https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1200')" }}>
// // // // //           </div>
// // // // //         </div>
// // // // //       </section>

// // // // //       {/* Category + filter row */}
// // // // //       <div className="flex items-center justify-between">
// // // // //         <h1 className="text-xl md:text-2xl font-semibold">Products</h1>
// // // // //         <CategoryMenu value={selectedCat} onChange={setSelectedCat} />
// // // // //       </div>

// // // // //       {/* Top Deals carousel */}
// // // // //       <Section title="Top Deals">
// // // // //         {allLoading || !Array.isArray(all) ? (
// // // // //           <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 overflow-x-auto">
// // // // //             {Array.from({ length: 6 }).map((_, i) => (
// // // // //               <SkeletonCard key={i} />
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : allError ? (
// // // // //           <p className="text-red-600">Failed to load deals: {allError.message}</p>
// // // // //         ) : (
// // // // //           <HorizontalCarousel>
// // // // //             {topDeals.map((p) => (
// // // // //               <div key={p.id} className="snap-start w-[240px]">
// // // // //                 <ProductCard product={p} />
// // // // //               </div>
// // // // //             ))}
// // // // //           </HorizontalCarousel>
// // // // //         )}
// // // // //       </Section>

// // // // //       {/* If a category chosen, show its carousel */}
// // // // //       {selectedCat && (
// // // // //         <Section title={`Best in ${selectedCat}`}>
// // // // //           {catLoading ? (
// // // // //             <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 overflow-x-auto">
// // // // //               {Array.from({ length: 6 }).map((_, i) => (
// // // // //                 <SkeletonCard key={i} />
// // // // //               ))}
// // // // //             </div>
// // // // //           ) : catError ? (
// // // // //             <p className="text-red-600">Failed to load: {catError.message}</p>
// // // // //           ) : (
// // // // //             <HorizontalCarousel>
// // // // //               {catItems.map((p) => (
// // // // //                 <div key={p.id} className="snap-start w-[240px]">
// // // // //                   <ProductCard product={p} />
// // // // //                 </div>
// // // // //               ))}
// // // // //             </HorizontalCarousel>
// // // // //           )}
// // // // //         </Section>
// // // // //       )}

// // // // //       {/* All products grid */}
// // // // //       <Section title="All Products">
// // // // //         {allLoading || !Array.isArray(all) ? (
// // // // //           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
// // // // //             {Array.from({ length: 8 }).map((_, i) => (
// // // // //               <SkeletonCard key={i} />
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : allError ? (
// // // // //           <p className="text-red-600">Failed to load products: {allError.message}</p>
// // // // //         ) : (
// // // // //           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
// // // // //             {all.map((p) => (
// // // // //               <ProductCard key={p.id} product={p} />
// // // // //             ))}
// // // // //           </div>
// // // // //         )}
// // // // //       </Section>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default withErrorBoundary(withPageTitle(HomePage, "SwiftKart · Home"));

// // // // // src/pages/Home.jsx

// // // // import { useEffect, useState } from "react";
// // // // import { getProducts } from "../services/api";

// // // // const Home = () => {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     loadProductData();
// // // //   }, []);

// // // //   const loadProductData = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const data = await getProducts();
// // // //       console.log("PRODUCTS RECEIVED:", data);
// // // //       setProducts(data);
// // // //     } catch (err) {
// // // //       console.error("Home.jsx → Failed to load products:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="home-container">

// // // //       {/* Loading skeletons */}
// // // //       {loading && (
// // // //         <div className="products-loading">
// // // //           {/* Keep your existing skeleton tiles */}
// // // //           <p>Loading products...</p>
// // // //         </div>
// // // //       )}

// // // //       {/* Show products when loaded */}
// // // //       {!loading && products.length > 0 && (
// // // //         <div className="products-grid">
// // // //           {products.map((item) => (
// // // //             <div key={item.id} className="product-card">
// // // //               {/* Your existing card structure */}
// // // //               <img src={item.image} alt={item.title} />
// // // //               <h3>{item.title}</h3>
// // // //               <p>${item.price}</p>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}

// // // //       {/* No products found */}
// // // //       {!loading && products.length === 0 && (
// // // //         <div className="no-products">
// // // //           <p>No products available</p>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;

// // //  import { useEffect, useState } from "react";
// // // import { getProducts } from "../services/api";

// // // import HorizontalCarousel from "../components/HorizontalCarousel";
// // // import CategoryMenu from "../components/CategoryMenu";
// // // import CategoryStrip from "../components/CategoryStrip";
// // // import Section from "../components/Section";
// // // import SkeletonCard from "../components/SkeletonCard";

// // // const Home = () => {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadProducts();
// // //   }, []);

// // //   const loadProducts = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await getProducts();
// // //       console.log("PRODUCTS:", data);   // DEBUG
// // //       setProducts(data);
// // //     } catch (err) {
// // //       console.error("Failed loading products:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>DEBUG: Home Page Rendering...</h2>

// // //       {/* SHOW IF COMPONENT CRASHES */}
// // //       <div style={{ marginBottom: "20px", padding: "10px", background: "#eee" }}>
// // //         <strong>Loading:</strong> {loading.toString()} <br />
// // //         <strong>Products count:</strong> {products.length} <br />
// // //       </div>

// // //       {/* TEST 1 → Does HorizontalCarousel work at all? */}
// // //       <h3>Test Carousel</h3>
// // //       {loading ? (
// // //         <SkeletonCard />
// // //       ) : (
// // //         <HorizontalCarousel items={products} />
// // //       )}

// // //       {/* TEST 2 → Is Section breaking? */}
// // //       <h3>Test Section Wrapper</h3>
// // //       <Section title="Testing Section">
// // //         <p>This is inside Section.</p>
// // //       </Section>

// // //       {/* TEST 3 → Does Category Menu break layout? */}
// // //       <h3>Test Category Components</h3>
// // //       <CategoryStrip />
// // //       <CategoryMenu />
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import { useEffect, useState } from "react";
// // import { getProducts } from "../services/api";

// // import HorizontalCarousel from "../components/HorizontalCarousel";
// // import CategoryMenu from "../components/CategoryMenu";
// // import CategoryStrip from "../components/CategoryStrip";
// // import Section from "../components/Section";
// // import SkeletonCard from "../components/SkeletonCard";
// // import ProductCard from "../components/ProductCard";

// // const Home = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadProducts();
// //   }, []);

// //   const loadProducts = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getProducts();
// //       setProducts(data);
// //     } catch (err) {
// //       console.error("Failed loading products:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="home-page">

// //       <CategoryStrip />
// //       <CategoryMenu />

// //       <Section title="Featured Products">
// //         {loading ? (
// //           <div className="flex gap-4">
// //             {[...Array(6)].map((_, i) => (
// //               <SkeletonCard key={i} />
// //             ))}
// //           </div>
// //         ) : (
// //           <HorizontalCarousel>
// //             {products.map((prod) => (
// //               <ProductCard key={prod.id} product={prod} />
// //             ))}
// //           </HorizontalCarousel>
// //         )}
// //       </Section>

// //       <Section title="Trending Now">
// //         {loading ? (
// //           <div className="flex gap-4">
// //             {[...Array(6)].map((_, i) => (
// //               <SkeletonCard key={i} />
// //             ))}
// //           </div>
// //         ) : (
// //           <HorizontalCarousel>
// //             {products.map((prod) => (
// //               <ProductCard key={prod.id} product={prod} />
// //             ))}
// //           </HorizontalCarousel>
// //         )}
// //       </Section>

// //       <Section title="New Arrivals">
// //         {loading ? (
// //           <div className="flex gap-4">
// //             {[...Array(6)].map((_, i) => (
// //               <SkeletonCard key={i} />
// //             ))}
// //           </div>
// //         ) : (
// //           <HorizontalCarousel>
// //             {products.map((prod) => (
// //               <ProductCard key={prod.id} product={prod} />
// //             ))}
// //           </HorizontalCarousel>
// //         )}
// //       </Section>

// //     </div>
// //   );
// // };

// // export default Home;


// import { useEffect, useState } from "react";
// import { getProducts } from "../services/api";

// import CategoryStrip from "../components/CategoryStrip";
// import CategoryMenu from "../components/CategoryMenu";
// import HorizontalCarousel from "../components/HorizontalCarousel";
// import ProductCard from "../components/ProductCard";
// import SkeletonCard from "../components/SkeletonCard";
// import Section from "../components/Section";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const data = await getProducts();
//       setProducts(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => loadProducts(), []);

//   return (
//     <div className="home-page">
//       <CategoryStrip />
//       <CategoryMenu />

//       {/* FEATURED PRODUCTS */}
//       <Section title="Featured Products" className="bg-gray-50 rounded-2xl p-4">
//         {loading ? (
//           <div className="flex gap-4">
//             {[...Array(6)].map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : (
//           <HorizontalCarousel>
//             {products.map((p) => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </HorizontalCarousel>
//         )}
//       </Section>

//       {/* TRENDING */}
//       <Section title="Trending Now" className="bg-gray-50 rounded-2xl p-4 mt-8">
//         <HorizontalCarousel>
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </HorizontalCarousel>
//       </Section>

//       {/* NEW ARRIVALS */}
//       <Section title="New Arrivals" className="bg-gray-50 rounded-2xl p-4 mt-8">
//         <HorizontalCarousel>
//           {products.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </HorizontalCarousel>
//       </Section>
//     </div>
//   );
// }
 

import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

import HeroSlider from "../components/HeroSlider";
import HorizontalCarousel from "../components/HorizontalCarousel";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProducts();
      setProducts(p);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="w-full bg-[#faf7ff] pb-16">

      {/* HERO BANNER */}
      <div className="w-full mt-4">
        <HeroSlider />
      </div>

      {/* PRODUCT SECTIONS */}
      <Section title="Featured Products">
        {loading ? (
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <HorizontalCarousel>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </HorizontalCarousel>
        )}
      </Section>

      <Section title="Trending Now">
        <HorizontalCarousel>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </HorizontalCarousel>
      </Section>

      <Section title="New Arrivals">
        <HorizontalCarousel>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </HorizontalCarousel>
      </Section>

    </div>
  );
}
