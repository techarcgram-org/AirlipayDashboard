"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSlice from "./Features/clientSlice";
import accountSlice from "./Features/accountSlice";
import userSlice from "./Features/userSlice";
import adminSlice from "./Features/adminSlice";

const rootReducer = combineReducers({
  clients: clientSlice,
  account: accountSlice,
  users: userSlice,
  admins: adminSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
