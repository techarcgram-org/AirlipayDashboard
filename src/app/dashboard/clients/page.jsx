"use client";

import { AddUser, Tab, Table } from "../../../components";
import data from "../../../constant/data";

const Page = () => {
  return (
    <Table tab="View Clients" users={data.usersTable} columns={data.columns} />
  );
};

export default Page;
