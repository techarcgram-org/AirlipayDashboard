"use client"; //this is a client side component

import { createUser, getUsers, getUser, editUser, deleteUser } from "@/app/apiServices/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
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
  async (thunkAPI) => {
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

export const listUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await getUser(id);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data, thunkAPI) => {
    let response;
    try {
      response = await editUser(data);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await deleteUser(id);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success creating user";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing users";
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(listUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing user";
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success updating user";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.errorMessage = "Success deleting user";
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      });
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
