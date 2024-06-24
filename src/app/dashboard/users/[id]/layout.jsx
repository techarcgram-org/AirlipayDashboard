"use client";

import { useState, useEffect } from "react";
import { UserDetails } from "@/components";
import Info from "@/components/Info";
import Tab from "@/components/common/Tab";
import { useDispatch, useSelector } from "react-redux";
import { readTransactions } from "@/app/GlobalRedux/Features/transactionSlice";
import {
  listUsers,
  listUser,
  // listBanks,
  // listMomoAccounts,
  listAirlipayBalance,
} from "@/app/GlobalRedux/Features/userSlice";
import { useParams } from "next/navigation";
import Loading from "../loading";
import moment from "moment";
import { formatMoney } from "@/utils/utils";

const userDetailsLayout = ({ children }) => {
  const { transactions } = useSelector((state) => state.transactions);
  const { errorMessage, error, user, users, airlipayBalance } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(listUser(parseInt(id)));
    dispatch(listUsers());
    dispatch(readTransactions({ txnType: "" }));
    // dispatch(listBanks(parseInt(id)));
    // dispatch(listMomoAccounts(id));
    dispatch(listAirlipayBalance(parseInt(id)));
  }, [id]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

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

  const userTransactions = transactionsWithUsers.filter(
    (item) => item?.user_id === parseInt(id)
  );

  // const currentUrl = typeof window !== "undefined" && window.location.href;
  const currentUrl = window.location.href;
  const regex = /\/(\d+)\/edit/;
  const match = currentUrl.match(regex);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="mt-1 md:right-6">
      <Info message={errorMessage} error={error} />
      {!match && (
        <>
          <UserDetails
            username={userData?.name}
            email={userData?.accounts?.email}
            phoneNumber={userData?.addresses?.primary_phone_number}
            join={moment(userData?.created_at).format("DD/MM/YYYY HH:mm")}
            address={userData?.addresses?.city}
            status={userData?.accounts?.account_status}
            activated={userData?.activation_date}
            userId={userData?.employee_id}
            aBalance={formatMoney(airlipayBalance?.balance)}
            tAmount={5000}
            nBalance={formatMoney(userData?.base_salary)}
            fee={5000}
          />
          <Tab
            options={[
              {
                title: "Transactions",
                url: `/dashboard/users/${id}/transactions`,
              },
              // {
              //   title: "Activity Feed",
              //   url: `/dashboard/users/${id}/activity-feed`,
              // },
              // {
              //   title: "Bank Accounts",
              //   url: `/dashboard/users/${id}/bank-accounts`,
              // },
              {
                title: "Momo Accounts",
                url: `/dashboard/users/${id}/momo-accounts`,
              },
              // {
              //   title: "Debit Cards",
              //   url: `/dashboard/users/${id}/debit-cards`,
              // },
            ]}
            defaultTab="Transactions"
          />
        </>
      )}
      {children}
    </div>
  );
};

export default userDetailsLayout;
