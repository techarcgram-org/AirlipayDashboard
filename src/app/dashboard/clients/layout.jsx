"use client";

import { useEffect, useState } from "react";
import Info from "@/components/Info";
import { Tab } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { readClients } from "@/app/GlobalRedux/Features/clientSlice";

const ClientLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readClients());
  }, []);

  return (
    <div className="mt-1 md:right-6">
      <h2 className="font-bold">Clients</h2>
      <Info message={errorMessage} error={error} />
      <Tab
        options={[
          { title: "View Clients", url: "/dashboard/clients" },
          { title: "Add Client", url: "/dashboard/clients/addClient" },
        ]}
        defaultTab="View Clients"
      />
      {children}
    </div>
  );
};

export default ClientLayout;
