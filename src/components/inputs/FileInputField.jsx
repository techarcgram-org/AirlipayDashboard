import React from "react";

const FileInput = ({ label, name, onChange,value }) => {
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
        type="file"
        id={name}
        name={name}
        accept="image/*"
        onChange={onChange}
        value={value}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default FileInput;
