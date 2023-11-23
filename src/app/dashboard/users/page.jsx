"use client";

import { Table } from "@/components";
import data from "@/constant/data";

const Page = () => {
  return (
    <Table tab="View Users" users={data.usersTable} columns={data.columns} />
  );
};

export default Page;
