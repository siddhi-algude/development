import { createContext, useContext, useMemo, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action;
      const idx = state.items.findIndex(i => i.id === product.id);
      const items = [...state.items];
      if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty };
      else items.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty });
      return { ...state, items };
    }
    case "SET_QTY": {
      const { id, qty } = action;
      const items = state.items.map(i => i.id === id ? { ...i, qty } : i).filter(i => i.qty > 0);
      return { ...state, items };
    }
    case "REMOVE": {
      const items = state.items.filter(i => i.id !== action.id);
      return { ...state, items };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage("cart_v1", { items: [] });
  const [state, dispatch] = useReducer(cartReducer, persisted);

  // persist on change
  useMemo(() => setPersisted(state), [state, setPersisted]);

  const totalCount = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state]);
  const subtotal   = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state]);

  // Math story: 10% tax, shipping $0 if subtotal >= $50 else $5
  const taxRate = 0.10;
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);
  const shipping = useMemo(() => (subtotal > 0 && subtotal < 50 ? 5 : 0), [subtotal]);
  const total = useMemo(() => subtotal + tax + shipping, [subtotal, tax, shipping]);

  const value = useMemo(() => ({
    items: state.items,
    addItem: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalCount, subtotal, tax, shipping, total, taxRate,
  }), [state.items, totalCount, subtotal, tax, shipping, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
