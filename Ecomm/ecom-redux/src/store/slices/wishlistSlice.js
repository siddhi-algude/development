// src/store/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // array of product objects
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const exists = state.items.some((p) => p.id === product.id);

      if (exists) {
        state.items = state.items.filter((p) => p.id !== product.id);
      } else {
        state.items.push(product);
      }
    },

    removeFromWishlist(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
