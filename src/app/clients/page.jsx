"use client";

import React, { useState } from "react";
import { AddUser, Table } from "../components";
import data from "../constant/data";

const Page = () => {
  return (
    <div>
      <Table users={data.clientsTable} columns={data.clientColumns} />
    </div>
  );
};

export default Page;
