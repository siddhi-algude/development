// src/store/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../utils/authApi";

// signup → OTP page
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload) => {
    const res = await authApi.signup(payload);
    return res; // temp user waiting OTP
  }
);

// login → returns user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload) => {
    const res = await authApi.login(payload);
    return res; // real user
  }
);

// otp verify → completes signup
export const verifyOtp = createAsyncThunk(
  "auth/otp",
  async ({ email, otp }) => {
    const res = await authApi.verifyOtp(email, otp);
    return res; // real user
  }
);
