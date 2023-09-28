import images from "@/app/constant/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarCard = ({ route, name, icon }) => {
  const router = useRouter();
  return (
    <div>
      <Link href="/clients">
        <div
          className={`-pl-4 py-3 mx-2 relative rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            router.pathname == "/billing"
              ? "bg-orange-100 text-orange-500"
              : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
          }`}
        >
          <div className="flex flex-row items-center justify-around mr-2" >
            <div className="mr-2">
              {/* <CreditCardIcon className="h-5 w-5" /> */}
              <Image width={40} height={40} src={icon} />
            </div>
            <div>
              <p className="font-inter text-steelblue text-left">{name}</p>
            </div>
          </div>
          <div className="absolute right-3 -ml-4">
            <Image width={10} height={10} src={images.right} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarCard;
