"use client";

import { useState, useEffect } from "react";
import ClientDetails from "@/components/client/clientDetails";
import Info from "@/components/Info";
import Tab from "@/components/common/Tab";
import { useDispatch, useSelector } from "react-redux";
import { readClient } from "@/app/GlobalRedux/Features/clientSlice";
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
            join={moment(user?.created_at).format("DD-MM-YYYY HH:mm")}
            address={user?.addresses?.city}
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
      {user && children}
    </div>
  );
};

export default userDetailsLayout;
