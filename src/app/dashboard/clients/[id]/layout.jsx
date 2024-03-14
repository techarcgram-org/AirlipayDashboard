"use client";

import ClientDetails from "@/components/client/clientDetails";
import Info from "@/components/Info";
import Tab from "@/components/common/Tab";
import { useSelector } from "react-redux";

const userDetailsLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
  const currentUrl = window.location.href;
  const regex = /\/(\d+)\/edit/;
  const match = currentUrl.match(regex);

  return (
    <div className="mt-1 md:right-6">
      <Info message={errorMessage} error={error} />
      {!match && (
        <>
          <ClientDetails
            email="charles1234@gmail.com"
            phoneNumber={+237670203775}
            join="07/07/2023"
            address="Molyko Buea"
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
                url: "/dashboard/clients/2/transactions",
              },
              {
                title: "User Roster",
                url: "/dashboard/clients/2/user-roster",
              },
              {
                title: "Bank Accounts",
                url: "/dashboard/clients/2/bank-accounts",
              },
              {
                title: "Payment History",
                url: "/dashboard/clients/2/payment-history",
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
