"use client";

import { useEffect, useState } from "react";
import { Table } from "@/components";
import data from "@/constant/data";
import { useDispatch, useSelector } from "react-redux";
import { listAdmins } from "@/app/GlobalRedux/Features/adminSlice";
import Loading from "../loading";

const Page = () => {
  const { admins, loading } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const [formatted, setformatted] = useState([]);

  useEffect(() => {
    dispatch(listAdmins());
  }, []);

  useEffect(() => {
    if (Array.isArray(admins)) {
      const formattedData = admins
        ?.map((item) => {
          return {
            id: item?.id,
            name: item?.name,
            email: item?.accounts.email,
            phoneNumber: item?.addresses.primary_phone_number,
            adminId: item?.id,
          };
        })
        .reverse();
      setformatted(formattedData);
    }
  }, [admins]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Table tab="View Admins" users={formatted} columns={data.adminsColumns} />
  );
};

export default Page;
