"use client";

import { useEffect } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";
import Loading from "../loading";

const Page = () => {
  const { loading, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Table tab="View Users" users={users} columns={dataStatic.userColumns} />
  );
};

export default Page;
