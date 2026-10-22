"use client";

import React from "react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  half,
  additionalStyles,
  required,
}) => {
  const inputClassName = half ? "w-[90%]" : "w-full";

  const inputStyles = {
    color: "black",
    ...additionalStyles, // Merge additional styles with the default style
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
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border border-gray-300 rounded-sm active:border-none focus:border-none focus:outline-none ${inputClassName}`}
        placeholder={placeholder}
        style={inputStyles}
      />
    </div>
  );
};

export default TextInput;
