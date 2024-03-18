"use client"; //this is a client side component

import { createClient } from "@/app/apiServices/clientService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const addClient = createAsyncThunk(
  "clients/create",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await createClient(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    updateClient: (state, action) => {},
    deleteClient: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.data = [action.payload.data];
        state.loading = false;
        state.errorMessage = "Success creating client";
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      });
  },
});

export const { updateClient, deleteClient } = clientSlice.actions;

export default clientSlice.reducer;
