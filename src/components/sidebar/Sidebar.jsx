"use client";

import images from "@/constant/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsBank, BsPinMapFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { HiUser, HiUsers } from "react-icons/hi";
import { BiMoney } from "react-icons/bi";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="w-full overflow-scroll h-full bg-[#063b87] shadow-sm"
    >
      <div className="flex flex-col">
        <h2 className="text-center p-4 text-3xl text-white font-bold">
          Airlipay
        </h2>
        {/* {data.sidebarData.map((item) => (
          <SidebarCard name={item.name} icon={item.image} route={item.route} />
        ))} */}
        <div className="px-2">
          <Link href="/">
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

        <div className="px-2">
          <Link href="/clients">
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

        <div className="px-2">
          <Link href="/admins">
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

        <div className="px-2">
          <Link href="/users">
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

        <div className="px-2">
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
        </div>

        <div className="px-2">
          <Link href="/ailipay">
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
                    User Airlipays
                  </p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="px-2">
          <Link href="/clients/payment">
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
                    Clients Payment
                  </p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="px-2">
          <Link href="/banks">
            <div
              className={`py-2 pl-2 relative rounded text-center cursor-pointer mb-3 flex items-center justify-between w-[100%] transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}
            >
              <div className="flex flex-row items-center justify-around mr-2">
                <div className="mr-2">
                  <BsBank className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-inter text-steelblue text-left">Banks</p>
                </div>
              </div>
              <div className="absolute right-3 -ml-4">
                <Image width={10} height={10} src={images.right} />
              </div>
            </div>
          </Link>
        </div>

        <div className="px-2">
          <Link href="/address">
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
                  <p className="font-inter text-steelblue text-left">Address</p>
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
