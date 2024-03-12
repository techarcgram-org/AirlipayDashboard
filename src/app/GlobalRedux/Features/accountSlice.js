"use client"; //this is a client side component

import { login } from "@/app/apiServices/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoggedIn: false,
  loading: false,
  error: false,
  errorMessage: null,
};

export const loginThunk = createAsyncThunk(
  "account/login",
  async (data, thunkAPI) => {
    console.log(data);
    const response = await login(data); // Replace with your API call
    return response.data;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.data = action.payload;
    },
    updateAccount: (state, action) => {},
    deleteAccount: (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.error = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("PAYLOAD", action.payload);
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload.data;
        state.errorMessage = "Login successfull";
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = "Login error please check credentials";
      });
  },
});

export const { addAccount, updateAccount, deleteAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
