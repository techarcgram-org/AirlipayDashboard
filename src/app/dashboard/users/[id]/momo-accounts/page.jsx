"use client";

import React, { useState, useEffect } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import bankAccounts from "@/utils/data/banks";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const page = () => {
  const { users } = useSelector((state) => state.users);
  const [momoAccount, setMomoAccounts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getUser = () => {
      if (Array.isArray(users)) {
        const usr = users.filter((u) => u.id === parseInt(id))[0];
        const accounts = usr.user_mobile_money_accounts;
        const formattedData = accounts.map((item) => {
          return {
            operator: item?.operator,
            phone_number: item?.phone_number,
          };
        });
        setMomoAccounts(formattedData);
      }
    };
    getUser();
  }, [users]);

  return (
    <Table
      tab="Momo Accounts"
      users={momoAccount}
      columns={dataStatic.userMomoAcoountsColumns}
    />
  );
};

export default page;
