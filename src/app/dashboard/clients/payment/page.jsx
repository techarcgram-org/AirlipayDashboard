"use client";
import { Table } from "@/components";
import data from "@/constant/data";
import React from "react";

const page = () => {
  return (
    <div>
      <Table
        tab="Client Payment"
        users={data.clientPaymentsTable}
        columns={data.clientPayments}
      />
    </div>
  );
};

export default page;
