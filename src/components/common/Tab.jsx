"use client"

import React, { useState } from "react";

const Tab = ({ options, defaultTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center w-[400px] mb-4">
        {options.map((option) => (
          <button
            key={option}
            className={`px-4 py-2 ${
              activeTab === option ? "bg-[#3F5F90] text-black" : "bg-gray-300"
            }`}
            onClick={() => handleTabClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {children.find((child) => child.props.tab === activeTab)}
    </div>
  );
};

export default Tab;