"use client";

import Info from "@/components/Info";
import { Tab } from "../../../components";
import { useSelector } from "react-redux";

const ClientLayout = ({ children }) => {
  const { errorMessage, error } = useSelector((state) => state.clients);
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
