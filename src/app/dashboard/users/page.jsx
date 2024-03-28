"use client";

import { useEffect } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";

const Page = () => {
  const { data } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  // console.log(data);

  return (
    <Table tab="View Users" users={data} columns={dataStatic.userColumns} />
  );
};

export default Page;
