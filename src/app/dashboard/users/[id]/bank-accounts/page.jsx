"use client";

import { Tab, Table, UserDetails } from "@/components";
import data from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "next/navigation";

const page = () => {
  const { banks } = useSelector((state) => state.users);
  const { id } = useParams();

  // console.log("banks", banks);

  return (
    <Table
      tab="Bank Accounts"
      users={bankAccounts}
      columns={data.banksColumns}
    />
  );
};

export default page;
