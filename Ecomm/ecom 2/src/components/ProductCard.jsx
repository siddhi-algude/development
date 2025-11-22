// // import { Link } from "react-router-dom";
// // import cn from "../utils/cn";
// // import RatingStars from "./RatingStars";

// // export default function ProductCard({ product }) {
// //   return (
// //     <Link to={`/product/${product.id}`}>
// //       <div
// //         className={cn(
// //           "w-48 min-w-[13rem] bg-white rounded-xl shadow-sm",
// //           "hover:shadow-md transition-all border border-gray-200",
// //           "flex flex-col overflow-hidden snap-start"
// //         )}
// //       >

// //         {/* IMAGE */}
// //         <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
// //           <img
// //             src={product.image}
// //             alt={product.title}
// //             className="object-cover w-full h-full transition-transform hover:scale-105"
// //           />
// //         </div>

// //         {/* CONTENT */}
// //         <div className="p-3 flex flex-col gap-2 flex-grow">

// //           <h3 className="text-sm font-semibold line-clamp-2 min-h-[42px]">
// //             {product.title}
// //           </h3>

// //           <div className="text-lg font-bold">${product.price.toFixed(2)}</div>

// //           <div className="flex items-center gap-1 text-xs">
// //             <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
// //               {product.rating} ★
// //             </span>
// //             <span className="text-gray-500">({product.ratingCount})</span>
// //           </div>

// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();     // PREVENT OPENING PDP
// //               addItem(product);        // ADD TO CART CORRECTLY
// //             }}
// //           >
// //             Add to Cart
// //           </button>

// //         </div>
// //       </div>
// //     </Link>
// //   );
// // }
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   const { addItem } = useCart();
//   const { toggleWishlist, isWishlisted } = useWishlist();

//   const liked = isWishlisted(product.id);

//   return (
//     <div className="relative w-48 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//       {/* Heart Icon */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleWishlist(product);
//         }}
//         className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow
//           ${liked ? "bg-fuchsia-500" : "bg-white border border-gray-300"}`}
//       >
//         <span
//           className={`text-xs font-semibold ${
//             liked ? "text-white" : "text-gray-400"
//           }`}
//         >
//           ♥
//         </span>
//       </button>

//       {/* CLICKABLE AREA (opens PDP) */}
//       <Link
//         to={`/product/${product.id}`}
//         className="flex flex-col items-center flex-1"
//       >
//         {/* IMAGE */}
//         <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-md bg-gray-50">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="object-contain h-full"
//           />
//         </div>

//         {/* TITLE */}
//         <h3 className="text-sm font-semibold mt-3 text-center line-clamp-2 h-10">
//           {product.title}
//         </h3>
//       </Link>

//       {/* ADD TO CART BUTTON */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           addItem(product);
//         }}
//         className="mt-3 bg-black text-white rounded-lg py-2 text-sm"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default ProductCard;
import { AddToCartButton } from "@abcde123jk/swiftkart-addtocart";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const liked = isWishlisted(product.id);
  const hasStock =
    typeof product.stock === "number" ? product.stock > 0 : true;
  const stockCount =
    typeof product.stock === "number" ? product.stock : null;

  return (
    <div className="relative w-48 min-w-[13rem] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all">
      {/* Heart Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
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
 
        {/* STOCK INFO */}
        {/* STOCK INFO — fixed height so cards stay aligned */}
        <div className="min-h-[18px] mt-1">
          {stockCount !== null && stockCount < 5 && (
            <p
              className={`text-xs font-semibold ${
                stockCount === 0 ? "text-red-500" : "text-yellow-600"
              }`}
            >
              {stockCount === 0
                ? "Out of stock"
                : `Only ${stockCount} left`}
            </p>
          )}
        </div>

      </Link>

      {/* ADD TO CART BUTTON */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          if (!hasStock) return;
          addItem(product); // qty defaults to 1
        }}
        disabled={!hasStock}
        className={`mt-3 rounded-lg py-2 text-sm ${
          hasStock
            ? "bg-black text-white hover:bg-gray-900"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {hasStock ? "Add to Cart" : "Out of Stock"}
      </button> */}
      {/* ADD TO CART BUTTON (from NPM package) */}
      <AddToCartButton
        onAdd={() => addItem(product)}
        disabled={!hasStock}
        label={hasStock ? "Add to Cart" : "Out of Stock"}
        className="mt-3 w-full"
      />

    </div>
  );
}

export default ProductCard;
