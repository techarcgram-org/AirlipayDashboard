"use client";
import React from "react";
import { Table } from "../components";
import data from "../constant/data";



const columns = [
  { id: "name", header: "Name", field: "name" },
  { id: "email", header: "Email", field: "email" },
  { id: "role", header: "Role", field: "role" },
  { id: "address", header: "Address", field: "address" },
  { id: "contact", header: "Contact", field: "contact" },
  { id: "employer", header: "Employer", field: "employer" },
  // Add more column objects as needed
];

const page = () => {
  return (
    <div >
      <Table users={data.usersTable} columns={columns} />
    </div>
  );
};

export default page;
