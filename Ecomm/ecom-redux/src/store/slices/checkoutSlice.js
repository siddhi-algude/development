import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  paymentMethod: null,
  orderSummary: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    clearCheckout: () => initialState,
  },
});

export const {
  setAddress,
  setPaymentMethod,
  setOrderSummary,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
