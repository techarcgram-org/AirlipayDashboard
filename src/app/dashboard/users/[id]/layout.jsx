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
  listBanks,
} from "@/app/GlobalRedux/Features/userSlice";
import { useParams } from "next/navigation";
import Loading from "../loading";
import moment from "moment";

const userDetailsLayout = ({ children }) => {
  const { errorMessage, error, user, users } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(listUser(id));
    dispatch(listUsers());
    dispatch(readTransactions());
    dispatch(listBanks());
  }, [id]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

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
            activated="08/12/2023"
            aBalance={5000}
            tAmount={5000}
            nBalance={5000}
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
              {
                title: "Bank Accounts",
                url: `/dashboard/users/${id}/bank-accounts`,
              },
              {
                title: "Momo Accounts",
                url: `/dashboard/users/${id}/momo-accounts`,
              },
              {
                title: "Debit Cards",
                url: `/dashboard/users/${id}/debit-cards`,
              },
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
