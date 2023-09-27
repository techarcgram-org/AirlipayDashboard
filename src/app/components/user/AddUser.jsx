import React, { useState } from "react";

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
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profession"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your profession"
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="employer"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              Employer
            </label>
            <input
              type="text"
              id="employer"
              name="employer"
              value={formData.employer}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your employer"
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="taxPayerNumber"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              Tax Payer Number
            </label>
            <input
              type="text"
              id="taxPayerNumber"
              name="taxPayerNumber"
              value={formData.taxPayerNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your tax payer number"
              style={{ color: "black" }}
            />
          </div>
        </div>

        {/* Second Column */}
        <div className="w-1/2 ml-2">
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your lastname"
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              style={{ color: "black" }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="idCard"
              className="block font-medium mb-1"
              style={{ color: "black" }}
            >
              ID Card (Image)
            </label>
            <input
              type="file"
              id="idCard"
              name="idCard"
              accept="image/*"
              onChange={handleFileInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{  }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isMarried" className="flex items-center">
              <input
                type="checkbox"
                id="isMarried"
                name="isMarried"
                checked={formData.isMarried}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span style={{ }}>Married</span>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="hasChildren" className="flex items-center">
              <input
                type="checkbox"
                id="hasChildren"
                name="hasChildren"
                checked={formData.hasChildren}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span style={{ }}>Has Children</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
