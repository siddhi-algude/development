// // // // import { useState } from "react";

// // // // export default function Filters({ categories, onChange }) {
// // // //   const [filter, setFilter] = useState({
// // // //     category: "",
// // // //     minPrice: "",
// // // //     maxPrice: "",
// // // //     rating: "",
// // // //   });

// // // //   function update(key, value) {
// // // //     const newFilter = { ...filter, [key]: value };
// // // //     setFilter(newFilter);
// // // //     onChange(newFilter);
// // // //   }

// // // //   return (
// // // //     <div className="bg-white shadow-sm rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">

// // // //       {/* Category */}
// // // //       <select
// // // //         className="border rounded-lg px-3 py-2 text-sm"
// // // //         value={filter.category}
// // // //         onChange={(e) => update("category", e.target.value)}
// // // //       >
// // // //         <option value="">All Categories</option>
// // // //         {categories.map((cat) => (
// // // //           <option key={cat} value={cat}>
// // // //             {cat}
// // // //           </option>
// // // //         ))}
// // // //       </select>

// // // //       {/* Min Price */}
// // // //       <input
// // // //         type="number"
// // // //         placeholder="Min Price"
// // // //         className="border rounded-lg px-3 py-2 text-sm w-28"
// // // //         value={filter.minPrice}
// // // //         onChange={(e) => update("minPrice", e.target.value)}
// // // //       />

// // // //       {/* Max Price */}
// // // //       <input
// // // //         type="number"
// // // //         placeholder="Max Price"
// // // //         className="border rounded-lg px-3 py-2 text-sm w-28"
// // // //         value={filter.maxPrice}
// // // //         onChange={(e) => update("maxPrice", e.target.value)}
// // // //       />

// // // //       {/* Rating */}
// // // //       <select
// // // //         className="border rounded-lg px-3 py-2 text-sm"
// // // //         value={filter.rating}
// // // //         onChange={(e) => update("rating", e.target.value)}
// // // //       >
// // // //         <option value="">All Ratings</option>
// // // //         <option value="4">4★ & Up</option>
// // // //         <option value="3">3★ & Up</option>
// // // //         <option value="2">2★ & Up</option>
// // // //       </select>

// // // //       {/* Reset */}
// // // //       <button
// // // //         className="ml-auto text-sm text-fuchsia-600"
// // // //         onClick={() => {
// // // //           const empty = {
// // // //             category: "",
// // // //             minPrice: "",
// // // //             maxPrice: "",
// // // //             rating: "",
// // // //           };
// // // //           setFilter(empty);
// // // //           onChange(empty);
// // // //         }}
// // // //       >
// // // //         Reset Filters
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }
// // // // src/components/Filters.jsx
// // // import { useState } from "react";

// // // export default function Filters({ categories, onChange }) {
// // //   const [filter, setFilter] = useState({
// // //     category: "",
// // //     minPrice: "",
// // //     maxPrice: "",
// // //     rating: "",
// // //   });

// // //   function update(key, value) {
// // //     const newFilter = { ...filter, [key]: value };
// // //     setFilter(newFilter);
// // //     onChange(newFilter);
// // //   }

// // //   return (
// // //     <div className="bg-white shadow-sm rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
// // //       {/* Category */}
// // //       <select
// // //         className="border rounded-lg px-3 py-2 text-sm"
// // //         value={filter.category}
// // //         onChange={(e) => update("category", e.target.value)}
// // //       >
// // //         <option value="">All Categories</option>
// // //         {categories.map((cat) => (
// // //           <option key={cat} value={cat}>
// // //             {cat}
// // //           </option>
// // //         ))}
// // //       </select>

// // //       {/* Min Price */}
// // //       <input
// // //         type="number"
// // //         placeholder="Min Price"
// // //         className="border rounded-lg px-3 py-2 text-sm w-28"
// // //         value={filter.minPrice}
// // //         onChange={(e) => update("minPrice", e.target.value)}
// // //       />

// // //       {/* Max Price */}
// // //       <input
// // //         type="number"
// // //         placeholder="Max Price"
// // //         className="border rounded-lg px-3 py-2 text-sm w-28"
// // //         value={filter.maxPrice}
// // //         onChange={(e) => update("maxPrice", e.target.value)}
// // //       />

// // //       {/* Rating */}
// // //       <select
// // //         className="border rounded-lg px-3 py-2 text-sm"
// // //         value={filter.rating}
// // //         onChange={(e) => update("rating", e.target.value)}
// // //       >
// // //         <option value="">All Ratings</option>
// // //         <option value="4">4★ & Up</option>
// // //         <option value="3">3★ & Up</option>
// // //         <option value="2">2★ & Up</option>
// // //       </select>

// // //       {/* Reset */}
// // //       <button
// // //         className="ml-auto text-sm text-fuchsia-600"
// // //         onClick={() => {
// // //           const empty = {
// // //             category: "",
// // //             minPrice: "",
// // //             maxPrice: "",
// // //             rating: "",
// // //           };
// // //           setFilter(empty);
// // //           onChange(empty);
// // //         }}
// // //       >
// // //         Reset Filters
// // //       </button>
// // //     </div>
// // //   );
// // // }
// // import { useState } from "react";

// // export default function Filters({ categories, onChange }) {
// //   const [open, setOpen] = useState(false);

// //   const handleInput = (key, value) => {
// //     onChange((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const resetFilters = () => {
// //     onChange({
// //       category: "",
// //       minPrice: "",
// //       maxPrice: "",
// //       rating: "",
// //     });
// //   };

// //   return (
// //     <div className="w-full">

// //       {/* FILTER BUTTON */}
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="w-full text-left px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200"
// //       >
// //         Filters {open ? "▴" : "▾"}
// //       </button>

// //       {/* DROPDOWN PANEL */}
// //       {open && (
// //         <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">

// //           {/* CATEGORY */}
// //           <div>
// //             <label className="block text-sm font-semibold mb-1">Category</label>
// //             <select
// //               className="w-full border rounded-lg px-3 py-2"
// //               onChange={(e) => handleInput("category", e.target.value)}
// //             >
// //               <option value="">All Categories</option>
// //               {categories.map((c) => (
// //                 <option key={c} value={c}>{c}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* MIN PRICE */}
// //           <div>
// //             <label className="block text-sm font-semibold mb-1">Min Price</label>
// //             <input
// //               type="number"
// //               className="w-full border rounded-lg px-3 py-2"
// //               onChange={(e) => handleInput("minPrice", e.target.value)}
// //             />
// //           </div>

// //           {/* MAX PRICE */}
// //           <div>
// //             <label className="block text-sm font-semibold mb-1">Max Price</label>
// //             <input
// //               type="number"
// //               className="w-full border rounded-lg px-3 py-2"
// //               onChange={(e) => handleInput("maxPrice", e.target.value)}
// //             />
// //           </div>

// //           {/* RATING */}
// //           <div>
// //             <label className="block text-sm font-semibold mb-1">Min Rating</label>
// //             <select
// //               className="w-full border rounded-lg px-3 py-2"
// //               onChange={(e) => handleInput("rating", e.target.value)}
// //             >
// //               <option value="">All Ratings</option>
// //               <option value="4">4★ & up</option>
// //               <option value="3">3★ & up</option>
// //               <option value="2">2★ & up</option>
// //             </select>
// //           </div>

// //           {/* RESET BUTTON */}
// //           <button
// //             onClick={resetFilters}
// //             className="text-fuchsia-600 text-sm underline"
// //           >
// //             Reset Filters
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// import { useState } from "react";

// export default function Filters({ categories, onChange }) {
//   const [filter, setFilter] = useState({
//     category: "",
//     minPrice: "",
//     maxPrice: "",
//     rating: "",
//   });

//   function update(key, value) {
//     const newFilter = { ...filter, [key]: value };
//     setFilter(newFilter);
//     onChange(newFilter);
//   }

//   const reset = () => {
//     const empty = {
//       category: "",
//       minPrice: "",
//       maxPrice: "",
//       rating: "",
//     };
//     setFilter(empty);
//     onChange(empty);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Category */}
//       <div>
//         <label className="block text-sm font-semibold mb-1">Category</label>
//         <select
//           className="w-full border rounded-lg px-3 py-2 text-sm"
//           value={filter.category}
//           onChange={(e) => update("category", e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Min price */}
//       <div>
//         <label className="block text-sm font-semibold mb-1">Min Price</label>
//         <input
//           type="number"
//           placeholder="e.g. 20"
//           className="w-full border rounded-lg px-3 py-2 text-sm"
//           value={filter.minPrice}
//           onChange={(e) => update("minPrice", e.target.value)}
//         />
//       </div>

//       {/* Max price */}
//       <div>
//         <label className="block text-sm font-semibold mb-1">Max Price</label>
//         <input
//           type="number"
//           placeholder="e.g. 200"
//           className="w-full border rounded-lg px-3 py-2 text-sm"
//           value={filter.maxPrice}
//           onChange={(e) => update("maxPrice", e.target.value)}
//         />
//       </div>

//       {/* Rating */}
//       <div>
//         <label className="block text-sm font-semibold mb-1">Min Rating</label>
//         <select
//           className="w-full border rounded-lg px-3 py-2 text-sm"
//           value={filter.rating}
//           onChange={(e) => update("rating", e.target.value)}
//         >
//           <option value="">All Ratings</option>
//           <option value="4">4★ & Up</option>
//           <option value="3">3★ & Up</option>
//           <option value="2">2★ & Up</option>
//         </select>
//       </div>

//       <button
//         type="button"
//         onClick={reset}
//         className="text-sm text-fuchsia-600 font-medium"
//       >
//         Reset filters
//       </button>
//     </div>
//   );
// }
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Filters({ categories, onChange }) {
  const { t } = useTranslation();

  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  function update(key, value) {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
    onChange(newFilter);
  }

  const reset = () => {
    const empty = {
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
    };
    setFilter(empty);
    onChange(empty);
  };

  return (
    <div className="space-y-4">

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          {t("filters.category")}
        </label>

        <select
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={filter.category}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">{t("filters.all_categories")}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Min price */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          {t("filters.min_price")}
        </label>

        <input
          type="number"
          placeholder={t("filters.min_price_placeholder")}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={filter.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
        />
      </div>

      {/* Max price */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          {t("filters.max_price")}
        </label>

        <input
          type="number"
          placeholder={t("filters.max_price_placeholder")}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={filter.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          {t("filters.min_rating")}
        </label>

        <select
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={filter.rating}
          onChange={(e) => update("rating", e.target.value)}
        >
          <option value="">{t("filters.all_ratings")}</option>
          <option value="4">{t("filters.rating_4_up")}</option>
          <option value="3">{t("filters.rating_3_up")}</option>
          <option value="2">{t("filters.rating_2_up")}</option>
        </select>
      </div>

      <button
        type="button"
        onClick={reset}
        className="text-sm text-fuchsia-600 font-medium"
      >
        {t("filters.reset")}
      </button>
    </div>
  );
}
