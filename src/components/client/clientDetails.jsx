"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";

const ClientDetails = ({
  username,
  email,
  phoneNumber,
  nextPaymentDate,
  join,
  activated,
  status,
  address,
}) => {
  return (
    <div className=" md:w-full flex p-4 items-center justify-between h-[300px]">
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>{username}</strong>
            </p>
          </div>
          <div className="flex items-start">
            <button
              className={`mx-2 px-4 h-[24px] ${
                status === "PENDING"
                  ? "bg-yellow-500"
                  : status === "ACTIVE"
                  ? "bg-green-500"
                  : status === "DEACTIVATED"
                  ? "bg-red-500"
                  : ""
              } text-white capitalize`}
            >
              {status}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Email</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{email}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Tel</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{phoneNumber}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Next Payment Date</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{nextPaymentDate}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Joined</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{join}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Activated</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{activated}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Address</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{address}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
