"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Tab = ({ options, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const router = useRouter();

  return (
    <div className="">
      <div className="flex justify-start min-w-[400px] my-4 mt-6">
        {options.map((option, index) => (
          <button
            key={index}
            className={`px-4 mx-[2px] py-2 ${
              activeTab === option.title
                ? "bg-[#3F5F90] text-white"
                : "bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab(option.title);
              router.push(option.url);
            }}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;
