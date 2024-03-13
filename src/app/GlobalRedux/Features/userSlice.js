"use client"; //this is a client side component

import { createUser, getUsers } from "@/app/apiServices/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const addUser = createAsyncThunk(
  "users/create",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await createUser(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const listUsers = createAsyncThunk(
  "users/get",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await getUsers();
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    deleteUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.data = [action.payload.data];
        state.loading = false;
        state.errorMessage = "Success creating user";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing users";
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      });
  },
});

export const { updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
