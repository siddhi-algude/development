import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import filterReducer from "./slices/filterSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    search: searchReducer,
    filters: filterReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  },
});

export default store;
