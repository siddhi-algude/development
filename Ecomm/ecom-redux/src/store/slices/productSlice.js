// src/store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await getProducts();
    return res;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load products";
      });
  },
});

export default productsSlice.reducer;
