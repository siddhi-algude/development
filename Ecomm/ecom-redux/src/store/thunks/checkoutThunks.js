// src/store/thunks/checkoutThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import checkoutApi from "../../utils/checkoutApi";

export const placeOrder = createAsyncThunk(
  "checkout/placeOrder",
  async (payload) => {
    const response = await checkoutApi.placeOrder(payload);
    return response;
  }
);
