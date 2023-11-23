"use client";

import { UserDetails } from "@/components";
import Info from "@/components/Info";
import Tab from "@/components/common/Tab";
import { useSelector } from "react-redux";

// export const metadata = {
//   title: "AirliPay client",
//   description: "your number one salary solution",
// };

const userDetailsLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
  return (
    <div className="mt-1 md:right-6">
      {/* <h2>Clients</h2> */}
      <Info message={errorMessage} error={error} />
      <UserDetails
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
          { title: "Transactions", url: "/dashboard/users/2/transactions" },
          { title: "Activity Feed", url: "/dashboard/users/2/activity-feed" },
          { title: "Bank Accounts", url: "/dashboard/users/2/bank-accounts" },
          { title: "Momo Accounts", url: "/dashboard/users/2/momo-accounts" },
          { title: "Debit Cards", url: "/dashboard/users/2/debit-cards" },
        ]}
        defaultTab="Transactions"
      />
      {children}
    </div>
  );
};

export default userDetailsLayout;
