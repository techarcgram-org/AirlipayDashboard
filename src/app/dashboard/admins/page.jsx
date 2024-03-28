"use client";

import { useEffect } from "react";
import { Table } from "@/components";
import data from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listAdmins } from "@/app/GlobalRedux/Features/adminSlice";

const Page = () => {
  // const { data } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAdmins());
  }, []);
  return (
    <Table
      tab="View Admins"
      users={data.adminsTable}
      columns={data.adminsColumns}
    />
  );
};

export default Page;
