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
    <div>
      {/* <div className="flex justify-center w-[400px] mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "Tab1" ? "bg-[#3F5F90] text-black" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("Tab1")}
        >
          View User
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Tab2" ? "bg-[#3F5F90] text-black" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("Tab2")}
        >
          Add Users
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "Tab3" ? "bg-[#3F5F90] text-black" : "bg-gray-300"
          }`}
          onClick={() => handleTabClick("Tab3")}
        >
          Edit Info
        </button>
      </div>
      {activeTab === "Tab1" && (
        <Table users={data.usersTable} columns={data.columns} />
      )}
      {activeTab === "Tab2" && (
        // <Table users={data.usersTable2} columns={data.columns2} />
        <AddUser />
      )}
      {activeTab === "Tab3" && (
        // <Table users={data.usersTable3} columns={data.columns3} />
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore totam nisi reprehenderit aliquid illo possimus eaque, numquam sunt veritatis voluptatum eius.
        </h1>
      )} */}
      <UserDetails />
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
