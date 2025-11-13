// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAsync } from "../hooks/useAsync";
// import { getProduct } from "../services/api";
// import withErrorBoundary from "../hoc/withErrorBoundary";
// import withPageTitle from "../hoc/withPageTitle";
// import { useCart } from "../context/CartContext";
// import { etaRange } from "../utils/date";
// import QuantityInput from "../components/QuantityInput";
// import Price from "../components/Price";
// import Button from "../components/Button";

// function ProductDetailsPage() {
//   const { id } = useParams();
//   const { data: product, loading, error, run } = useAsync(() => getProduct(id), [id]);
//   const { addItem } = useCart();
//   const [qty, setQty] = useState(1);

//   if (!product && !loading && !error) { run(); }

//   if (loading || !product) return <div className="py-12">Loading product…</div>;
//   if (error) return <div className="text-red-600">{error.message}</div>;

//   return (
//     <div className="grid md:grid-cols-2 gap-8">
//       <div className="card p-6 flex items-center justify-center">
//         <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
//       </div>
//       <div className="space-y-4">
//         <h1 className="text-2xl font-semibold">{product.title}</h1>
//         <Price amount={product.price} className="text-2xl font-bold" />
//         <p className="text-gray-700 leading-relaxed">{product.description}</p>

//         <div className="flex items-center gap-4">
//           <QuantityInput value={qty} onChange={setQty} />
//           <Button onClick={() => addItem(product, qty)}>Add to Cart</Button>
//         </div>

//         <div className="mt-4 text-sm text-gray-600 space-y-1">
//           <div><span className="font-medium">Delivery:</span> Estimated arrival {etaRange(2, 5)}</div>
//           <div><span className="font-medium">Shipping:</span> Free over $50, otherwise $5</div>
//           <div><span className="font-medium">Returns:</span> 30-day return policy</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withErrorBoundary(withPageTitle(ProductDetailsPage, "ShopLite · Product"));
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withErrorBoundary from "../hoc/withErrorBoundary";
import withPageTitle from "../hoc/withPageTitle";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import QuantityInput from "../components/QuantityInput";
import Price from "../components/Price";
import Button from "../components/Button";
import RatingStars from "../components/RatingStars";
import { etaRange } from "../utils/date";

function ProductDetailsPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProduct(id);
        if (mounted) setProduct(data);
      } catch (e) {
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading || !product) {
    return <div className="py-16 text-center">Loading product…</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-600">
        Failed to load product: {error.message}
      </div>
    );
  }

  const ratingValue =
    typeof product.rating === "number"
      ? product.rating
      : product.rating?.rate ?? null;
  const ratingCount =
    typeof product.rating === "number"
      ? product.ratingCount
      : product.rating?.count;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Left: image */}
      <div className="card p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[360px] object-contain"
        />
      </div>

      {/* Right: info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>

        <div className="flex items-center gap-3">
          {ratingValue && (
            <RatingStars value={ratingValue} count={ratingCount} />
          )}
          <span className="text-xs text-gray-500">
            {ratingCount ? "Verified ratings" : "New arrival"}
          </span>
        </div>

        <Price amount={product.price} className="text-3xl font-bold" />

        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-4">
          <QuantityInput value={qty} onChange={setQty} />
          <Button
            onClick={() => addItem(product, qty)}
            className="min-w-[160px]"
          >
            Add to Cart
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <div>
            <span className="font-medium">Delivery: </span>
            Estimated arrival {etaRange(2, 5)}
          </div>
          <div>
            <span className="font-medium">Shipping: </span>
            Free over $50, otherwise $5
          </div>
          <div>
            <span className="font-medium">Returns: </span>
            30-day return policy
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(
  withPageTitle(ProductDetailsPage, "SwiftKart · Product")
);
