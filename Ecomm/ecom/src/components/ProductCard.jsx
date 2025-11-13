// // import { Link } from "react-router-dom";
// // import { useCart } from "../context/CartContext";
// // import Price from "./Price";
// // import Button from "./Button";
// // import RatingStars from "./RatingStars";

// // export default function ProductCard({ product }) {
// //   const { addItem } = useCart();

// //   return (
// //     <div className="card overflow-hidden">
// //       <Link to={`/product/${product.id}`}>
// //         <img src={product.image} alt={product.title} className="h-48 w-full object-contain bg-white p-4" />

// //       </Link>
// //       <div className="p-4 space-y-3">
// //         <Link to={`/product/${product.id}`} className="block text-sm font-medium line-clamp-2">
// //           {product.title}
// //         </Link>
// //         <div className="flex items-center justify-between">
// //           <Price amount={product.price} className="text-lg font-semibold" />
// //           {product.rating?.rate && <RatingStars value={product.rating.rate} />}
// //         </div>
// //         <Button onClick={() => addItem(product, 1)} className="w-full">Add to Cart</Button>
// //       </div>
// //     </div>
// //   );
// // }


// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import Price from "./Price";
// import Button from "./Button";
// import RatingStars from "./RatingStars";

// export default function ProductCard({ product }) {
//   const { addItem } = useCart();

//   // support rating as number or as { rate, count }
//   const ratingValue =
//     typeof product.rating === "number"
//       ? product.rating
//       : product.rating?.rate ?? null;
//   const ratingCount =
//     typeof product.rating === "number"
//       ? product.ratingCount
//       : product.rating?.count;

//   return (
//     <div className="card overflow-hidden">
//       <Link to={`/product/${product.id}`}>
//         <img
//           src={product.image}
//           alt={product.title}
//           className="h-48 w-full object-contain bg-white p-4"
//         />
//       </Link>

//       <div className="p-4 space-y-3">
//         <Link
//           to={`/product/${product.id}`}
//           className="block text-sm font-medium line-clamp-2"
//         >
//           {product.title}
//         </Link>

//         <div className="flex items-center justify-between">
//           <Price amount={product.price} className="text-lg font-semibold" />
//           {ratingValue && (
//             <RatingStars value={ratingValue} count={ratingCount} />
//           )}
//         </div>

//         <Button onClick={() => addItem(product, 1)} className="w-full">
//           Add to Cart
//         </Button>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Price from "./Price";
import Button from "./Button";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const ratingValue =
    typeof product.rating === "number"
      ? product.rating
      : product.rating?.rate ?? null;
  const ratingCount =
    typeof product.rating === "number"
      ? product.ratingCount
      : product.rating?.count;

  return (
    <div className="card overflow-hidden hover:shadow-md hover:-translate-y-0.5">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain bg-white p-4"
        />
      </Link>

      <div className="p-4 space-y-3">
        <Link
          to={`/product/${product.id}`}
          className="block text-sm font-medium line-clamp-2 hover:text-fuchsia-600"
        >
          {product.title}
        </Link>

        <div className="flex items-center justify-between">
          <Price amount={product.price} className="text-lg font-semibold" />
          {ratingValue && (
            <RatingStars value={ratingValue} count={ratingCount} />
          )}
        </div>

        <Button onClick={() => addItem(product, 1)} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
