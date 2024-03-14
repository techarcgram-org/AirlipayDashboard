"use client";

import { Table } from "../../../components";
import data from "../../../constant/data";
import { userTransactions } from "@/utils/data/transactions";

const page = () => {
  return (
    <Table
      tab="Transactions"
      users={userTransactions}
      columns={data.userTransactionColumns}
      filter={true}
    />
  );
};

export default page;
