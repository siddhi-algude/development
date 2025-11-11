import { useMemo, useState } from "react";

/** Tiny util */
const formatPrice = (n, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);

function StarRating({ value = 0, count = 5 }) {
  const stars = Array.from({ length: count }, (_, i) => i < Math.round(value));
  return (
    <div aria-label={`Rating ${value} of ${count}`} style={{ fontSize: 14 }}>
      {stars.map((filled, i) => (
        <span key={i} role="img" aria-hidden="true">{filled ? "★" : "☆"}</span>
      ))}
      <span style={{ marginLeft: 6, color: "#666" }}>{value.toFixed(1)}</span>
    </div>
  );
}

/**
 * ProductCard
 * Props:
 * - product: {
 *     id, title, brand, images: [url], price, compareAtPrice, rating, reviewsCount,
 *     variants: [{ id, color, size, stock }], currency, locale
 *   }
 * - onAddToCart: (payload) => void
 * - onToggleWishlist: (productId, next) => void
 * - loading: boolean (optional skeleton)
 */
export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  loading = false,
}) {
  const [wish, setWish] = useState(false);
  const [qty, setQty] = useState(1);

  // pick the first in-stock variant by default
  const firstInStock = useMemo(
    () => product.variants.find(v => v.stock > 0) || product.variants[0],
    [product.variants]
  );

  const [selected, setSelected] = useState(firstInStock);

  const inStock = selected?.stock > 0;
  const canAdd = inStock && qty > 0 && qty <= (selected?.stock || 0);

  const discountPct = useMemo(() => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
    return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  }, [product.price, product.compareAtPrice]);

  const price = formatPrice(product.price, product.currency, product.locale);
  const compareAt = product.compareAtPrice
    ? formatPrice(product.compareAtPrice, product.currency, product.locale)
    : null;

  const handleAdd = () => {
    if (!canAdd) return;
    onAddToCart?.({
      productId: product.id,
      variantId: selected.id,
      qty,
      price: product.price,
    });
    // optimistic feedback
    setQty(1);
  };

  const toggleWish = () => {
    const next = !wish;
    setWish(next);
    onToggleWishlist?.(product.id, next);
  };

  if (loading) {
    return <SkeletonCard />;
  }

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 16,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        maxWidth: 720,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10 }}
          loading="lazy"
        />
        {!inStock && (
          <span style={badgeStyle("#7f1d1d", "#fee2e2")}>Out of stock</span>
        )}
        {inStock && discountPct > 0 && (
          <span style={badgeStyle("#14532d", "#dcfce7")}>-{discountPct}%</span>
        )}
      </div>

      {/* Details */}
      <div>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
          <div>
            <h3 style={{ margin: 0 }}>{product.title}</h3>
            <p style={{ margin: "4px 0", color: "#666", fontSize: 14 }}>{product.brand}</p>
            <StarRating value={product.rating || 0} />
          </div>
          <button
            aria-label="Toggle wishlist"
            onClick={toggleWish}
            style={{
              border: "1px solid #eee",
              background: wish ? "#fee2e2" : "#fff",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            {wish ? "♥" : "♡"}
          </button>
        </header>

        {/* Price */}
        <div style={{ margin: "8px 0" }}>
          <span style={{ fontWeight: 700 }}>{price}</span>{" "}
          {compareAt && (
            <span style={{ textDecoration: "line-through", color: "#888", fontSize: 14 }}>
              {compareAt}
            </span>
          )}
        </div>

        {/* Variants */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "8px 0" }}>
          {/* Color */}
          <label>
            <span style={labelStyle}>Color</span>
            <select
              value={selected.color}
              onChange={(e) => {
                const next = product.variants.find(v => v.color === e.target.value && v.size === selected.size)
                  || product.variants.find(v => v.color === e.target.value);
                setSelected(next || selected);
                setQty(1);
              }}
            >
              {unique(product.variants.map(v => v.color)).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          {/* Size */}
          <label>
            <span style={labelStyle}>Size</span>
            <select
              value={selected.size || ""}
              onChange={(e) => {
                const val = e.target.value || undefined;
                const next = product.variants.find(v => v.size === val && v.color === selected.color)
                  || product.variants.find(v => v.size === val);
                setSelected(next || selected);
                setQty(1);
              }}
            >
              {unique(product.variants.map(v => v.size)).map(s => (
                <option key={s || "onesize"} value={s || ""}>{s || "One size"}</option>
              ))}
            </select>
          </label>

          {/* Stock info */}
          <span style={{ alignSelf: "end", color: inStock ? "#065f46" : "#7f1d1d", fontSize: 12 }}>
            {inStock ? `${selected.stock} in stock` : "Unavailable"}
          </span>
        </div>

        {/* Quantity + CTA */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
          <QtyStepper
            value={qty}
            min={1}
            max={Math.max(1, selected?.stock || 1)}
            onChange={setQty}
            disabled={!inStock}
          />
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            style={{
              padding: "10px 14px",
              background: canAdd ? "#111" : "#bbb",
              color: "#fff",
              borderRadius: 10,
              border: "none",
              cursor: canAdd ? "pointer" : "not-allowed",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* ----- helpers/components ----- */

function QtyStepper({ value, min = 1, max = Infinity, onChange, disabled }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #eee", borderRadius: 10 }}>
      <button onClick={dec} disabled={disabled || value <= min} style={stepBtn} aria-label="decrease">–</button>
      <input
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.min(Math.max(n, min), max));
        }}
        inputMode="numeric"
        style={{ width: 48, textAlign: "center", border: "none", outline: "none" }}
        disabled={disabled}
      />
      <button onClick={inc} disabled={disabled || value >= max} style={stepBtn} aria-label="increase">+</button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: 16,
      padding: 16,
      border: "1px solid #eee",
      borderRadius: 12,
      maxWidth: 720,
    }}>
      <div style={skeletonBox(120, 120)} />
      <div>
        <div style={skeletonBox("40%", 16)} />
        <div style={{ height: 6 }} />
        <div style={skeletonBox("20%", 12)} />
        <div style={{ height: 10 }} />
        <div style={skeletonBox("30%", 18)} />
        <div style={{ height: 8 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={skeletonBox(90, 30)} />
          <div style={skeletonBox(120, 30)} />
        </div>
      </div>
    </div>
  );
}

const stepBtn = { width: 32, height: 36, border: "none", background: "transparent", cursor: "pointer" };

const labelStyle = {
  display: "block",
  fontSize: 12,
  color: "#666",
  marginBottom: 4,
};

function badgeStyle(color = "#111", bg = "#eee") {
  return {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 12,
    padding: "4px 8px",
    borderRadius: 999,
    color: bg === "#eee" ? "#111" : color,
    background: bg,
    border: `1px solid ${color}11`,
  };
}

function skeletonBox(w, h) {
  return {
    width: w,
    height: h,
    background: "linear-gradient(90deg, #eee, #f7f7f7, #eee)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.2s infinite",
    borderRadius: 10,
  };
}

function unique(arr) {
  return [...new Set(arr.filter(Boolean))];
}
