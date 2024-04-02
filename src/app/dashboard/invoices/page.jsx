"use client";

import { Table } from "@/components";
import data from "@/constant/data";
import transactions from "@/utils/data/transactions";
import React from "react";

const page = () => {
  return (
    <>
      <h2 className="font-bold">Client Invoices</h2>
      <Table
        tab="Invoices"
        users={transactions}
        columns={data.transactionColumns}
      />
    </>
  );
};

export default page;
