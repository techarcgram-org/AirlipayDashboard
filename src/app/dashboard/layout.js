"use client";

import { Fragment, useEffect, useState, createRef } from "react";
import { Inter } from "next/font/google";
import { Navbar, Sidebar } from "../../components";
import { Transition } from "@headlessui/react";
import { isLoggedIn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../GlobalRedux/Features/userSlice";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: "AirliPay Dashboard",
//   description: "your number one salary solution",
// };

export default function DashboardLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = createRef();
  const router = useRouter();
  const dispatch = useDispatch();

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }
    if (!isLoggedIn()) {
      router.push("/login");
    }
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [router, dispatch]);

  return (
    <div className="grid grid-cols-7 h-screen">
      <div className={`sidebar h-full ${showNav ? "col-span-1" : "hidden"}`}>
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Sidebar showNav={showNav} setShowNav={setShowNav} ref={sidebarRef} />
        </Transition>
      </div>
      <div className={`righ-section ${showNav ? "col-span-6" : "col-span-7"}`}>
        <Navbar showNav={showNav} setShowNav={setShowNav} />
        <main
          className={`py-4 m-4 transition-all duration-[400ms] bg-white ${showNav && !isMobile ? "" : ""
            }`}
        >
          <div className="px-4 md:px-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
