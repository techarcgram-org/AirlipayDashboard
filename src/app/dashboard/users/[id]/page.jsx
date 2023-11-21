"use client";

import { Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import transactions from "@/utils/data/transactions";
import React from "react";

const page = () => {
  const handleAction = (action, userId) => {
    if (action === "edit") {
      // console.log("Edit user:", userId);
      // Implement your edit logic here
    } else if (action === "delete") {
      // console.log("Delete user:", userId);
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

      <Tab options={["Employee1", "Employee2"]} defaultTab="Employee1">
        <Tab
          tab="Employee1"
          options={[
            "Transactions",
            "Activity Feed",
            "Bank Accounts",
            "Momo Accounts",
            "Debit Cards",
          ]}
          defaultTab="Transactions"
        >
          <Table
            tab="Transactions"
            users={transactions}
            columns={data.transactionColumns}
          />
          <Table
            tab="Activity Feed"
            users={transactions}
            columns={data.transactionColumns}
          />
          <Table
            tab="Bank Accounts"
            users={bankAccounts}
            columns={data.banksColumns}
          />
          <Table
            tab="Momo Accounts"
            users={bankAccounts}
            columns={data.banksColumns}
          />
          <Table
            tab="Debit Cards"
            users={bankAccounts}
            columns={data.banksColumns}
          />
        </Tab>
        <div tab="Employee2" className="mx-auto-bg-red-w-full">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            reiciendis quidem temporibus ad commodi eveniet deserunt recusandae
            debitis magni consectetur voluptas ratione, rerum quasi et similique
            consequuntur suscipit voluptatum totam.
          </h1>
        </div>
      </Tab>
    </div>
  );
};

export default page;
