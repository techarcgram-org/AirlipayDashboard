"use client";

import { AddUser, Tab, Table } from "../../../components";
import data from "../../../constant/data";

const Page = () => {
  return (
    <Table
      tab="View Clients"
      users={data.clientsTable}
      columns={data.clientColumns}
    />
  );
};

export default Page;
