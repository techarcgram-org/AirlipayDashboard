"use client"; //this is a client side component

import { getInvoices } from "@/app/apiServices/invoiceService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const listInvoices = createAsyncThunk(
  "invoice/listInvoices",
  async () => {
    const response = await getInvoices(); // Replace with your API call
    return response.data;
  }
);

const accountSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(listInvoices.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.loading = false;
        state.errorMessage = "Success reading invoices";
      })
      .addCase(listInvoices.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
  },
});

export const { addAccount, updateAccount, deleteAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
