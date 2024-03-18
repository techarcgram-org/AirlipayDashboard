"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";

const UserDetails = ({
  email,
  phoneNumber,
  join,
  activated,
  address,
  aBalance,
  nBalance,
  fee,
  tAmount,
}) => {
  return (
    <div className=" md:w-full flex p-4 items-center justify-between h-[300px]">
      <div className="w-full">
        <h2>User details</h2>

        <div className="w-full flex items-center md:justify-between justify-center my-2">
          <p className="m-2">
            <strong>Alvin Ana </strong> #9753428
          </p>
          <button className="mx-2 px-4 h-[24px] bg-green-500 text-white capitalize">
            active
          </button>
          <div className="relative flex items-center justify-center">
            <FaEdit className="absolute top-[20px] -right-4 " />
            <p className="m-2">edit</p>
          </div>
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
      {/* <div className="h-[90%] w-[2px] md:mx-16 mx-4 bg-black"></div> */}
      {/* the code below is for the balance section */}
      {/* <div className="w-full">
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
      </div> */}
    </div>
  );
};

export default UserDetails;
