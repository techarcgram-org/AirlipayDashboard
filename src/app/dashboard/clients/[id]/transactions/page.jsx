"use client";

import { Table } from "@/components";
import dataStatic from "@/constant/data";
import { useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "next/navigation";

const page = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const { users } = useSelector((state) => state.users);
  const { id } = useParams();

  const userMap = {};
  users?.forEach((user) => {
    userMap[user.id] = user;
  });

  const attachUserToTransaction = (transaction) => {
    const userId = transaction.user_id;
    if (userMap[userId]) {
      const clonedTransaction = { ...transaction };
      clonedTransaction.user = userMap[userId];
      return clonedTransaction;
    } else {
      return transaction;
    }
  };

  const transactionsWithUsers = transactions?.map((transaction) => {
    return attachUserToTransaction(transaction);
  });

  const clientTransactions = transactionsWithUsers.filter(
    (item) => item?.user?.client_id === parseInt(id)
  );

  const formattedData = clientTransactions.map((item) => {
    return {
      date: moment(item?.execution_date).format("DD/MM/YYYY HH:mm"),
      employeeName: item?.user?.name,
      amount: item?.amount,
      transactionId: item?.id,
      destinaionAccount: item?.user?.primary_phone_number,
    };
  });

  return (
    <Table
      tab="Transactions"
      users={formattedData}
      columns={dataStatic.clientTransactionsColumns}
    />
  );
};

export default page;
