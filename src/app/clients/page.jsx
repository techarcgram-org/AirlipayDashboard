"use client";

import React, { useState } from "react";
import { Tab,AddUser, Table } from "../../components";
import data from "../../constant/data";
import transactions from "@/utils/data/payment";
// import HomePage from "../components/common/homePage";
import HomePage from "@/components/common/homePage";
import Link from "next/link";


const Page = () => {
  console.log(transactions)
  return (
    <div className="mt-1 md:right-6" ><h2>Clients</h2>
    <Tab
      options={["View Clients", "Add Clients"]}
      defaultTab="View Clients"
    >
      <Table tab="View Clients" users={data.usersTable} columns={data.columns} />
      <AddUser tab="Add Clients" />
    </Tab>
  </div>
    );
};

export default Page;
