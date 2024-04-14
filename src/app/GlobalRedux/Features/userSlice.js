"use client"; //this is a client side component

import { createUser, getUsers, getUser, editUser, deleteUser, getBanks, getMomoAccounts, getAirlipayBalance } from "@/app/apiServices/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  banks: [],
  momoAccounts: [],
  airlipayBalance: [],
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

export const listBanks = createAsyncThunk(
  "users/listBanks",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await getBanks(id);
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const listMomoAccounts = createAsyncThunk(
  "users/listMomoAccounts",
  async (thunkAPI) => {
    let response;
    try {
      response = await getMomoAccounts();
      return response.data;
    } catch (error) {
      console.log("THUNK CLIENT ERROR", error);
      return thunkAPI.rejectWithValue({ data: error.response.data });
    }
    // Replace with your API call
  }
);

export const listAirlipayBalance = createAsyncThunk(
  "users/listAirlipayBalance",
  async (id, thunkAPI) => {
    let response;
    try {
      response = await getAirlipayBalance(id);
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
        state.user = action.payload;
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
      })
      // 
      .addCase(listBanks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listBanks.fulfilled, (state, action) => {
        state.banks = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing banks";
      })
      .addCase(listBanks.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      //
      .addCase(listMomoAccounts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listMomoAccounts.fulfilled, (state, action) => {
        state.momoAccounts = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing momo accounts";
      })
      .addCase(listMomoAccounts.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
      // 
      .addCase(listAirlipayBalance.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(listAirlipayBalance.fulfilled, (state, action) => {
        state.airlipayBalance = action.payload;
        state.loading = false;
        state.errorMessage = "Success listing airlipay balance";
      })
      .addCase(listAirlipayBalance.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data.message;
        state.error = true;
      })
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
