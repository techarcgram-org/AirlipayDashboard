"use client";

import React from "react";

const UserDetails = ({
  username,
  status,
  email,
  phoneNumber,
  join,
  activated,
  userId,
  address,
  aBalance,
  nBalance,
  fee,
  tAmount,
}) => {
  return (
    <div className=" md:w-full flex p-4 items-center justify-between h-[300px]">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2 my-2">
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

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>User ID</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{userId}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Email</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{email}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Tel</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{phoneNumber}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Joined</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{join}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
          <div className="flex items-start">
            <p className="m-2">
              <strong>Activated</strong>
            </p>
          </div>
          <div className="flex items-start">
            <strong>{activated}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 my-2">
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
      <div className="h-[90%] w-[2px] md:mx-16 mx-4 bg-black"></div>
      {/* the code below is for the balance section */}
      <div className="w-full">
        <strong>BALANCE DETAILS</strong>
        <div className="flex text">
          <div className="md:m-10 m-4">
            <p className="text-blue">Available Banlance</p>
            <p style={{ color: "#063B87", fontSize: 20 }}>XAF {aBalance}</p>
          </div>
          <div className="md:m-10 m-4">
            <p style={{ fontSize: 15 }}>Transferred </p>
            <p style={{ color: "#063B87", fontSize: 20 }}>XAF {tAmount}</p>
          </div>
        </div>

        {/* <div className='h-[90%] w-[2px] bg-black' ></div> */}
        <div className="flex">
          <div className="md:m-10 m-4">
            <p> Negative Banlance</p>
            <p style={{ color: "#063B87", fontSize: 20 }}>XAF {nBalance}</p>
          </div>
          <div className="md:m-10 m-4">
            <p>Fees</p>
            <p style={{ color: "#063B87", fontSize: 20 }}>XAF {fee}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
