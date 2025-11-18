// src/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import withErrorBoundary from "../hoc/withErrorBoundary";
import withPageTitle from "../hoc/withPageTitle";

import { getProduct } from "../services/api";
import QuantityInput from "../components/QuantityInput";
import Price from "../components/Price";
import Button from "../components/Button";
import RatingStars from "../components/RatingStars";
import { etaRange } from "../utils/date";

import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const liked = product
    ? wishlistItems.some((p) => p.id === product.id)
    : false;

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

  const handleAddToCart = () => {
    if (qty <= 0) return;
    dispatch(addItem({ product, quantity: qty }));
  };

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
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          {/* Wishlist heart */}
          <button
            onClick={() => dispatch(toggleWishlist(product))}
            className="bg-white rounded-full p-2 shadow"
          >
            {liked ? (
              <span className="text-fuchsia-500 text-2xl">❤️</span>
            ) : (
              <span className="text-gray-300 text-2xl">🤍</span>
            )}
          </button>
        </div>

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
            onClick={handleAddToCart}
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
