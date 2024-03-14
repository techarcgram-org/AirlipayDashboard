"use client";

import { Table } from "../../../components";
import data from "../../../constant/data";
import { userTransactions } from "@/utils/data/transactions";

const page = () => {
  return (
    <>
      <h2 className="font-bold">Transactions</h2>
      <Table
        tab="Transactions"
        users={userTransactions}
        columns={data.userTransactionColumns}
        filter={true}
      />
    </>
  );
};

export default page;
