"use client";
import { AddUser, Tab, Table } from "@/components";
import data from "@/constant/data";
import React from "react";

const page = () => {
  return (
    <div className="mt-1">Banks
      <Tab
        options={["View User", "Add Users", "Edit Info", "More Info","Just Fun"]}
        defaultTab="View User"
      >
        <Table tab="View User" users={data.usersTable} columns={data.columns} />
        <Table
          tab="Add Users"
          users={data.clientsTable}
          columns={data.clientColumns}
        />
        <AddUser tab="Edit Info" />
        <h1 tab="More Info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam sint,
          pariatur a, magni incidunt vero quaerat sequi quae iure eligendi
          voluptate quod, vel voluptates harum quasi neque corrupti rem? Tempora
          suscipit rerum eius, corrupti temporibus hic ipsum perspiciatis
          recusandae deserunt possimus reiciendis voluptates id ea quaerat
          veniam? Magnam in expedita quidem maxime ipsum, error eligendi ratione
          vel iste est! Nihil, sit dolor unde expedita quisquam praesentium
          iusto aliquid harum voluptas culpa eius iste ipsum fugit numquam enim
          mollitia suscipit dolorem tempore tenetur tempora fugiat, deserunt,
          commodi at! Eligendi tenetur ut voluptates accusamus blanditiis velit
          aspernatur minus vero quibusdam, optio corrupti!us.
        </h1>
      </Tab>
    </div>
  );
};

export default page;
