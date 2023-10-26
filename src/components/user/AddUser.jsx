import React, { useState } from "react";
import { CheckboxInput, FileInput, TextInput } from "..";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
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
    console.log(formData);
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

  return (
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex justify-between">
        {/* First Column */}
        <div className="w-1/2 mr-2">
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            type="text"
          />
          <TextInput
            label="Profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            placeholder="Enter your Profession"
            type="text"
          />
          <TextInput
            label="Employer"
            name="employer"
            value={formData.employer}
            onChange={handleInputChange}
            placeholder="Enter your employer"
            type="text"
          />
          <TextInput
            label="Tax Payer Number"
            name="taxPayer"
            value={formData.taxPayerNumber}
            onChange={handleInputChange}
            placeholder="Enter your tax payer number"
            type="text"
          />
        </div>

        {/* Second Column */}
        <div className="w-1/2 ml-2">
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            type="text"
          />
          <TextInput
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            type="email"
          />
          <FileInput
            label="ID Card (Image)"
            name="idCard"
            onChange={handleFileInputChange}
          />
          <CheckboxInput
            label="Married"
            name="isMarried"
            checked={formData.isMarried}
            onChange={handleInputChange}
          />
          <CheckboxInput
            label="Has Children"
            name="hasChildren"
            checked={formData.hasChildren}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
