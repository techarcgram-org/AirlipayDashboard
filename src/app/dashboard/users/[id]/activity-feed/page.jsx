"use client";

import { Table } from "../../../../../components";
import data from "../../../../../constant/data";
import transactions from "../../../../../utils/data/transactions";
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
