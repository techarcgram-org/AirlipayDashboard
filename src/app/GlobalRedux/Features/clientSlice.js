"use client"; //this is a client side component

import { createClient, getClients, getClient, updateClient, deleteClient } from "@/app/apiServices/clientService";
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
  }
);

export const readClients = createAsyncThunk("clients/read", async (thunkAPI) => {
  try {
    const response = await getClients()
    return response.data
  } catch (error) {
    // const message =
    //   (error.message && error.response.data && error.response.data.message) ||
    //   error.message ||
    //   error.toString()
    // return thunkAPI.rejectWithValue(message)
    console.log("THUNK CLIENT ERROR", error);
    return thunkAPI.rejectWithValue({ data: error.response.data });
  }
})

export const readClient = createAsyncThunk("clients/readOne", async (id, thunkAPI) => {
  try {
    const response = await getClient(id)
    return response.data
  } catch (error) {
    console.log("THUNK CLIENT ERROR", error);
    return thunkAPI.rejectWithValue({ data: error.response.data });
  }
})

export const updateClientById = createAsyncThunk("clients/update", async (data, thunkAPI) => {
  try {
    const response = await updateClient(data)
    return response.data
  } catch (error) {
    console.log("THUNK CLIENT ERROR", error);
    return thunkAPI.rejectWithValue({ data: error.response.data });
  }
})

export const deleteClientById = createAsyncThunk("clients/delete", async (id, thunkAPI) => {
  try {
    const response = await deleteClient(id)
    return response.data
  } catch (error) {
    console.log("THUNK CLIENT ERROR", error);
    return thunkAPI.rejectWithValue({ data: error.response.data });
  }
})

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    updateClientHandler: (state, action) => { },
    deleteClientHandler: (state, action) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success creating client";
      })
      .addCase(addClient.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // read checks
      .addCase(readClients.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(readClients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success reading clients";
      })
      .addCase(readClients.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // single read checks
      .addCase(readClient.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(readClient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success reading client";
      })
      .addCase(readClient.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // update checks
      .addCase(updateClientById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(updateClientById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success updating client";
      })
      .addCase(updateClientById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // delete checks
      .addCase(deleteClientById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(deleteClientById.fulfilled, (state, action) => {
        state.data = state.data.filter(items => items.id !== action.meta.arg)
        state.loading = false;
        state.errorMessage = "Success updating client";
      })
      .addCase(deleteClientById.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
  },
});

export const { updateClientHandler, deleteClientHandler } = clientSlice.actions;

export default clientSlice.reducer;
