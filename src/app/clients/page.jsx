"use client";

import React, { useState } from "react";
import { AddUser, Table } from "../../components";
import data from "../../constant/data";
// import HomePage from "../components/common/homePage";
import HomePage from "@/components/common/homePage";
const Page = () => {
  return (
    <div>
      <HomePage/>
      <Table users={data.clientsTable} columns={data.clientColumns} />
    </div>
  );
};

export default Page;
