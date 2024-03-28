"use client";

import { Table } from "@/components";
import data from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import React from "react";

const page = () => {
  return (
    <Table
      tab="Transactions"
      users={bankAccounts}
      columns={data.banksColumns}
    />
  );
};

export default page;
