"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../components";
import dataStatic from "../../../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../GlobalRedux/Features/userSlice";
import Loading from "../loading";

const Page = () => {
  const { loading, users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState([]);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      const role = localStorage.getItem("airlypayUserRole");
      const userId = localStorage.getItem("airlipayUserId");
      setRole(role);
      setUserId(parseInt(userId));
    })();
  }, []);

  useEffect(() => {
    dispatch(listUsers());
  }, []);

  const reverseData = () => {
    if (Array.isArray(users)) {
      console.log(users, userId);
      if (role === "CLIENT") {
        const newList = [...users].filter((user) => user.client_id === userId);
        const reversedList = newList.reverse();
        setUsersList(reversedList);
      } else {
        const newList = [...users].reverse();
        setUsersList(newList);
      }
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

  return (
    <Table
      tab="View Users"
      users={usersList}
      columns={dataStatic.userColumns}
    />
  );
};

export default Page;
