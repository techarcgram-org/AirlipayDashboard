"use client";

import { useEffect, useState } from "react";
import { Table } from "../../../components";
import dataStatic from "../../../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { readClients } from "@/app/GlobalRedux/Features/clientSlice";
import Loading from "../loading";

const Page = () => {
  const { data, loading } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [formatted, setformatted] = useState([]);

  useEffect(() => {
    dispatch(readClients());
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      const formattedData = data
        ?.map((item) => {
          return {
            id: item?.id,
            name: item?.name,
            email: item?.accounts.email,
            contact: item?.addresses.primary_phone_number,
            clientId: item?.id,
          };
        })
        .reverse();
      setformatted(formattedData);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Table
      tab="View Clients"
      users={formatted}
      columns={dataStatic.clientColumns}
    />
  );
};

export default Page;
