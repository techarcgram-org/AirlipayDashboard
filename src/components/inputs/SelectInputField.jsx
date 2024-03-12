"use client";

import React from "react";

const SelectInput = ({ label, name, value, options, onChange, required }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block font-medium mb-1"
        style={{ color: "black" }}
      >
        {label} {required ? <span style={{ color: "red" }}>*</span> : ""}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ color: "black" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
