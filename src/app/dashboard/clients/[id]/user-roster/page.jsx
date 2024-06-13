"use client";

import { Table } from "@/components";
import dataStatic from "@/constant/data";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const page = () => {
  const { users } = useSelector((state) => state.users);
  const { id } = useParams();

  const roater = users?.filter((item) => item.client_id === parseInt(id));
  const formattedData = roater?.map((item) => {
    return {
      name: item.name,
      employeeId: item?.id,
      email: item?.email,
      phoneNumber: item?.primary_phone_number,
      account_status: item?.account_status,
    };
  });

  return (
    <Table
      tab="User Roster"
      users={formattedData}
      columns={dataStatic.clientRoaster}
    />
  );
};

export default page;
