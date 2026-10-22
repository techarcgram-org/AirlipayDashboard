"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import clientSlice from "./Features/clientSlice";
import accountSlice from "./Features/accountSlice";
import userSlice from "./Features/userSlice";
import adminSlice from "./Features/adminSlice";
import transactionSlice from "./Features/transactionSlice";
import invoiceSlice from "./Features/invoiceSlice";
import dashboardSlice from "./Features/dashboardSlice";

const rootReducer = combineReducers({
  clients: clientSlice,
  account: accountSlice,
  users: userSlice,
  admins: adminSlice,
  transactions: transactionSlice,
  invoices: invoiceSlice,
  dashboard: dashboardSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
