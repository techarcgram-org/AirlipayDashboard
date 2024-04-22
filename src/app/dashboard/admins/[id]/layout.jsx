"use client";

// import { UserDetails } from "@/components";
import { useState, useEffect } from "react";
import AdminDetails from "@/components/admin/adminDetails";
import Info from "@/components/Info";
// import Tab from "@/components/common/Tab";
import { useDispatch, useSelector } from "react-redux";
import { listAdmin } from "@/app/GlobalRedux/Features/adminSlice";
import { useParams } from "next/navigation";
import Loading from "../loading";
import moment from "moment";

const userDetailsLayout = ({ children }) => {
  const { errorMessage, error, admins } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(listAdmin(id));
  }, [id]);

  useEffect(() => {
    setUser(admins);
  }, [admins]);

  const currentUrl = window.location.href;
  const regex = /\/(\d+)\/edit/;
  const match = currentUrl.match(regex);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="mt-1 md:right-6">
      {/* <h2>Clients</h2> */}
      <Info message={errorMessage} error={error} />
      {!match && (
        <>
          <AdminDetails
            username={user?.name}
            email={user?.accounts?.email}
            phoneNumber={user?.addresses?.primary_phone_number}
            join={moment(user?.created_at).format("DD/MM/YYYY HH:mm")}
            address={user?.addresses?.city}
            status={user?.accounts?.account_status}
            activated={user?.accounts?.activation_date}
          />
          {/* <Tab
            options={[
              { title: "Transactions", url: "/dashboard/users/2/transactions" },
              {
                title: "Activity Feed",
                url: "/dashboard/users/2/activity-feed",
              },
              {
                title: "Bank Accounts",
                url: "/dashboard/users/2/bank-accounts",
              },
              {
                title: "Momo Accounts",
                url: "/dashboard/users/2/momo-accounts",
              },
              { title: "Debit Cards", url: "/dashboard/users/2/debit-cards" },
            ]}
            defaultTab="Transactions"
          /> */}
        </>
      )}
      {children}
    </div>
  );
};

export default userDetailsLayout;
