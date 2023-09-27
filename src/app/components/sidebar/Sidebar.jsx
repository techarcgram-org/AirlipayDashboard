'use client'

import data from "@/app/constant/data";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import SidebarCard from "./SidebarCard";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div
      ref={ref}
      className="fixed w-65 max-w-70 overflow-scroll h-full bg-[#063b87]  shadow-sm"
    >
      <div className="flex flex-col">
        <h2 className="text-center p-4 text-3xl text-white font-bold">Airlipay</h2>
        {data.sidebarData.map((item) => (
          <SidebarCard name={item.name} icon={item.image} router={item.route} />
        ))}
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
