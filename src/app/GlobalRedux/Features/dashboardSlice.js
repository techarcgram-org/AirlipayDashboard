"use client"; //this is a client side component

import { getData } from "../../apiServices/dashboradService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLoggedIn: false,
  loading: false,
  error: false,
  errorMessage: null,
};

export const getMetrics = createAsyncThunk(
  "account/getMetrics",
  async (thunkAPI) => {
    try {
      const response = await getData();
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMetrics.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.error = false;
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.data = action.payload;

      })
      .addCase(getMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = "Error getting data";
      });
  },
});

export const { } = dashboardSlice.actions;

export default dashboardSlice.reducer;
