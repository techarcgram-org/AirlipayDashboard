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
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputClassName}`}
        placeholder={placeholder}
        style={inputStyles}
      />
    </div>
  );
};

export default TextInput;
