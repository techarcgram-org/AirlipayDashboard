"use client";

import React from "react";

const UserDetails = ({ email, phoneNumber, join, activated, address }) => {
  return (
    <div className=" md:w-full flex p-4 items-center justify-between h-[300px]">
      <div className="w-full">
        <h2>User details</h2>

        <div className="grid grid-cols-3 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Alvin Ana </strong> #9753428
            </p>
          </div>
          <div className="flex items-start">
            <button className="mx-2 px-4 h-[24px] bg-green-500 text-white capitalize">
              active
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Email</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{email}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Tel</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{phoneNumber}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Joined</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{join}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Activated</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{activated}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-2">
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

export default UserDetails;
