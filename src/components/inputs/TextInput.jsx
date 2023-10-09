
import React from "react";

const TextInput = ({ label, name, value, onChange, placeholder,type }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block font-medium mb-1"
        style={{ color: "black" }}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
        style={{ color: "black" }}
      />
    </div>
  );
};

export default TextInput;