"use client";

import Info from "@/components/Info";
import { Tab } from "../../../components";
import { useSelector } from "react-redux";

const UserLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
  return (
    <div className="mt-1 md:right-6">
      <h2 className="font-bold">Admins</h2>
      <Info message={errorMessage} error={error} />
      <Tab
        options={[
          { title: "View Admins", url: "/dashboard/admins" },
          { title: "Add Admin", url: "/dashboard/admins/addAdmin" },
        ]}
        defaultTab="View Admins"
      />
      {children}
    </div>
  );
};

export default UserLayout;
