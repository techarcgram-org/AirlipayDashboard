"use client";

import { Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";
import React from "react";

const page = () => {

  const handleAction = (action, userId) => {
    if (action === "edit") {
      console.log("Edit user:", userId);
      // Implement your edit logic here
    } else if (action === "delete") {
      console.log("Delete user:", userId);
      // Implement your delete logic here
    }
  };
  return (
    <div className="p-4">
      <UserDetails
        email="charles1234@gmail.com"
        phoneNumber={+237670203775}
        join="07/07/2023"
        address="Molyko Buea"
        activated="08/12/2023"
        aBalance={5000}
        tAmount={5000}
        nBalance={5000}
        fee={5000}
      />
      {/* <Tab options={["Salary", "Withdrawals", "Paying"]} defaultTab="Salary">
        <Table
          tab="Salary"
          users={data.usersDetails}
          columns={data.columnsDetails}
        />
        <Table tab="Withdrawals" users={data.usersDetails} columns={data.columnsDetails} />
        <Table tab="Paying" users={data.usersTable} columns={data.columns} />
      </Tab> */}
      <Table
        // tab="Salary"
        users={data.usersDetails}
        columns={data.columnsDetails}
      />
    </div>
  );
};

export default page;
