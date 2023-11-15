"use client";

import transactions from "@/utils/data/payment";
import { AddUser, Tab, Table } from "../../components";
import data from "../../constant/data";
import AddClientForm from "@/components/common/AddClient";
// import HomePage from "../components/common/homePage";


const Page = () => {
  console.log(transactions)
  return (
    <div className="mt-1 md:right-6" ><h2>Clients</h2>
    <Tab
      options={["View Clients", "Add Clients"]}
      defaultTab="View Clients"
    >
      <Table tab="View Clients" users={data.usersTable} columns={data.columns} />
      <AddClientForm tab="Add Clients" />
    </Tab>
  </div>
    );
};

export default Page;
