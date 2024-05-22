"use client"; //this is a client side component

import { getInvoices, getInvoiceTransactions, editInvoice } from "@/app/apiServices/invoiceService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  transactions: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const listInvoices = createAsyncThunk(
  "invoice/listInvoices",
  async (thunkAPI) => {
    try {
      const response = await getInvoices();
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }

  }
);

export const listInvoiceTransactions = createAsyncThunk(
  "invoice/listInvoiceTransactions",
  async (id, thunkAPI) => {
    try {
      const response = await getInvoiceTransactions(id);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "users/updateInvoice",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await editInvoice(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
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
      // 
      .addCase(listInvoiceTransactions.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listInvoiceTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
        state.errorMessage = "Success reading invoice transactions";
      })
      .addCase(listInvoiceTransactions.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // update invoice
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success updating invoice";
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
  },
});

export const { addAccount, updateAccount, deleteAccount } =
  accountSlice.actions;

export default accountSlice.reducer;
