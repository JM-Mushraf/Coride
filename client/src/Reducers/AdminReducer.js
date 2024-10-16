import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingUsers: [],
  loading: false,
  isAuthenticated: false,
  admin: null,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    ADMIN_LOGIN_REQUEST: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    ADMIN_LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    ADMIN_LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.admin = null;
      state.error = action.payload;
    },
    GET_PENDING_USERS_REQUEST: (state) => {
      state.loading = true;
    },
    GET_PENDING_USERS_SUCCESS: (state, action) => {
      state.loading = false;

      state.pendingUsers = action.payload;
    },
    GET_PENDING_USERS_FAIL: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    APPROVE_USER_REQUEST: (state) => {
      state.loading = true;
    },
    APPROVE_USER_SUCCESS: (state) => {
      state.loading = false;
    },
    APPROVE_USER_FAIL: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  },
});

export const {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_REQUEST,
  GET_PENDING_USERS_REQUEST,
  GET_PENDING_USERS_SUCCESS,
  GET_PENDING_USERS_FAIL,
  CLEAR_ERRORS,
} = adminSlice.actions;

export default adminSlice.reducer;
