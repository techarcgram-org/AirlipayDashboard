"use client"; //this is a client side component

import { createAdmin, getAdmins, getAdmin, editAdmin, deleteAdmin } from "@/app/apiServices/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const addAdmin = createAsyncThunk(
  "admins/create",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await createAdmin(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const listAdmins = createAsyncThunk(
  "admins/listAdmins",
  async (thunkAPI) => {
    let response;
    try {
      response = await getAdmins();
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const listAdmin = createAsyncThunk(
  "admins/listAdmin",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await getAdmin(id);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const updateAdmin = createAsyncThunk(
  "admins/updateAdmin",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await editAdmin(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const removeAdmin = createAsyncThunk(
  "admins/removeAdmin",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await deleteAdmin(id);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.data = [action.payload.data];
        state.loading = false;
        state.errorMessage = "Success creating admin";
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(listAdmins.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listAdmins.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing admins";
      })
      .addCase(listAdmins.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(listAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listAdmin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing admin";
      })
      .addCase(listAdmin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success updating admin";
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(removeAdmin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(removeAdmin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success deleting admin";
      })
      .addCase(removeAdmin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      });
  },
});

export const { } = adminSlice.actions;

export default adminSlice.reducer;
