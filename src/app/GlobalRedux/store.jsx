"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSlice from "./Features/clientSlice";
import accountSlice from "./Features/accountSlice";
import userSlice from "./Features/userSlice";

const rootReducer = combineReducers({
  clients: clientSlice,
  account: accountSlice,
  users: userSlice,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
