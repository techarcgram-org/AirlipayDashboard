"use client";

import { useEffect } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";
import { readClients } from "@/app/GlobalRedux/Features/clientSlice";

const Page = () => {
  const { users } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch(readClients());
  }, []);

  const clientMap = {};
  data?.forEach((client) => {
    clientMap[client.id] = client;
  });

  const attachClientToUser = (user) => {
    const clientId = user.client_id;
    if (clientMap[clientId]) {
      const userWithClient = { ...user };
      userWithClient.client = clientMap[clientId];
      return userWithClient;
    } else {
      return user;
    }
  };

  const usersWithClients = users.map((user) => {
    return attachClientToUser(user);
  });

  console.log(usersWithClients);

  return (
    <Table tab="View Users" users={users} columns={dataStatic.userColumns} />
  );
};

export default Page;
