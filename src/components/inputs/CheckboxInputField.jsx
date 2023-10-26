import React from "react";

const CheckboxInput = ({ label, name, checked, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-2"
        />
        <span style={{ color: "black" }}>{label}</span>
      </label>
    </div>
  );
};

export default CheckboxInput;
