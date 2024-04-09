"use client";

import { Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import { useSelector } from "react-redux";
import React from "react";

const page = () => {
  const { momoAccounts } = useSelector((state) => state.users);
  // console.log("momo accounts", momoAccounts);

  return (
    <Table
      tab="Momo Accounts"
      users={bankAccounts}
      columns={data.banksColumns}
    />
  );
};

export default page;
