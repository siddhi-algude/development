// src/pages/Wishlist.jsx
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  return (
    <div className="container-max py-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <button
                onClick={() => dispatch(removeFromWishlist(product.id))}
                className="absolute top-2 left-2 text-xs text-red-500 underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
