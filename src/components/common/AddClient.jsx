import React, { useState } from "react";
import { CheckboxInput, FileInput, SelectInput, TextInput } from "..";

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    employerName: "",
    street: "",
    phoneNumber: "",
    city: "",
    taxId: "",
    bankAccountNumber: "",
    nextPaymentDate: "",
    email: "",
    secondPhoneNumber: "",
    region: "",
    bankName: "",
    clientCom: "",
    industry: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  const handleFileChange = (file, fileType) => {
    // Handle the file and fileType as needed
    console.log("Uploaded file:", file);
    console.log("File type:", fileType);
  };


  const handleRegionChange = (selectedValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      region: selectedValue,
    }));
  };

  const handleBankChange = (selectedValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      bankName: selectedValue,
    }));
  };

  const regionsInCameroon = [
    { value: "adamaoua", label: "Adamaoua" },
    { value: "centre", label: "Centre" },
    { value: "east", label: "East" },
    { value: "farNorth", label: "Far North" },
    { value: "littoral", label: "Littoral" },
    { value: "north", label: "North" },
    { value: "northwest", label: "Northwest" },
    { value: "west", label: "West" },
    { value: "south", label: "South" },
    { value: "southwest", label: "Southwest" },
  ];

  const cameroonBanks = [
    { value: "afriland_first_bank", label: "Afriland First Bank" },
    { value: "banque_atlantique", label: "Banque Atlantique" },
    {
      value: "bicec",
      label:
        "Banque Internationale du Cameroun pour l'Epargne et le Crédit (BICEC)",
    },
    { value: "bnc", label: "Banque Nationale de Crédit (BNC)" },
    {
      value: "bsic",
      label:
        "Banque Sahélo-Saharienne pour l'Investissement et le Commerce (BSIC)",
    },
    { value: "cbc", label: "Commercial Bank of Cameroon (CBC)" },
    { value: "ecobank", label: "Ecobank Cameroon" },
    { value: "equity_bank", label: "Equity Bank Cameroon" },
    {
      value: "standard_chartered_bank",
      label: "Standard Chartered Bank Cameroon",
    },
    { value: "ubc", label: "Union Bank of Cameroon (UBC)" },
  ];

  console.log(cameroonBanks);

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
    <div className="max-w-3xl mx-auto bg-gray-300 p-4">
      <div className="flex items-start my-3">
        <h2 className="capitalize text-2xl font-bold">create client</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-between">
        {/* First Column */}
        <div className="w-1/2 mr-2">
          <TextInput
            label={
              <label>
                Employer Name
              </label>
            }
            name="employerName"
            value={formData.employerName}
            onChange={handleInputChange}
            placeholder="Employer Name"
            type="text"
            required
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="670000000"
            type="text"
            required
          />
          <div className="flex items-center w-full justify-between">
            <TextInput
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Street"
              type="text"
              half
              additionalStyles={{ marginRight: 12 }}
              required
            />
            <TextInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="city"
              type="text"
              half
              additionalStyles={{ marginLeft: 12 }}
              required
            />
          </div>
          <TextInput
            label="Tax ID"
            name="taxId"
            value={formData.taxId}
            onChange={handleInputChange}
            placeholder="1234567890"
            type="text"
            required
          />
          <TextInput
            label="Bank Account Number"
            name="accountNumber"
            value={formData.bankAccountNumber}
            onChange={handleInputChange}
            placeholder="10091005125"
            type="text"
            required
          />
          <TextInput
            label="Next Payment Date"
            name="payment date"
            value={formData.nextPaymentDate}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            type="text"
            required
          />
        </div>

        {/* Second Column */}
        <div className="w-1/2 ml-2">
          <TextInput
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            type="email"
            required
          />
          <TextInput
            label="Secondary Phone Number"
            name="secondNumber"
            value={formData.secondPhoneNumber}
            onChange={handleInputChange}
            placeholder="673000000"
          />
          <SelectInput
            label="Region"
            name="region"
            value={formData.region}
            onChange={handleRegionChange}
            options={regionsInCameroon}
            required
          />
          <SelectInput
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={handleBankChange}
            options={cameroonBanks}
            required
          />
          <TextInput
            label="Client Commission"
            name="commision"
            value={formData.clientCom}
            onChange={handleInputChange}
            placeholder=""
            type="text"
          />
          <TextInput
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="Littoral"
            type="text"
          />
        </div>
      </form>

      <div className="mx-auto my-4 w-[90%] md:w-[50%] h-auto">
        <div>
          {/* <h2>Add employees</h2> */}
          <FileInput
            label="Add Employees"
            name="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div
        className="w-full bg-[#3F5F90] py-2 mt-8 capitalize text-white text-center text-xl cursor-pointer"
        onClick={() => {}}
      >
        register client
      </div>
    </div>
  );
};

export default AddClientForm;
