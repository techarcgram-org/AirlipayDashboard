"use client";

import React, { useState } from "react";
import { CheckboxInput, FileInput, TextInput } from "..";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    email: "",
    employer: "",
    secondPhoneNumber: "",
    taxPayerNumber: "",
    dateOfBirth: "",
    city: "",
    baseSalary: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      idCard: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data handling here
    // Reset form state
    setFormData({
      firstName: "",
      lastName: "",
      profession: "",
      email: "",
      employer: "",
      idCard: null,
      taxPayerNumber: "",
      isMarried: false,
      hasChildren: false,
    });
  };
  const handleFileChange = (file, fileType) => {
    // Handle the file and fileType as needed
  };

  const [multiple, setMultiple] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 bg-gray-300 p-4">
      <div className="my-2 align-start">
        <h2 className="capitalize text-2xl">add new users</h2>
      </div>
      <CheckboxInput
        label="add multiple users"
        name="isMultiple"
        checked={multiple}
        onChange={() => setMultiple(!multiple)}
      />
      <form onSubmit={handleSubmit} className="flex justify-between">
        {multiple ? (
          <FileInput
            label="Add Employees"
            name="file"
            onChange={handleFileChange}
          />
        ) : (
          <>
            <div className="w-1/2 mr-2">
              <TextInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                type="text"
                required
              />
              <TextInput
                label="Phone Number*"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="674561823"
                type="text"
                required
              />
              <TextInput
                label="Street"
                name="employer"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Enter your street"
                type="text"
                required
              />
              <TextInput
                label="Tax Payer Number"
                name="taxPayer"
                value={formData.taxPayerNumber}
                onChange={handleInputChange}
                placeholder="Enter your tax payer number"
                type="text"
                required
              />
              <TextInput
                label="Date of birth"
                name="dob"
                value={formData.taxPayerNumber}
                onChange={handleInputChange}
                placeholder="Enter your date of birth"
                type="text"
                required
              />
            </div>

            <div className="w-1/2 ml-2">
              <TextInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                type="email"
                required
              />
              <TextInput
                label="Secondary phone number"
                name="secondNumber"
                value={formData.secondPhoneNumber}
                onChange={handleInputChange}
                placeholder="Secondary phone number"
                type="text"
              />
              <TextInput
                label="City*"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                type="text"
                required
              />
              <TextInput
                label="Base Salary"
                name="baseSalary"
                value={formData.baseSalary}
                onChange={handleInputChange}
                placeholder="356000 / month"
                type="text"
                required
              />
              <TextInput
                label="Employer"
                name="employer"
                value={formData.employer}
                onChange={handleInputChange}
                placeholder="356000 / month"
                type="text"
                required
              />
            </div>
          </>
        )}

        {/* <div>
          <button className="px-2 p-1 rounded-md bg-blue-500 capitalize text-white">add user</button>
        </div> */}
      </form>
      <div
        className="w-full bg-[#3F5F90] py-2 mt-8 capitalize text-white text-center text-xl cursor-pointer"
        onClick={() => {}}
      >
        add users
      </div>
    </div>
  );
};

export default AddUserForm;
