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
    <div className="mt-10 md:right-6" >
      <Tab
        options={["View User", "Add Users", "Edit Info"]}
        defaultTab="View User"
      >
        <Table tab="View User" users={data.usersTable} columns={data.columns} />
        <AddUser tab="Add Users" />
        <h1 tab="Edit Info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          totam nisi reprehenderit aliquid illo possimus eaque, numquam sunt
          veritatis voluptatum eius.
        </h1>
      </Tab>
    </div>
  );
};

export default Page;
