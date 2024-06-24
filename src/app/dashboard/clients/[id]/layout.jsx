"use client";

import { useState, useEffect } from "react";
import ClientDetails from "@/components/client/clientDetails";
import Info from "@/components/Info";
import Tab from "@/components/common/Tab";
import { useDispatch, useSelector } from "react-redux";
import { readClient } from "@/app/GlobalRedux/Features/clientSlice";
import { readTransactions } from "@/app/GlobalRedux/Features/transactionSlice";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";
import { useParams } from "next/navigation";
import Loading from "../loading";
import moment from "moment";

const userDetailsLayout = ({ children }) => {
  const { errorMessage, error, data } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(readClient(id));
    dispatch(listUsers());
    dispatch(readTransactions({ txnType: "" }));
  }, [id]);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const currentUrl = window.location.href;
  const regex = /\/(\d+)\/edit/;
  const match = currentUrl.match(regex);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="mt-1 md:right-6">
      <Info message={errorMessage} error={error} />
      {!match && (
        <>
          <ClientDetails
            username={user?.name}
            email={user?.accounts?.email}
            phoneNumber={user?.addresses?.primary_phone_number}
            nextPaymentDate={moment(user?.next_payment_date).format(
              "DD/MM/YYYY"
            )}
            join={moment(user?.created_at).format("DD/MM/YYYY HH:mm")}
            address={user?.addresses?.city}
            status={user?.accounts?.account_status}
            activated={user?.activation_date}
          />
          <Tab
            options={[
              {
                title: "Transactions",
                url: `/dashboard/clients/${id}/transactions`,
              },
              {
                title: "User Roster",
                url: `/dashboard/clients/${id}/user-roster`,
              },
              {
                title: "Bank Accounts",
                url: `/dashboard/clients/${id}/bank-accounts`,
              },
              {
                title: "Payment History",
                url: `/dashboard/clients/${id}/payment-history`,
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
