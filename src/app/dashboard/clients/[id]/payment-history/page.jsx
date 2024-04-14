"use client";

import { Table } from "@/components";
import dataStatic from "@/constant/data";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listInvoices } from "@/app/GlobalRedux/Features/invoiceSlice";
import Loading from "@/app/loading";
import moment from "moment";
import { formatMoney } from "@/utils/utils";
import { useParams } from "next/navigation";

const page = () => {
  const { invoices, loading } = useSelector((state) => state.invoices);
  const [formatted, setformatted] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listInvoices());
  }, []);

  useEffect(() => {
    if (Array.isArray(invoices)) {
      const clientInvoices = invoices.filter(
        (invoice) => invoice.client_id === parseInt(id)
      );

      const formattedData = clientInvoices
        ?.map((item) => {
          return {
            id: item?.id,
            invoiceNumber: item?.invoice_number,
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
  }, [invoices]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Table
      tab="Payment History"
      users={formatted}
      columns={dataStatic.clientInvoiceColumns}
    />
  );
};

export default page;
