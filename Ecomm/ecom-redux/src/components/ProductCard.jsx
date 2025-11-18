 
// // import { useCart } from "../context/CartContext";
// // import { useWishlist } from "../context/WishlistContext";
// // import { Link } from "react-router-dom";

// // function ProductCard({ product }) {
// //   const { addItem } = useCart();
// //   const { toggleWishlist, isWishlisted } = useWishlist();

// //   const liked = isWishlisted(product.id);
// //   const hasStock =
// //     typeof product.stock === "number" ? product.stock > 0 : true;
// //   const stockCount =
// //     typeof product.stock === "number" ? product.stock : null;

// //   return (
// //     <div className="relative w-48 min-w-[13rem] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all">
// //       {/* Heart Icon */}
// //       <button
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           toggleWishlist(product);
// //         }}
// //         className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow
// //           ${liked ? "bg-fuchsia-500" : "bg-white border border-gray-300"}`}
// //       >
// //         <span
// //           className={`text-xs font-semibold ${
// //             liked ? "text-white" : "text-gray-400"
// //           }`}
// //         >
// //           ♥
// //         </span>
// //       </button>

// //       {/* CLICKABLE AREA (opens PDP) */}
// //       <Link
// //         to={`/product/${product.id}`}
// //         className="flex flex-col items-center flex-1"
// //       >
// //         {/* IMAGE */}
// //         <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
// //           <img
// //             src={product.image}
// //             alt={product.title}
// //             className="object-contain h-full"
// //           />
// //         </div>

// //         {/* TITLE */}
// //         <h3 className="text-sm font-semibold mt-3 text-center line-clamp-2 h-10">
// //           {product.title}
// //         </h3>
 
// //         {/* STOCK INFO */}
// //         {/* STOCK INFO — fixed height so cards stay aligned */}
// //         <div className="min-h-[18px] mt-1">
// //           {stockCount !== null && stockCount < 5 && (
// //             <p
// //               className={`text-xs font-semibold ${
// //                 stockCount === 0 ? "text-red-500" : "text-yellow-600"
// //               }`}
// //             >
// //               {stockCount === 0
// //                 ? "Out of stock"
// //                 : `Only ${stockCount} left`}
// //             </p>
// //           )}
// //         </div>

// //       </Link>

// //       {/* ADD TO CART BUTTON */}
// //       <button
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           if (!hasStock) return;
// //           addItem(product); // qty defaults to 1
// //         }}
// //         disabled={!hasStock}
// //         className={`mt-3 rounded-lg py-2 text-sm ${
// //           hasStock
// //             ? "bg-black text-white hover:bg-gray-900"
// //             : "bg-gray-200 text-gray-500 cursor-not-allowed"
// //         }`}
// //       >
// //         {hasStock ? "Add to Cart" : "Out of Stock"}
// //       </button>
// //     </div>
// //   );
// // }

// // export default ProductCard;

// // src/components/ProductCard.jsx
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addItem } from "../store/slices/cartSlice";

// import { useWishlist } from "../context/WishlistContext";

// function ProductCard({ product }) {
//   const dispatch = useDispatch();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const liked = isWishlisted(product.id);
//   const stock = product.stock ?? Infinity;

//   return (
//     <div className="relative w-48 min-w-[13rem] bg-white rounded-xl shadow-sm border p-3 flex flex-col">
//       {/* Wishlist Heart */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleWishlist(product);
//         }}
//         className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow 
//         ${liked ? "bg-fuchsia-500" : "bg-white border"}`}
//       >
//         <span className={liked ? "text-white" : "text-gray-400"}>♥</span>
//       </button>

//       <Link to={`/product/${product.id}`} className="flex flex-col flex-1 items-center">
//         <div className="w-full h-40 bg-gray-50 rounded-md flex items-center justify-center overflow-hidden">
//           <img src={product.image} alt={product.title} className="h-full object-contain" />
//         </div>

//         <h3 className="mt-3 text-sm font-semibold text-center line-clamp-2 h-10">
//           {product.title}
//         </h3>

//         {/* Stock info – keeps layout fixed */}
//         <div className="min-h-[18px] mt-1 text-xs font-semibold">
//           {stock < 5 &&
//             (stock === 0 ? (
//               <p className="text-red-500">Out of stock</p>
//             ) : (
//               <p className="text-yellow-600">Only {stock} left</p>
//             ))}
//         </div>
//       </Link>

//       {/* Add to Cart */}
//       <button
//         disabled={stock === 0}
//         onClick={(e) => {
//           e.stopPropagation();
//           dispatch(addItem(product));
//         }}
//         className={`mt-3 py-2 text-sm rounded-lg ${
//           stock === 0
//             ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//             : "bg-black text-white"
//         }`}
//       >
//         {stock === 0 ? "Out of Stock" : "Add to Cart"}
//       </button>
//     </div>
//   );
// }

// export default ProductCard;
// src/components/ProductCard.jsx
// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const liked = wishlist.some((p) => p.id === product.id);
  const stock =
    typeof product.stock === "number" ? product.stock : Infinity;

  return (
    <div className="relative w-48 min-w-[13rem] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all">
      {/* Heart Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleWishlist(product));
        }}
        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow
          ${liked ? "bg-fuchsia-500" : "bg-white border border-gray-300"}`}
      >
        <span
          className={`text-xs font-semibold ${
            liked ? "text-white" : "text-gray-400"
          }`}
        >
          ♥
        </span>
      </button>

      {/* CLICKABLE AREA (opens PDP) */}
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col items-center flex-1"
      >
        {/* IMAGE */}
        <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full"
          />
        </div>

        {/* TITLE */}
        <h3 className="text-sm font-semibold mt-3 text-center line-clamp-2 h-10">
          {product.title}
        </h3>

        {/* STOCK INFO (fixed height to avoid card jumping) */}
        <div className="min-h-[18px] mt-1">
          {stock < 5 && (
            <p
              className={`text-xs font-semibold ${
                stock === 0 ? "text-red-500" : "text-yellow-600"
              }`}
            >
              {stock === 0 ? "Out of stock" : `Only ${stock} left`}
            </p>
          )}
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (stock === 0) return;
          dispatch(addItem(product)); // qty=1 from PLP
        }}
        disabled={stock === 0}
        className={`mt-3 rounded-lg py-2 text-sm ${
          stock === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-900"
        }`}
      >
        {stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
