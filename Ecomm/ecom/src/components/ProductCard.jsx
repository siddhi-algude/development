// // // // import { Link } from "react-router-dom";
// // // // import { useCart } from "../context/CartContext";
// // // // import Price from "./Price";
// // // // import Button from "./Button";
// // // // import RatingStars from "./RatingStars";

// // // // export default function ProductCard({ product }) {
// // // //   const { addItem } = useCart();

// // // //   return (
// // // //     <div className="card overflow-hidden">
// // // //       <Link to={`/product/${product.id}`}>
// // // //         <img src={product.image} alt={product.title} className="h-48 w-full object-contain bg-white p-4" />

// // // //       </Link>
// // // //       <div className="p-4 space-y-3">
// // // //         <Link to={`/product/${product.id}`} className="block text-sm font-medium line-clamp-2">
// // // //           {product.title}
// // // //         </Link>
// // // //         <div className="flex items-center justify-between">
// // // //           <Price amount={product.price} className="text-lg font-semibold" />
// // // //           {product.rating?.rate && <RatingStars value={product.rating.rate} />}
// // // //         </div>
// // // //         <Button onClick={() => addItem(product, 1)} className="w-full">Add to Cart</Button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { Link } from "react-router-dom";
// // // import { useCart } from "../context/CartContext";
// // // import Price from "./Price";
// // // import Button from "./Button";
// // // import RatingStars from "./RatingStars";

// // // export default function ProductCard({ product }) {
// // //   const { addItem } = useCart();

// // //   // support rating as number or as { rate, count }
// // //   const ratingValue =
// // //     typeof product.rating === "number"
// // //       ? product.rating
// // //       : product.rating?.rate ?? null;
// // //   const ratingCount =
// // //     typeof product.rating === "number"
// // //       ? product.ratingCount
// // //       : product.rating?.count;

// // //   return (
// // //     <div className="card overflow-hidden">
// // //       <Link to={`/product/${product.id}`}>
// // //         <img
// // //           src={product.image}
// // //           alt={product.title}
// // //           className="h-48 w-full object-contain bg-white p-4"
// // //         />
// // //       </Link>

// // //       <div className="p-4 space-y-3">
// // //         <Link
// // //           to={`/product/${product.id}`}
// // //           className="block text-sm font-medium line-clamp-2"
// // //         >
// // //           {product.title}
// // //         </Link>

// // //         <div className="flex items-center justify-between">
// // //           <Price amount={product.price} className="text-lg font-semibold" />
// // //           {ratingValue && (
// // //             <RatingStars value={ratingValue} count={ratingCount} />
// // //           )}
// // //         </div>

// // //         <Button onClick={() => addItem(product, 1)} className="w-full">
// // //           Add to Cart
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { Link } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import Price from "./Price";
// // import Button from "./Button";
// // import RatingStars from "./RatingStars";

// // export default function ProductCard({ product }) {
// //   const { addItem } = useCart();

// //   const ratingValue =
// //     typeof product.rating === "number"
// //       ? product.rating
// //       : product.rating?.rate ?? null;
// //   const ratingCount =
// //     typeof product.rating === "number"
// //       ? product.ratingCount
// //       : product.rating?.count;

// //   return (
// //     <div className="card overflow-hidden hover:shadow-md hover:-translate-y-0.5">
// //       <Link to={`/product/${product.id}`}>
// //         <img
// //           src={product.image}
// //           alt={product.title}
// //           className="h-48 w-full object-contain bg-white p-4"
// //         />
// //       </Link>

// //       <div className="p-4 space-y-3">
// //         <Link
// //           to={`/product/${product.id}`}
// //           className="block text-sm font-medium line-clamp-2 hover:text-fuchsia-600"
// //         >
// //           {product.title}
// //         </Link>

// //         <div className="flex items-center justify-between">
// //           <Price amount={product.price} className="text-lg font-semibold" />
// //           {ratingValue && (
// //             <RatingStars value={ratingValue} count={ratingCount} />
// //           )}
// //         </div>

// //         <Button onClick={() => addItem(product, 1)} className="w-full">
// //           Add to Cart
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }
// import cn from "../utils/cn";
// import RatingStars from "./RatingStars";

// export default function ProductCard({ product }) {
//   return (
//     <div
//       className={cn(
//         "w-48 min-w-[12rem] bg-white rounded-2xl shadow-sm",
//         "hover:shadow-md transition-all border flex flex-col overflow-hidden",
//         "snap-start"
//       )}
//     >
//       {/* IMAGE */}
//       <div className="h-40 w-full overflow-hidden bg-gray-50">
//         <img
//           src={product.image}
//           alt={product.title}
//           className="object-cover h-full w-full transition-transform duration-300 hover:scale-105"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="p-3 flex flex-col gap-2">
//         <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>

//         <div className="text-lg font-bold">${product.price.toFixed(2)}</div>

//         <div className="flex items-center gap-1 text-xs">
//           <RatingStars rating={product.rating} />
//           <span className="text-gray-500">({product.ratingCount})</span>
//         </div>

//         <button className="mt-2 bg-black text-white rounded-lg py-2 text-sm hover:bg-gray-800">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import cn from "../utils/cn";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div
        className={cn(
          "w-48 min-w-[13rem] bg-white rounded-xl shadow-sm",
          "hover:shadow-md transition-all border border-gray-200",
          "flex flex-col overflow-hidden snap-start"
        )}
      >

        {/* IMAGE */}
        <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="p-3 flex flex-col gap-2 flex-grow">

          <h3 className="text-sm font-semibold line-clamp-2 min-h-[42px]">
            {product.title}
          </h3>

          <div className="text-lg font-bold">${product.price.toFixed(2)}</div>

          <div className="flex items-center gap-1 text-xs">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs">
              {product.rating} ★
            </span>
            <span className="text-gray-500">({product.ratingCount})</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();     // PREVENT OPENING PDP
              addItem(product);        // ADD TO CART CORRECTLY
            }}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </Link>
  );
}
