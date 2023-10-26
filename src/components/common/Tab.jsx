"use client";

import React, { useState } from "react";

const Tab = ({ options, defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="">
      <div className="flex justify-start min-w-[400px] my-4 mt-6">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 ${
              activeTab === option ? "bg-[#3F5F90] text-white" : "bg-gray-300"
            }`}
            onClick={() => handleTabClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {children.length > 1
        ? children.find((child) => child.props.tab === activeTab)
        : children}
    </div>
  );
};

export default Tab;
