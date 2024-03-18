"use client";

import Info from "@/components/Info";
import { Tab } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listUsers } from "@/app/GlobalRedux/Features/userSlice";

// export const metadata = {
//   title: "AirliPay client",
//   description: "your number one salary solution",
// };

const UserLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div className="mt-1 md:right-6">
      <h2 className="font-bold">Users</h2>
      <Info message={errorMessage} error={error} />
      <Tab
        options={[
          { title: "View Users", url: "/dashboard/users" },
          { title: "Add User", url: "/dashboard/users/addUser" },
        ]}
        defaultTab="View Users"
      />
      {children}
    </div>
  );
};

export default UserLayout;
