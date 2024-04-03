"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";

const AdminDetails = ({
  username,
  email,
  phoneNumber,
  join,
  activated,
  address,
  status,
  aBalance,
  nBalance,
  fee,
  tAmount,
}) => {
  return (
    <div className=" md:w-full flex p-4 items-center justify-between h-[300px]">
      <div className="w-full">
        <h2>Admin details</h2>

        <div className="flex items-center justify-between">
          <p className="m-2">
            <strong>{username}</strong> #9753428
          </p>
          <button className="mx-2 px-4 h-[24px] bg-green-500 text-white capitalize">
            {status}
          </button>
          {/* <div className="relative flex items-center justify-center">
            <FaEdit className="absolute top-[20px] -right-4 " />
            <p className="m-2">edit</p>
          </div> */}
        </div>
        <div className="">
          <div className="w-full p-2 flex items-center md:justify-between gap-2 justify-center my-2">
            <strong>Email</strong>
            <strong>{email}</strong>
          </div>
          <div className="w-full p-2 flex items-center justify-between my-2">
            <strong>Tel</strong>
            <strong>{phoneNumber}</strong>
          </div>
          <div className="w-full p-2 flex items-center justify-between my-2">
            <strong>Joined</strong>
            <strong>{join}</strong>
          </div>
          <div className="w-full p-2 flex items-center justify-between my-2">
            <strong>Activated</strong>
            <strong>{activated}</strong>
          </div>
          <div className="w-full p-2 flex items-center justify-between my-2">
            <strong>Address</strong>
            <strong>{address}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
