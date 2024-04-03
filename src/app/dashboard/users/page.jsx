"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";
import Loading from "../loading";

const Page = () => {
  const { loading, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const reverseData = () => {
    if (Array.isArray(users)) {
      const newList = [...users].reverse();
      setUsersList(newList);
    }
  };

  useEffect(() => {
    reverseData();
  }, [users]);

  if (loading) {
    return <Loading />;
  }

  if (usersList.length <= 0) {
    return <Loading />;
  }

  console.log(usersList);

  return (
    <Table
      tab="View Users"
      users={usersList}
      columns={dataStatic.userColumns}
    />
  );
};

export default Page;
