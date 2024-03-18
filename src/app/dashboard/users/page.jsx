"use client";

import { Table } from "@/components";
import data from "@/constant/data";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { data: datum } = useSelector((state) => state.users);

  useEffect(() => {
    console.log("DATUM", datum, data.usersTable);
  }, [datum]);

  return <Table tab="View Users" users={datum} columns={data.userColumns} />;
};

export default Page;
