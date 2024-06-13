"use client";

import { useEffect } from "react";
import { Table } from "../../../components";
import dataStatic from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Loading from "../loading";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";
import { readTransactions } from "@/app/GlobalRedux/Features/transactionSlice";
import { formatMoney } from "@/utils/utils";

const page = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readTransactions());
    dispatch(listUsers());
  }, []);

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

  // const userTransactions = transactionsWithUsers.filter(
  //   (item) => item?.user_id === parseInt(id)
  // );

  const formattedData = transactionsWithUsers?.map((item) => {
    return {
      date: moment(item?.execution_date).format("DD/MM/YYYY HH:mm"),
      description: `${item?.transaction_type} Last 4: ${
        item?.phone_number?.slice(-4) || "NAN"
      }`,
      amount: formatMoney(item?.amount),
      fee: formatMoney(item?.fees),
      user: item?.user?.name,
      employer: item?.user?.client_name,
      balanceBefore: `XAF ${formatMoney(item?.old_balance)}`,
      balanceAfter: `XAF ${formatMoney(item?.new_balance)}`,
    };
  });

  const transactionTypes = Array.from(
    new Set(
      transactionsWithUsers?.map((item) => {
        return item?.transaction_type;
      })
    )
  );

  const employers = Array.from(
    new Set(
      transactionsWithUsers
        ?.map((item) => ({
          id: item?.user?.id,
          name: item?.user?.client_name,
        }))
        .map(({ id }) => id) // Extracting only the id for uniqueness
    )
  ).map((id) => ({ id }));

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="font-bold">Transactions</h2>
      <Table
        tab="Transactions"
        users={formattedData}
        columns={dataStatic.transactionColumns}
        filter={true}
        transactionTypes={transactionTypes}
        employers={employers}
      />
    </>
  );
};

export default page;
