import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],   // { id, title, price, image, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
    },

    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
