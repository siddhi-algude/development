import React from "react";

export default function AddToCartButton({
  onAdd,
  disabled = false,
  label = "Add to Cart",
  className = "",
}) {
  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onAdd();
      }}
      className={`bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 disabled:bg-gray-300 ${className}`}
    >
      {label}
    </button>
  );
}
