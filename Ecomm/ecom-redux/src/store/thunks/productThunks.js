import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi } from "../../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductsApi();
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
