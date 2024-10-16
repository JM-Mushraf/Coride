import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  isOtpSent: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    REGISTER_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    REGISTER_SUCCESS: (state) => {
      state.loading = false;
      state.isOtpSent = true;
    },
    REGISTER_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    VERIFY_OTP_REQUEST: (state) => {
      state.loading = true;
    },
    VERIFY_OTP_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    VERIFY_OTP_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    LOGOUT_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    LOGOUT_SUCCESS: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = null;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} = userSlice.actions;

export default userSlice.reducer;
