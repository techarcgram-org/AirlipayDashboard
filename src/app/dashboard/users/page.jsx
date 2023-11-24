"use client";

import React, { useState } from "react";
import { AddUser, Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";

const Page = () => {
  return (
    <Table
      tab="View Users"
      users={data.usersTable}
      columns={data.columns}
      showDropDown
      dropDownOptions={[
        "active",
        "disactivated",
        "pending",
        "blocked",
        "banned",
      ]}
    />
  );
};

export default Page;
