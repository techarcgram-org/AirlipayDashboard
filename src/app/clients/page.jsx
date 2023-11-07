"use client";

import React, { useState } from "react";
import { Tab,AddUser, Table } from "../../components";
import data from "../../constant/data";

const Page = () => {
  return (
    // <div>Clients
    //   <Table users={data.clientsTable} columns={data.clientColumns} />
    // </div>
    <div className="mt-1 md:right-6" ><h2>Clients</h2>
    <Tab
      options={["View Clients", "Add Clients"]}
      defaultTab="View Clients"
    >
      <Table tab="View Clients" users={data.usersTable} columns={data.columns} />
      <AddUser tab="Add Clients" />
      {/* <h1 tab="Edit Info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
        totam nisi reprehenderit aliquid illo possimus eaque, numquam sunt
        veritatis voluptatum eius.
      </h1> */}
    </Tab>
  </div>
    );
};

export default Page;
