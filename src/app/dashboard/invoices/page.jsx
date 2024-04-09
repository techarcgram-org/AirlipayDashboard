"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components";
import dataStatic from "@/constant/data";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { listInvoices } from "@/app/GlobalRedux/Features/invoiceSlice";
import { readClients } from "@/app/GlobalRedux/Features/clientSlice";
import Loading from "../loading";
import { formatMoney } from "@/utils/utils";
import moment from "moment";

const page = () => {
  const { invoices } = useSelector((state) => state.invoices);
  const { data, loading } = useSelector((state) => state.clients);
  const dispatch = useDispatch();
  const [formatted, setformatted] = useState([]);

  useEffect(() => {
    dispatch(listInvoices());
    dispatch(readClients());
  }, []);

  useEffect(() => {
    if (Array.isArray(invoices) && Array.isArray(data)) {
      const findClientById = (clientId) => {
        return data.find((client) => client.id === clientId);
      };

      const invoicesWithClients = invoices.map((invoice) => {
        const client = findClientById(invoice.client_id);
        return { ...invoice, client };
      });

      const formattedData = invoicesWithClients
        ?.map((item) => {
          return {
            id: item?.id,
            invoiceNumber: item?.invoice_number,
            client: item?.client?.name,
            account_status: item?.status,
            totalFees: formatMoney(item?.totalFees),
            from: moment(item?.from).format("DD/MM/YYYY HH:mm"),
            to: moment(item?.to).format("DD/MM/YYYY HH:mm"),
            taxes: formatMoney(item?.taxes),
            totalAmount: formatMoney(item.totalAmount),
          };
        })
        .reverse();
      setformatted(formattedData);
    }
  }, [invoices, data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h2 className="font-bold">Invoices</h2>
      <Table
        tab="Invoices"
        users={formatted}
        columns={dataStatic.invoiceColumns}
      />
    </>
  );
};

export default page;
