"use client";

import images from "@/constant/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { BsBank, BsPinMapFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { HiUser, HiUsers } from "react-icons/hi";
import { BiMoney } from "react-icons/bi";
import { useState } from "react";

const SideBar = forwardRef(({ showNav, setShowNav }, ref) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  // const isTabActive =(tabPath)=>{
  //   return tabPath ===activeTab;
  // }

  return (
    <div
      ref={ref}
      className={`w-full overflow-scroll h-full bg-[#063b87] shadow-sm px-4 py-6`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-center text-3xl text-white font-bold">
            Airlipay
          </h2>
          {showNav && (
            <AiOutlineMenu
              className="h-8 w-8 text-gray-700 cursor-pointer text-white"
              onClick={() => setActiveTab("/Dasboard")}
            />
          )}
        </div>

        <div className="">
          <Link href="/dashboard">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-full transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <AiOutlineHome className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">
                    Dashboard
                  </p>
                </div>
              </div>
              <div className="absolute right-3">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="/dashboard/clients">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-full transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <HiUsers className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">Clients</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="/dashboard/admins">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-full transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <FaUserEdit className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">Admins</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="/dashboard/users">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-full transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <HiUser className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">Users</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="">
          <Link href="/users/:id/withdraw">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <GiReceiveMoney className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">User</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div> */}

        <div className="">
          <Link href="/dashboard/transactions">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <BiMoney className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">
                    Transactons
                  </p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="/dashboard/payments">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <GiPayMoney className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">
                    Payments
                  </p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="">
          <Link href="/dashboard/invoices">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <BsPinMapFill className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">
                    Invoices
                  </p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>
        <div className="">
          <Link href="/dashboard/login">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <BsPinMapFill className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">Login</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
