
"use client"
import { AddUser, Tab, Table } from '@/components';
import data from '@/constant/data';
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-1 items-center justify-center' >
      <Tab
        options={["View User", "Add Users", "Edit Info"]}
        defaultTab="View User"
      >
        <Table tab="View User" users={data.usersTable} columns={data.columns} />
        <Table tab="Add Users" users={data.clientsTable} columns={data.clientColumns} />
        <AddUser tab="Edit Info" />
        {/* <h1 tab="Edit Info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          totam nisi reprehenderit aliquid illo possimus eaque, numquam sunt
          veritatis voluptatum eius.
        </h1> */}
      </Tab>
    </div>
  );
}

export default page