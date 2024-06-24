"use client"; //this is a client side component

import { getTransactions } from "@/app/apiServices/transactionService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [],
    loading: false,
    error: false,
    errorMessage: null,
};

export const readTransactions = createAsyncThunk("transactions/readTransactions", async (data, thunkAPI) => {
    try {
        const response = await getTransactions(data)
        return response.data
    } catch (error) {
        console.log("THUNK CLIENT ERROR", error);
        return thunkAPI.rejectWithValue({ data: error.response.data });
    }
})

const clientSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(readTransactions.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.errorMessage = null;
            })
            .addCase(readTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
                state.errorMessage = "Success reading transactions";
            })
            .addCase(readTransactions.rejected, (state, action) => {
                console.log(action)
                state.loading = false
                state.errorMessage = action.payload.data.message;
                state.error = true;
            })

    },
});

export const { } = clientSlice.actions;

export default clientSlice.reducer;
