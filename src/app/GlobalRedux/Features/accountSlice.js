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
    try {
      const response = await login(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action) => {
      state.data = action.payload;
    },
    updateAccount: (state, action) => { },
    deleteAccount: (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("airlypayUserRole");
      localStorage.removeItem("airlipayUserId");
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
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload.data;
        state.errorMessage = "Login successfull";
        localStorage.setItem("airlypayUserRole", action.payload.data.roles[0]);
        localStorage.setItem("token", action.payload.access_token);
        if (Array.isArray(action.payload.data.users) && action.payload.data.users.length > 0) {
          localStorage.setItem("airlipayUserId", action.payload.data.users[0].id);
        }
        if (Array.isArray(action.payload.data.clients) && action.payload.data.clients.length > 0) {
          localStorage.setItem("airlipayUserId", action.payload.data.clients[0].id);
        }
        if (Array.isArray(action.payload.data.admins) && action.payload.data.admins.length > 0) {
          localStorage.setItem("airlipayUserId", action.payload.data.admins[0].id);
        }

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
