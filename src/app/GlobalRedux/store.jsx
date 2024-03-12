"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSlice from "./Features/clientSlice";
import accountSlice from "./Features/accountSlice";

const rootReducer = combineReducers({
  clients: clientSlice,
  account: accountSlice,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});
