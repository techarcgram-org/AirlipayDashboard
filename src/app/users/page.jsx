"use client";

import React, { useState } from "react";
import { AddUser, Tab, Table, UserDetails } from "../../components";
import data from "../../constant/data";

const Page = () => {
  // const [activeTab, setActiveTab] = useState("Tab1");

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  return (
    <div className="mt-1 md:right-6" > <h2 className="mb-5">Users</h2>
      <Tab
        options={["View Users", "Add Users"]}
        defaultTab="View Users"
      >
        <Table tab="View Users" users={data.usersTable} columns={data.columns} />
        <AddUser tab="Add Users" />
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
