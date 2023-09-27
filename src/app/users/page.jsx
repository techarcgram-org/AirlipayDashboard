'use client'

import React, { useState } from "react";
import { Table } from "../components";
import data from "../constant/data";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center w-[400px] mb-4">
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
        <h1>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, ipsam aliquid autem accusamus consectetur impedit minima odio laudantium? Quo, voluptas.
        </h1>
      )}
      {activeTab === "Tab3" && (
        // <Table users={data.usersTable3} columns={data.columns3} />
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore totam nisi reprehenderit aliquid illo possimus eaque, numquam sunt veritatis voluptatum eius.
        </h1>
      )}
    </div>
  );
};

export default Page;
