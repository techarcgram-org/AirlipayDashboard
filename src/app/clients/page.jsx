"use client";

import React, { useState } from "react";
import { Tab,AddUser, Table } from "../../components";
import data from "../../constant/data";
import transactions from "@/utils/data/payment";
// import HomePage from "../components/common/homePage";
import HomePage from "@/components/common/homePage";
const Page = () => {
  console.log(transactions)
  return (
    <div>
      <Table users={data.clientsTable} columns={data.clientColumns} />
    </div>
  );
};

export default Page;
