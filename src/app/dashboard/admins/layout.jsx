"use client";

import Info from "@/components/Info";
import { Tab } from "../../../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAdmins } from "@/app/GlobalRedux/Features/adminSlice";

const UserLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAdmins());
  }, []);

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
