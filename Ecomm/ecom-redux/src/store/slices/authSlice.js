// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, verifyOtp } from "../thunks/authThunks";

const initialState = {
  user: null,
  tempUser: null,      // user waiting for OTP verification
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("swiftkart_user");
    },

    restoreUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },

  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tempUser = action.payload; // waiting OTP
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("swiftkart_user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // OTP VERIFY
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.tempUser = null;
        state.isAuthenticated = true;
        localStorage.setItem("swiftkart_user", JSON.stringify(action.payload));
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;
