"use client";

import { Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import transactions from "@/utils/data/transactions";
import React from "react";

const page = () => {
  return (
    <Table
      tab="Activity Feed"
      users={transactions}
      columns={data.transactionColumns}
    />
  );
};

export default page;
